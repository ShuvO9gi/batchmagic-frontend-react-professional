import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import { Link } from 'react-router-dom';
import close from '../../../../assets/Logo/actions/cross.svg';

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { err, setErr } = useState({});
  const { setLoading } = useAuth();
  const [foundBatch, setFoundBatch] = useState();
  const [foundItem, setFoundItem] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleSearchOutGoingBatch = async (data, e) => {
    const controller = new AbortController();
    setShowLoader(true);
    e.preventDefault();
    try {
      const res = await axiosPrivate.get(
        `/outgoing-batch/search/${data.outgoing_batch_code}`,
        { signal: controller.signal },
      );

      if (res.status === 200) {
        setFoundBatch(res.data.data);
        setFoundItem(true);
        setShowLoader(false);
        controller.abort();
      } else {
        setFoundItem(false);
        setShowLoader(false);
      }
    } catch (err) {
      setFoundItem(false);
      setShowLoader(false);
      setLoading(false);
      setErr(err.response.data.errors);
    }
  };

  useEffect(() => {
    if (foundBatch?.batch_template?.batch_products) {
      const newBatchProducts = foundBatch.batch_template.batch_products.map(
        (batchProduct) => {
          const stocks = foundBatch.outgoing_stocks.find(
            (stocks) => stocks.stock.product_id === batchProduct?.product.id,
          );
          return {
            ...batchProduct,
            ingoing_batch: stocks?.stock.ingoing_batch_number,
          };
        },
      );

      if (
        JSON.stringify(newBatchProducts) !==
        JSON.stringify(foundBatch.batch_template.batch_products)
      ) {
        setFoundBatch((prev) => ({
          ...prev,
          batch_template: {
            ...prev.batch_template,
            batch_products: newBatchProducts,
          },
        }));
      }
    }
  }, [foundBatch?.batch_template?.batch_products]);

  return (
    <div>
      <div>
        <Link to="/dashboard/outgoing-batch" className="d-flex flex-column">
          <img
            className="align-self-end page-close edit-page-close-position"
            src={close}
            alt=""
          />
        </Link>
        {foundBatch?.outgoing_batch_code ? (
          <h3 className="text-left edit-header edit-header-my batch-found-header">
            {' '}
            Batch Number Found:{' '}
            <span className="text-purple-fade">
              {foundBatch?.outgoing_batch_code}
            </span>{' '}
          </h3>
        ) : (
          <h1 className="text-center edit-header edit-header-my">
            Search Outgoing Batch
          </h1>
        )}
        {!foundBatch ? (
          <>
            <form onSubmit={handleSubmit(handleSearchOutGoingBatch)}>
              <div className="row p-5 edit-data-container">
                <div className="col-md-6 p-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label fw-bold search-header"
                  >
                    Outgoing Batch Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('outgoing_batch_code', {
                      required: 'Outgoing Batch Code is Required',
                    })}
                    id="exampleFormControlInput1"
                    placeholder="Outgoing Batch Code"
                  />
                  {errors.outgoing_batch_code && (
                    <p className="text-danger">
                      {errors.outgoing_batch_code.message}
                    </p>
                  )}
                  {err && (
                    <p className="text-danger">{err?.outgoing_batch_code[0]}</p>
                  )}
                </div>

                <div className="col-md-12 p-3 btn-customized">
                  <button
                    type="submit"
                    className="btn btn-orange float-end edit-update-btn"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
            {showLoader ? (
              <Loader />
            ) : (
              !foundItem && (
                <div className="d-flex justify-content-center my-5">
                  <h3 className="text-danger">No Outgoing Batch Found!</h3>
                </div>
              )
            )}
          </>
        ) : (
          <div className="row p-5 edit-data-container">
            <div className="col-md-12 p-3">
              <table className="table outgoing-batch-table-header">
                <thead>
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Date of shipment</th>
                    <th scope="col">Total weight</th>
                    <th scope="col">Breakdown</th>
                  </tr>
                </thead>
                <tbody>
                  {foundBatch.shipment.map((ship) => (
                    <tr key={ship?.id}>
                      <td>{ship.customer.name}</td>
                      <td>
                        {' '}
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#customerModal${ship.id}`}
                        >
                          Info
                        </button>
                      </td>
                      <td>{ship.quantity}</td>
                      <td>{ship.shipment_date}</td>
                      <td>
                        {ship.quantity *
                          foundBatch?.batch_template?.total_weight}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#breakdownModal${ship.id}`}
                        >
                          Info
                        </button>
                      </td>

                      <div
                        className="modal fade"
                        id={`customerModal${ship.id}`}
                        tabIndex="-1"
                        aria-labelledby={`customerModalLabel${ship.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog  modal-dialog-centered modal-border-customized">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`customerModalLabel${ship.id}`}
                              >
                                Customer Details
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <label htmlFor="name" className="text-purple">
                                    Name:
                                  </label>
                                  <p id="name">{ship.customer.name}</p>
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor="email"
                                    className="text-purple"
                                  >
                                    Address:
                                  </label>
                                  <p id="email">{ship.customer.address}</p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <label
                                    htmlFor="address"
                                    className="text-purple"
                                  >
                                    Address:
                                  </label>
                                  <p id="address">{ship.customer.address}</p>
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor="phone"
                                    className="text-purple"
                                  >
                                    City:
                                  </label>
                                  <p id="phone">{ship.customer.city}</p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <label
                                    htmlFor="phone"
                                    className="text-purple"
                                  >
                                    Zip:
                                  </label>
                                  <p id="phone">{ship.customer.zip}</p>
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor="address"
                                    className="text-purple"
                                  >
                                    ContactPerson Name:
                                  </label>
                                  <p id="address">
                                    {ship.customer.contact_person_name}
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <label
                                    htmlFor="phone"
                                    className="text-purple"
                                  >
                                    ContactPerson Phone:
                                  </label>
                                  <p id="phone">
                                    {ship.customer.contact_person_phone}
                                  </p>
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor="address"
                                    className="text-purple"
                                  >
                                    ContactPerson Email:
                                  </label>
                                  <p id="address">
                                    {ship.customer.contact_person_email}
                                  </p>
                                </div>
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
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="modal fade"
                        id={`breakdownModal${ship.id}`}
                        tabIndex="-1"
                        aria-labelledby={`breakdownModalLabel${ship.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-xl modal-dialog-centered modal-border-customized">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`breakdownModalLabel${ship.id}`}
                              >
                                Break Down
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body ">
                              <table className="table table-striped outgoing-batch-table-header">
                                <thead>
                                  <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Ingoing batch numbers</th>
                                    <th scope="col">Total weight</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    <>
                                      {foundBatch.batch_template?.batch_products.map(
                                        (product) => (
                                          <tr key={product?.id}>
                                            <td>{product?.product.name}</td>
                                            <td className="d-flex">
                                              {foundBatch.outgoing_stocks.map(
                                                (stocks) =>
                                                  stocks.stock.product_id ===
                                                    product?.product.id && (
                                                    <p
                                                      className="mx-3"
                                                      key={stocks.id}
                                                    >
                                                      {
                                                        stocks.stock
                                                          .ingoing_batch_number
                                                      }
                                                    </p>
                                                  ),
                                              )}
                                            </td>

                                            <td>
                                              {(
                                                product?.weight * ship.quantity
                                              ).toFixed(2)}
                                            </td>
                                          </tr>
                                        ),
                                      )}
                                      <tr className="my-3"></tr>

                                      <tr className="bg-transparent my-3">
                                        <td></td>
                                        <td className="fw-bold">
                                          Mass balance :{' '}
                                        </td>

                                        <td className="fw-bold">
                                          {ship.quantity *
                                            foundBatch?.batch_template
                                              ?.total_weight}
                                        </td>
                                      </tr>
                                    </>
                                  }
                                </tbody>
                              </table>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
