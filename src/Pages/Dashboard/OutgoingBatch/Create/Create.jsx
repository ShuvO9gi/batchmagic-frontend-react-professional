import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from '../../../../components/DropDown';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { isEmpty } from '../../../../components/utils';
import { ToastContainer, toast } from 'react-toastify';
import close from '../../../../assets/Logo/actions/cross.svg';
import SuccessModal from '../../../../components/SuccessModal';

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [batchTemplates, setBatchTemplates] = useState([]);
  const [batchTemplateId, setBatchTemplateId] = useState();
  const [batchProducts, setBatchProducts] = useState([]);
  const [isClear, setIsClear] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedStocks, setSelectedStocks] = useState({});
  const [isAllStocksSelected, setIsAllStocksSelected] = useState(false);
  const [isUnique, setIsUnique] = useState(true);
  const { err, setErr } = useState({});
  const { setLoading } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBatchTemplates = async () => {
      try {
        const res = await axiosPrivate.get(`/batch-templates`, {
          signal: controller.signal,
        });
        if (isMounted && res.status === 200) {
          setLoading(false);
          controller.abort();
          setBatchTemplates(res.data.data);
        }
      } catch (err) {
        setLoading(false);
        setErr(err.response?.data?.errors);
      }
    };

    getBatchTemplates();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let updatedBatchProducts = [];
    if (batchTemplateId) {
      const batchTemplate = batchTemplates.find(
        (batchTemplate) => batchTemplate.id === batchTemplateId,
      );
      if (batchTemplate) {
        updatedBatchProducts = JSON.parse(
          JSON.stringify(batchTemplate.batch_products),
        );
        if (quantity !== 0) {
          updatedBatchProducts = updatedBatchProducts.map((batchProduct) => {
            batchProduct.product.stocks = batchProduct.product.stocks.filter(
              (stock) => stock.total_weight - stock.total_sold_weight > 0,
            );
            return batchProduct;
          });
        }
      }
    }
    setBatchProducts(updatedBatchProducts);
    setSelectedStocks(
      updatedBatchProducts.reduce((acc, batchProduct) => {
        acc[batchProduct.product_id] = {};
        return acc;
      }, {}),
    );
  }, [batchTemplates, batchTemplateId, quantity]);

  useEffect(() => {
    const isStocksSelectedProperly = batchProducts.every((batchProduct) => {
      const requiredProductWeight = parseFloat(batchProduct.weight) * quantity;
      const selectedProductStocksWeight = getTotalWeightEntered(batchProduct);
      return (
        requiredProductWeight &&
        requiredProductWeight.toFixed(2) == selectedProductStocksWeight
      );
    });

    if (Object.keys(selectedStocks).length !== 0) {
      setIsAllStocksSelected(
        Object.values(selectedStocks).every((stock) => stock !== null),
      );
    }
    setIsAllStocksSelected(
      !isEmpty(batchProducts) &&
        !isEmpty(selectedStocks) &&
        isStocksSelectedProperly,
    );
  }, [batchProducts, selectedStocks, quantity]);

  const getTotalWeightEntered = (batchProduct) => {
    return Number(
      Object.values(selectedStocks[batchProduct.product_id])
        .reduce((acc, weight) => {
          return acc + parseFloat(weight) || 0;
        }, 0)
        .toFixed(2),
    );
  };

  const getTotalWeightNeeded = (batchProduct) => {
    return Number((parseFloat(batchProduct.weight) * quantity).toFixed(2));
  };

  const handleQuantity = (e) => {
    setIsClear(true);
    setQuantity(parseInt(e.target.value) || 0);
    setTimeout(() => {
      setIsClear(false);
    }, 10);
  };

  const handleDropDown = (batchTemplate) => {
    setBatchTemplateId(batchTemplate?.id);
  };

  const handleStockWeight = (stock) => {
    try {
      setSelectedStocks({
        ...selectedStocks,
        [stock?.product_id]: {
          ...selectedStocks[stock?.product_id],
          [stock?.id]: stock?.weight,
        },
      });
    } catch (err) {
      return err;
    }
  };

  const handleDropDownStock = (batchProduct, selectedStock, action) => {
    const productId =
      selectedStock?.product_id ||
      (action?.removedValues[0]?.product_id ?? null);

    if (productId === null) {
      // Handle deselection of a stock option
      setSelectedStocks((prevSelectedStocks) => {
        const updatedProductStocks = {
          ...prevSelectedStocks[batchProduct.product_id],
        };
        return {
          ...prevSelectedStocks,
          [batchProduct.product_id]: updatedProductStocks,
        };
      });
    } else {
      // Handle selection of a stock option

      setSelectedStocks((prevSelectedStocks) => {
        let batchStock = {};
        if (selectedStock?.id) {
          batchStock = {
            [selectedStock.id]: getTotalWeightNeeded(batchProduct),
          };
        } else {
          batchStock = {
            [action?.removedValues[0]?.id]: null,
          };
        }
        return {
          ...prevSelectedStocks,
          [batchProduct.product_id]: {
            ...prevSelectedStocks[batchProduct.product_id],
            ...batchStock,
          },
        };
      });
    }
  };

  const makeData = (data) => {
    const stocks = Object.values(selectedStocks).reduce(
      (acc, productStocks) => {
        Object.keys(productStocks).forEach((stockId) => {
          if (productStocks[stockId]) {
            acc.push({
              stock_id: stockId,
              weight: productStocks[stockId],
            });
          }
        });
        return acc;
      },
      [],
    );
    const dataToSend = {
      outgoing_batch_code: data.name,
      total_quantity: data.quantity,
      batch_template_id: batchTemplateId,
      stocks: stocks,
    };
    return dataToSend;
  };

  const handleCreateBatch = async (data, e) => {
    e.preventDefault();
    const controller = new AbortController();

    if (isAllStocksSelected) {
      const dataToSend = makeData(data);
      setLoading(true);
      try {
        const res = await axiosPrivate.post('/outgoing-batch', dataToSend, {
          signal: controller.signal,
        });

        if (res.status === 200) {
          setLoading(false);
          controller.abort();
          navigate('/dashboard/outgoing-batch');
        }
      } catch (err) {
        setLoading(false);
        setErr(err.response.data.errors);
      }
    }
  };

  const handleUnique = async (nameProperty, value) => {
    const controller = new AbortController();
    const data = {
      property: nameProperty,
      data: {
        [nameProperty]: value,
      },
    };

    try {
      const res = await axiosPrivate.post('/unique-outgoing-batch', data, {
        signal: controller.signal,
      });
      if (res.status === 200) {
        controller.abort();
        setIsUnique(true);
      }
    } catch (err) {
      setIsUnique(false);
      controller.abort();
    }
  };

  return (
    <div>
      <div>
        <Link to="/dashboard/outgoing-batch" className="d-flex flex-column">
          <img
            className="align-self-end page-close create-page-close-position"
            src={close}
            alt=""
          />
        </Link>
        <h1 className="text-center create-header create-header-my">
          Create New Batch
        </h1>
        <form onSubmit={handleSubmit(handleCreateBatch)}>
          <div className="row p-5 create-data-container">
            <div className="col-md-6 py-3 px-80 pr-1 create-data-info">
              <div className="form-group py-3 d-flex align-items-center">
                <label
                  htmlFor="name"
                  className="col-sm-4 text-warning fw-bold col-form-label"
                >
                  Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    {...register('name', {
                      required: 'Name is Required',
                    })}
                    onBlur={(e) =>
                      handleUnique('outgoing_batch_code', e.target.value)
                    }
                    id="name"
                    placeholder="Name"
                  />
                  {!isUnique && (
                    <p className="text-danger">
                      The outgoing_batch_code is not unique
                    </p>
                  )}
                  {err && <p className="text-danger">{err?.name[0]}</p>}
                </div>
              </div>
              <div className="form-group py-3 d-flex align-items-center">
                <label
                  htmlFor="quantity"
                  className="col-sm-4 text-warning fw-bold col-form-label"
                >
                  Quantity
                </label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    {...register('quantity', {
                      required: 'Quantity is Required',
                      min: {
                        value: 1,
                        message: 'Quantity should be greater than 0',
                      },
                    })}
                    name="quantity"
                    step="1"
                    className="form-control rounded-0"
                    onChange={handleQuantity}
                    id="quantity"
                    placeholder="Quantity"
                  />
                  {errors.quantity && (
                    <p className="text-danger">{errors.quantity.message}</p>
                  )}
                  {err && <p className="text-danger">{err?.quantity[0]}</p>}
                </div>
              </div>

              <div className="form-group py-3 d-flex align-items-center">
                <label
                  htmlFor="batch-template"
                  className="col-sm-4 text-warning fw-bold col-form-label"
                >
                  Mix Recipe
                </label>
                <div className="col-sm-8">
                  <DropDown
                    handleDropDown={handleDropDown}
                    dropDownValue={batchTemplates}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {quantity > 0 && batchProducts.length > 0 && (
                <>
                  {isAllStocksSelected ? (
                    <p className="text-success px-3">All stocks are selected</p>
                  ) : (
                    <p className="text-danger px-3">Please select all stocks</p>
                  )}

                  {batchProducts.map((batchProduct) => {
                    return (
                      <div
                        className="form-group row py-3"
                        key={batchProduct.id}
                      >
                        <label className="col-sm-4 text-warning fw-bold col-form-label">
                          {batchProduct.product.name}
                        </label>
                        <div className="col-sm-8">
                          {batchProduct.product.stocks.length === 1 ? (
                            <>
                              {batchProduct.product.stocks[0].total_weight -
                                batchProduct.product.stocks[0]
                                  .total_sold_weight >
                              getTotalWeightNeeded(batchProduct) ? (
                                <DropDown
                                  isClear={isClear}
                                  handleDropDown={(selectedStock, action) =>
                                    handleDropDownStock(
                                      batchProduct,
                                      selectedStock,
                                      action,
                                    )
                                  }
                                  dropDownValue={batchProduct.product.stocks}
                                  optionLabel="ingoing_batch_number"
                                  defaultValue={
                                    batchProduct.product.stocks.length === 1
                                      ? batchProduct.product.stocks[0]
                                      : null
                                  }
                                />
                              ) : (
                                <p className="text-danger">
                                  Stock Not available
                                </p>
                              )}
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className={
                                  getTotalWeightNeeded(batchProduct) ===
                                  getTotalWeightEntered(batchProduct)
                                    ? 'btn bg-purple my-0 col-sm-8 text-white'
                                    : 'btn btn-warning my-0 col-sm-8 text-white'
                                }
                                data-bs-toggle="modal"
                                data-bs-target={`#stockModal_${batchProduct.id}`}
                              >
                                {getTotalWeightNeeded(batchProduct) ===
                                getTotalWeightEntered(batchProduct)
                                  ? 'Selected'
                                  : 'Select Stocks'}
                              </button>
                              <div
                                className="modal fade"
                                id={`stockModal_${batchProduct.id}`}
                                tabIndex="-1"
                                aria-labelledby="stockModalLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-border-customized">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h1
                                        className="modal-title fs-5"
                                        id="stockModalLabel"
                                      >
                                        Stock(s) Selection & Weight Allocation
                                        for &nbsp;
                                        <span className="text-warning fw-bold">
                                          {batchProduct.product.name}
                                        </span>
                                      </h1>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div className="modal-body">
                                      {batchProduct.product.stocks.length ===
                                      0 ? (
                                        <p className="text-danger">
                                          No stock available for this product!
                                        </p>
                                      ) : (
                                        <>
                                          <table className="table table-borderless">
                                            <thead>
                                              <tr>
                                                <th
                                                  scope="col"
                                                  className="text-warning"
                                                >
                                                  Ingoing Stock Number
                                                </th>
                                                <th
                                                  scope="col"
                                                  className="text-warning"
                                                >
                                                  Weight Available (g)
                                                </th>
                                                <th
                                                  scope="col"
                                                  className="text-warning"
                                                >
                                                  Weight to Allocate
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {batchProduct.product.stocks.map(
                                                (stock) => {
                                                  return (
                                                    <tr
                                                      key={stock.id}
                                                      className="col-sm-12"
                                                    >
                                                      <th className="col-sm-4">
                                                        {
                                                          stock.ingoing_batch_number
                                                        }
                                                      </th>
                                                      <td className="col-sm-4">
                                                        <input
                                                          type="number"
                                                          className="form-control"
                                                          value={
                                                            stock.total_weight -
                                                            stock.total_sold_weight
                                                          }
                                                          disabled
                                                        />
                                                      </td>
                                                      <td className="col-sm-4">
                                                        <input
                                                          type="number"
                                                          step="0.01"
                                                          min={0}
                                                          max={
                                                            stock.total_weight -
                                                            stock.total_sold_weight
                                                          }
                                                          className="form-control"
                                                          onChange={(e) => {
                                                            let enteredWeight =
                                                              parseFloat(
                                                                e.target.value,
                                                              ) || 0;
                                                            if (
                                                              enteredWeight <
                                                                0 ||
                                                              enteredWeight >
                                                                stock.total_weight -
                                                                  stock.total_sold_weight
                                                            ) {
                                                              e.target.value =
                                                                null;
                                                              enteredWeight = 0;
                                                              toast.error(
                                                                'Please enter a valid weight',
                                                              );
                                                            }
                                                            handleStockWeight({
                                                              ...stock,
                                                              weight: Number(
                                                                enteredWeight.toFixed(
                                                                  2,
                                                                ),
                                                              ),
                                                            });
                                                          }}
                                                        />
                                                      </td>
                                                    </tr>
                                                  );
                                                },
                                              )}
                                            </tbody>
                                          </table>
                                          <div className="row">
                                            <div className="col-md-12">
                                              <p className="text-purple my-0">
                                                Total Weight Need to Allocate:{' '}
                                                {getTotalWeightNeeded(
                                                  batchProduct,
                                                )}{' '}
                                                g
                                              </p>
                                              <p className="text-purple my-0">
                                                Total Weight Allocated:{' '}
                                                {getTotalWeightEntered(
                                                  batchProduct,
                                                )}{' '}
                                                g
                                              </p>
                                              <p className="text-danger my-0">
                                                {getTotalWeightNeeded(
                                                  batchProduct,
                                                ) !==
                                                getTotalWeightEntered(
                                                  batchProduct,
                                                )
                                                  ? 'Allocate precise weight for submission'
                                                  : null}
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-warning"
                                        data-bs-dismiss="modal"
                                        disabled={
                                          getTotalWeightNeeded(batchProduct) !==
                                          getTotalWeightEntered(batchProduct)
                                        }
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="col-md-12 p-3 btn-customized">
              <button
                type="submit"
                disabled={
                  !isUnique ||
                  !isAllStocksSelected ||
                  batchProducts.length === 0
                }
                className="btn btn-orange float-end create-create-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create
              </button>
              <div
                className="modal fade modal-success"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <SuccessModal
                  modalText={'Product has been added successfully'}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Create;
