import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavigation from '../../../../../components/DashboardNavigation';
import DropDown from '../../../../../components/DropDown';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import Loader from '../../../../../components/Loader';
import { isEmpty } from '../../../../../components/utils';
import ErrorModal from '../../../../../components/ErrorModal';

const buttons = [
  {
    name: 'Batch Templates',
    link: '/dashboard/batch-template',
  },
  {
    name: 'Outgoing Batches',
    link: '/dashboard/outgoing-batch',
  },
  {
    name: 'Search batch',
    link: '/dashboard/outgoing-batch/search',
  },
];

const Edit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState();
  const [weight, setWeight] = useState();
  const [amount, setAmount] = useState();

  const [name, setName] = useState();
  const [totalWeight, setTotalWeight] = useState(0);
  const [externalRef, setExternalRef] = useState();
  const [batchProducts, setBatchProducts] = useState([]);
  const [batchTemplate, setBatchTemplate] = useState();

  const [disableProductSubmit, setDisableProductSubmit] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [err, setErr] = useState();

  const { setLoading } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBatchTemplate = async () => {
      try {
        const res = await axiosPrivate.get(`/batch-template/${id}`, {
          signal: controller.signal,
        });
        if (isMounted && res.status === 200) {
          setLoading(false);
          controller.abort();
          setName(res.data.data.name);
          setTotalWeight(Number(res.data.data.total_weight.toFixed(2)));
          setExternalRef(res.data.data.external_ref);
          setBatchTemplate(res.data.data);
          const allBatchProducts = res.data.data.batch_products;
          setBatchProducts(
            allBatchProducts.map((batchProduct) => ({
              product_id: batchProduct.product.id,
              product_name: batchProduct.product.name,
              weight: Number(batchProduct.weight.toFixed(2)),
              amount: batchProduct.amount,
            })),
          );
        }
      } catch (err) {
        setLoading(false);
        setErr(err.response?.data?.errors);
      }
    };

    getBatchTemplate();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getAllProducts = async () => {
      try {
        const res = await axiosPrivate.get('/products', {
          signal: controller.signal,
        });
        if (res.status === 200) {
          controller.abort();
          setAllProducts(res?.data?.data);
        }
      } catch (err) {
        <ErrorModal />;
      }
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts && batchProducts) {
      const filteredProducts = allProducts.filter(
        (product) =>
          !batchProducts.some(
            (batchProduct) => batchProduct.product_id === product.id,
          ),
      );
      setProducts(filteredProducts);
    }
  }, [allProducts, batchProducts]);

  useEffect(() => {
    setDisableProductSubmit(
      weight > 0 && amount > 0 && productName ? false : true,
    );
  }, [weight, amount, productName]);

  useEffect(() => {
    setValue('name', name);
    setValue('total_weight', totalWeight);
    setValue('external_ref', externalRef);
  }, [name, totalWeight, externalRef, setValue]);

  const makeData = () => {
    return {
      name: name,
      products: batchProducts,
      total_weight: totalWeight,
      external_ref: externalRef,
    };
  };

  const handleUpdateBatchTemplete = async (data, e) => {
    const formData = makeData(data);
    const controller = new AbortController();
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosPrivate.put(`/batch-template/${id}`, formData, {
        signal: controller.signal,
      });

      if (res.status === 200) {
        setLoading(false);
        controller.abort();
        navigate('/dashboard/batch-template');
      }
    } catch (err) {
      setLoading(false);
      setErr(err.response?.data?.errors);
    }
  };

  const handleDropDown = (product) => {
    setProductId(product?.id);
    setProductName(product?.name);
  };

  const handleProductDelete = (name, weight) => {
    const updatedBatchProducts = batchProducts.filter(
      (item) => item.product_name !== name,
    );
    setBatchProducts(updatedBatchProducts);
    handleTotalWeight(weight);
  };

  const handleAddBatchProducts = () => {
    setBatchProducts((batchProducts) => [
      ...batchProducts,
      {
        product_id: productId,
        product_name: productName,
        weight: weight,
        amount: amount,
      },
    ]);
    handleTotalWeight();
    setAmount(0);
    setWeight(0);
    setDisableProductSubmit(true);

    setIsClear(true);

    reset({
      productName: '',
      weight: '',
      amount: '',
      productId: '',
    });

    setTimeout(() => {
      setIsClear(false);
    }, 10);
  };

  const handleTotalWeight = (removeWeight = 0) => {
    const newWeight =
      removeWeight > 0 ? totalWeight - removeWeight : totalWeight + weight;
    setTotalWeight(Number(newWeight.toFixed(2)));
  };

  const handleUnique = async (nameProperty, value) => {
    if (batchTemplate?.[nameProperty] !== value) {
      const controller = new AbortController();
      const data = {
        property: nameProperty,
        data: {
          [nameProperty]: value,
        },
      };

      try {
        const res = await axiosPrivate.post('/unique-batch-template', data, {
          signal: controller.signal,
        });
        if (res.status === 200) {
          controller.abort();
          setError(nameProperty, {});
        }
      } catch (err) {
        setError(nameProperty, {
          type: 'manual',
          message: `The ${nameProperty} is not unique`,
        });
        controller.abort();
      }
    } else {
      setError(nameProperty, {});
    }
  };

  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {isEmpty(batchTemplate) ? (
        <Loader />
      ) : (
        <div className="container my-5">
          <h3 className="text-purple my-5">Update Batch Templete</h3>
          <form onSubmit={handleSubmit(handleUpdateBatchTemplete)}>
            <div className="row supplier-form p-5">
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-9">
                    <label
                      htmlFor="name"
                      className="form-label fw-bold text-warning"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register('name', {
                        required: 'Name is Required',
                      })}
                      onBlur={(e) => handleUnique('name', e.target.value)}
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                    {err && <p className="text-danger">{err?.name[0]}</p>}
                  </div>
                  <div className="col-md-9 py-3">
                    <label
                      htmlFor="total-weight"
                      className="form-label fw-bold text-warning"
                    >
                      Total Weight (g)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={totalWeight}
                      {...register('total_weight', {
                        min: {
                          value: 1,
                          message: "Total weight can't be 0",
                        },
                      })}
                      disabled
                      id="total-weight"
                      placeholder="Total weight"
                    />
                    {errors.total_weight && (
                      <p className="text-danger">
                        {errors.total_weight.message}
                      </p>
                    )}
                    {err && (
                      <p className="text-danger">{err?.total_weight[0]}</p>
                    )}
                  </div>
                  <div className="col-md-9">
                    <label
                      htmlFor="external-ref"
                      className="form-label fw-bold text-warning"
                    >
                      External Ref ID
                    </label>
                    <input
                      type="text"
                      {...register('external_ref', {
                        required: 'External ref ID is Required',
                      })}
                      onBlur={(e) =>
                        handleUnique('external_ref', e.target.value)
                      }
                      className="form-control"
                      id="external-ref"
                      defaultValue={externalRef}
                      onChange={(e) => setExternalRef(e.target.value)}
                      placeholder="External ref ID"
                    />
                    {errors.external_ref && (
                      <p className="text-danger">
                        {errors.external_ref.message}
                      </p>
                    )}
                    {err && <p className="text-danger">{err?.external_ref}</p>}
                  </div>
                </div>
              </div>

              <div className="col-md-8 pb-5">
                <button
                  type="button"
                  className="btn btn-warning text-white float-end"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Add a Product
                </button>

                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          Add a New Product
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="p-3">
                          <label
                            htmlFor="products"
                            className="form-label fw-bold text-warning"
                          >
                            Product
                          </label>
                          <DropDown
                            isClear={isClear}
                            handleDropDown={handleDropDown}
                            dropDownValue={products}
                          />
                        </div>
                        <div className="p-3">
                          <label
                            htmlFor="weight"
                            className="form-label fw-bold text-warning"
                          >
                            Weight (g)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min={0}
                            {...register('weight')}
                            name="weight"
                            className="form-control"
                            onChange={(e) =>
                              setWeight(
                                Number(parseFloat(e.target.value).toFixed(2)),
                              )
                            }
                            id="weight"
                            placeholder="Weight"
                          />
                        </div>
                        <div className="p-3">
                          <label
                            htmlFor="amount"
                            className="form-label fw-bold text-warning"
                          >
                            Amount
                          </label>
                          <input
                            type="number"
                            step="1"
                            min={1}
                            {...register('amount')}
                            name="amount"
                            className="form-control"
                            onChange={(e) =>
                              setAmount(Number(parseInt(e.target.value)))
                            }
                            id="amount"
                            placeholder="Amount"
                          />
                        </div>
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
                          data-bs-dismiss="modal"
                          onClick={handleAddBatchProducts}
                          className="btn btn-warning"
                          disabled={disableProductSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-warning">
                        Product Name
                      </th>
                      <th scope="col" className="text-warning">
                        Weight (g)
                      </th>
                      <th scope="col" className="text-warning">
                        Amount
                      </th>
                      <th scope="col" className="text-warning"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchProducts?.map((item) => {
                      return (
                        <tr key={item?.id}>
                          <th scope="row">{item.product_name}</th>
                          <td>{item.weight}</td>
                          <td>{item.amount}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() =>
                                handleProductDelete(
                                  item.product_name,
                                  item.weight,
                                  item.product_id,
                                )
                              }
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="m-5">
                <button
                  type="submit"
                  disabled={
                    errors?.external_ref?.message || errors?.name?.message
                  }
                  className="btn btn-orange float-end"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
