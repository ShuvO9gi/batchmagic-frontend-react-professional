import { useState } from 'react';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { useForm } from 'react-hook-form';
import Loader from '../../../../components/Loader';

export default function Search() {
  const {
    register: productRegitster,
    handleSubmit: productHandleSubmit,
    formState: { errors: productError },
  } = useForm();
  const {
    register: ingoingBatchRegitster,
    handleSubmit: ingoingBatchHandleSubmit,
    formState: { errors: ingoingBatchError },
  } = useForm();
  const { err, setErr } = useState({});
  const { setLoading } = useAuth();
  const [foundProduct, setfoundProduct] = useState();
  const [foundBatch, setFoundBatch] = useState([]);
  const [foundItem, setFoundItem] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [showLoader, setShowLoader] = useState(false);

  const buttons = [
    {
      name: 'Products',
      link: '/dashboard/product',
      class: 'btn-small',
    },
    {
      name: 'Product Stocks',
      link: '/dashboard/stocks',
      class: 'btn-small',
    },
  ];

  const handleSearchInGoingBatchByProduct = async (data, e) => {
    const controller = new AbortController();
    setShowLoader(true);
    e.preventDefault();
    try {
      const res = await axiosPrivate.get(
        `/product/search/${data.product_name}`,
        { signal: controller.signal },
      );
      if (res.status === 200) {
        setfoundProduct(res.data.data);
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

  const handleSearchInGoingBatchByCode = async (data, e) => {
    const controller = new AbortController();
    setShowLoader(true);
    e.preventDefault();
    try {
      const res = await axiosPrivate.get(
        `/stock/search/${data.ingoing_batch_name}`,
        { signal: controller.signal },
      );

      if (res.status === 200) {
        setFoundBatch(res.data.data);
        res.data.data.length > 0 ? setFoundItem(true) : setFoundItem(false);
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

  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      <div className="container my-5">
        {foundBatch[0]?.ingoing_batch_number ? (
          <h3 className="text-purple my-5">
            Ingoing Batch Found:{' '}
            <span className="text-purple-fade">
              {foundBatch[0]?.ingoing_batch_number}
            </span>
          </h3>
        ) : foundProduct?.name ? (
          <h3 className="text-purple my-5">
            Product Found:{' '}
            <span className="text-purple-fade">{foundProduct?.name}</span>
          </h3>
        ) : (
          <h3 className="text-purple my-5">Search for ingoing product</h3>
        )}
        {foundBatch.length <= 0 && !foundProduct ? (
          <>
            <div className="d-flex ">
              <form
                className="m-2"
                onSubmit={productHandleSubmit(
                  handleSearchInGoingBatchByProduct,
                )}
              >
                <div className="row supplier-form p-5">
                  <div className="col-md-6 p-3">
                    <label
                      htmlFor="product-name"
                      className="form-label fw-bold text-warning"
                    >
                      Product name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...productRegitster('product_name', {
                        required: 'Product name Code is Required',
                      })}
                      id="product-name"
                      placeholder="Product name"
                    />
                    {productError.product_name && (
                      <p className="text-danger">
                        {productError.product_name.message}
                      </p>
                    )}
                    {err && (
                      <p className="text-danger">{err?.product_name[0]}</p>
                    )}
                  </div>

                  <div className="col-md-12 p-3">
                    <button type="submit" className="btn btn-orange float-end">
                      Search
                    </button>
                  </div>
                </div>
              </form>
              <form
                className="m-2"
                onSubmit={ingoingBatchHandleSubmit(
                  handleSearchInGoingBatchByCode,
                )}
              >
                <div className="row supplier-form p-5">
                  <div className="col-md-6 p-3">
                    <label
                      htmlFor="ingoing-batch-name"
                      className="form-label fw-bold text-warning"
                    >
                      Ingoing Batch name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...ingoingBatchRegitster('ingoing_batch_name', {
                        required: 'Outgoing Batch Code is Required',
                      })}
                      id="ingoing-batch-name"
                      placeholder="Ingoing Batch name"
                    />
                    {ingoingBatchError.ingoing_batch_name && (
                      <p className="text-danger">
                        {ingoingBatchError.ingoing_batch_name.message}
                      </p>
                    )}
                    {err && (
                      <p className="text-danger">
                        {err?.ingoing_batch_name[0]}
                      </p>
                    )}
                  </div>

                  <div className="col-md-12 p-3">
                    <button type="submit" className="btn btn-orange float-end">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {showLoader ? (
              <Loader />
            ) : (
              !foundItem && (
                <div className="d-flex justify-content-center">
                  <h3 className="text-danger my-5">
                    No Product or Batch Found!
                  </h3>
                </div>
              )
            )}
          </>
        ) : foundBatch[0] ? (
          <>
            <div className="row supplier-form p-5 my-5">
              <div className="col-md-12 p-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-warning">
                        Customer
                      </th>
                      <th scope="col" className="text-warning">
                        Contact
                      </th>
                      <th scope="col" className="text-warning">
                        Product Name
                      </th>
                      <th scope="col" className="text-warning">
                        Date of Shipment
                      </th>
                      {/* <th scope="col" className="text-warning">
                        Total Weight (g)
                      </th> */}
                      <th scope="col" className="text-warning">
                        Outgoing Batch
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {foundBatch.map(
                      (batch) =>
                        batch?.outgoing_product_stocks &&
                        batch?.outgoing_product_stocks.map(
                          (stock) =>
                            stock?.outgoing_batch &&
                            stock?.outgoing_batch.shipment &&
                            stock?.outgoing_batch.shipment.map((shipment) => (
                              <tr key={shipment?.id}>
                                <td>{shipment?.customer?.name}</td>
                                <td>
                                  <td>
                                    {' '}
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#customerModal${shipment.id}`}
                                    >
                                      Info
                                    </button>
                                  </td>
                                </td>
                                <td>{batch?.related_product?.name}</td>
                                <td>{shipment?.shipment_date}</td>
                                {/* {
                                  <td>
                                    {stock?.outgoing_batch?.batch_template_product?.find(
                                      (product) =>
                                        product.product_id ===
                                        batch?.related_product?.id,
                                    )?.weight * shipment?.quantity}
                                  </td>
                                } */}
                                <td>
                                  {stock?.outgoing_batch.outgoing_batch_code}
                                </td>

                                <div
                                  className="modal fade"
                                  id={`customerModal${shipment.id}`}
                                  tabIndex="-1"
                                  aria-labelledby={`customerModalLabel${shipment.id}`}
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog  modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id={`customerModalLabel${shipment.id}`}
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
                                      <div className="modal-body ">
                                        <div className="row">
                                          <div className="col-md-6">
                                            <label
                                              htmlFor="name"
                                              className="text-purple"
                                            >
                                              Name:
                                            </label>
                                            <p id="name">
                                              {shipment?.customer?.name}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <label
                                              htmlFor="email"
                                              className="text-purple"
                                            >
                                              Address:
                                            </label>
                                            <p id="email">
                                              {shipment.customer.address}
                                            </p>
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
                                            <p id="address">
                                              {shipment.customer.address}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <label
                                              htmlFor="phone"
                                              className="text-purple"
                                            >
                                              City:
                                            </label>
                                            <p id="phone">
                                              {shipment.customer.city}
                                            </p>
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
                                            <p id="phone">
                                              {shipment.customer.zip}
                                            </p>
                                          </div>
                                          <div className="col-md-6">
                                            <label
                                              htmlFor="address"
                                              className="text-purple"
                                            >
                                              ContactPerson Name:
                                            </label>
                                            <p id="address">
                                              {
                                                shipment.customer
                                                  .contact_person_name
                                              }
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
                                              {
                                                shipment.customer
                                                  .contact_person_phone
                                              }
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
                                              {
                                                shipment.customer
                                                  .contact_person_email
                                              }
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
                              </tr>
                            )),
                        ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <h4 className="text-purple my-5">
              The supplier of the product is:
            </h4>
            <div className="row supplier-form p-5 my-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="text-warning">
                      Name
                    </th>
                    <th scope="col" className="text-warning">
                      Address
                    </th>
                    <th scope="col" className="text-warning">
                      City
                    </th>
                    <th scope="col" className="text-warning">
                      Zip
                    </th>
                    <th scope="col" className="text-warning">
                      Contact Person Name
                    </th>
                    <th scope="col" className="text-warning">
                      Contact Person Phone
                    </th>
                    <th scope="col" className="text-warning">
                      Contact Person Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{foundProduct?.supplier?.name}</td>
                    <td>{foundProduct?.supplier.address}</td>
                    <td>{foundProduct?.supplier.city}</td>
                    <td>{foundProduct?.supplier.zip}</td>
                    <td>{foundProduct?.supplier.contact_person_name}</td>
                    <td>{foundProduct?.supplier.contact_person_phone}</td>
                    <td>{foundProduct?.supplier.contact_person_email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="text-purple my-5">
              The product was use in these outgoing shipments:
            </h4>
            <div className="row supplier-form p-5 my-5">
              <div className="col-md-12 p-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-warning">
                        Customer
                      </th>
                      <th scope="col" className="text-warning">
                        Contact
                      </th>
                      <th scope="col" className="text-warning">
                        Ingoing Batch Number
                      </th>
                      <th scope="col" className="text-warning">
                        Date of Shipment
                      </th>
                      {/* <th scope="col" className="text-warning">
                        <span className="text-capitalize">
                          {foundProduct?.name}
                        </span>{' '}
                        Total Weight (g)
                      </th> */}
                      <th scope="col" className="text-warning">
                        Outgoing Batch
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {foundProduct?.stocks &&
                      foundProduct?.stocks.map(
                        (stock) =>
                          stock?.outgoing_product_stocks &&
                          stock?.outgoing_product_stocks.map(
                            (outgoing) =>
                              outgoing?.outgoing_batch.shipment &&
                              outgoing?.outgoing_batch.shipment.map(
                                (shipment) => (
                                  <tr key={shipment?.id}>
                                    <td>{shipment?.customer?.name}</td>
                                    <td>
                                      <td>
                                        {' '}
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          data-bs-toggle="modal"
                                          data-bs-target={`#customerModal${shipment.id}`}
                                        >
                                          Info
                                        </button>
                                      </td>
                                    </td>
                                    <td>{stock?.ingoing_batch_number}</td>
                                    <td>{shipment?.shipment_date}</td>
                                    {/* {
                                      <td>
                                        {outgoing?.outgoing_batch?.batch_template_product?.find(
                                          (product) =>
                                            product.product_id ===
                                            foundProduct?.id,
                                        )?.weight * shipment?.quantity}
                                      </td>
                                    } */}
                                    <td>
                                      {
                                        outgoing?.outgoing_batch
                                          .outgoing_batch_code
                                      }
                                    </td>

                                    <div
                                      className="modal fade"
                                      id={`customerModal${shipment.id}`}
                                      tabIndex="-1"
                                      aria-labelledby={`customerModalLabel${shipment.id}`}
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog  modal-dialog-centered">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id={`customerModalLabel${shipment.id}`}
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
                                          <div className="modal-body ">
                                            <div className="row">
                                              <div className="col-md-6">
                                                <label
                                                  htmlFor="name"
                                                  className="text-purple"
                                                >
                                                  Name:
                                                </label>
                                                <p id="name">
                                                  {shipment?.customer?.name}
                                                </p>
                                              </div>
                                              <div className="col-md-6">
                                                <label
                                                  htmlFor="email"
                                                  className="text-purple"
                                                >
                                                  Address:
                                                </label>
                                                <p id="email">
                                                  {shipment.customer.address}
                                                </p>
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
                                                <p id="address">
                                                  {shipment.customer.address}
                                                </p>
                                              </div>
                                              <div className="col-md-6">
                                                <label
                                                  htmlFor="phone"
                                                  className="text-purple"
                                                >
                                                  City:
                                                </label>
                                                <p id="phone">
                                                  {shipment.customer.city}
                                                </p>
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
                                                <p id="phone">
                                                  {shipment.customer.zip}
                                                </p>
                                              </div>
                                              <div className="col-md-6">
                                                <label
                                                  htmlFor="address"
                                                  className="text-purple"
                                                >
                                                  ContactPerson Name:
                                                </label>
                                                <p id="address">
                                                  {
                                                    shipment.customer
                                                      .contact_person_name
                                                  }
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
                                                  {
                                                    shipment.customer
                                                      .contact_person_phone
                                                  }
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
                                                  {
                                                    shipment.customer
                                                      .contact_person_email
                                                  }
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
                                  </tr>
                                ),
                              ),
                          ),
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
