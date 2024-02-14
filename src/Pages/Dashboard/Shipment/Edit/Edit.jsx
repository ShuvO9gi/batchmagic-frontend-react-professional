import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import { isEmpty } from '../../../../components/utils';
import close from '../../../../assets/Logo/actions/cross.svg';
import DropDown from '../../../../components/DropDown';
import ErrorModal from '../../../../components/ErrorModal';

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();
  const { err, setErr } = useState({});
  const [shipment, setShipment] = useState();
  const [outgoingBatches, setOutgoingBatches] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [outgoingBatch_id, setOutgoingBatch_id] = useState();
  const [customer_id, setCustomer_id] = useState();
  const [totalTotalQuantity, setTotalQuantity] = useState();
  const { setLoading } = useAuth();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getShipment = async () => {
      try {
        const res = await axiosPrivate.get(`/shipment/${params.id}`, {
          signal: controller.signal,
        });
        if (isMounted && res.status === 200) {
          setLoading(false);
          controller.abort();
          setTotalQuantity(res.data.data.outgoing_batch.total_quantity);
          setShipment(res.data.data);
          setOutgoingBatch_id(res.data.data.outgoing_batch_id);
          setCustomer_id(res.data.data.customer_id);
        }
      } catch (err) {
        setLoading(false);
        setErr(err.response.data.errors);
      }
    };
    getShipment();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (shipment) {
      setValue('name', shipment.name);
      setValue('shipment_date', shipment.shipment_date);
      setValue('quantity', shipment.quantity);
      setValue('outgoingBatch_id', shipment.outgoing_batch_id);
      setValue('customer_id', shipment.customer_id);
    }
  }, [shipment, setValue]);

  useEffect(() => {
    const controller = new AbortController();
    const getOutgoingBatches = async () => {
      try {
        const res = await axiosPrivate.get('/outgoing-batches', {
          signal: controller.signal,
        });
        if (res.status === 200) {
          setOutgoingBatches(res?.data?.data);
        }
      } catch (err) {
        <ErrorModal />;
      }
    };

    const customers = async () => {
      try {
        const res = await axiosPrivate.get('/customers', {
          signal: controller.signal,
        });
        if (res.status === 200) {
          setCustomers(res?.data?.data);
        }
      } catch (err) {
        <ErrorModal />;
      }
    };
    getOutgoingBatches();
    customers();
    return () => {
      controller.abort();
    };
  }, []);

  const handleDropDown = (outgoingBatch) => {
    setOutgoingBatch_id(outgoingBatch?.id);
    setTotalQuantity(outgoingBatch?.total_quantity);
  };

  const handleCustomerDropDown = (customer) => {
    setCustomer_id(customer?.id);
  };

  const makeData = (data) => {
    data.outgoing_batch_id = outgoingBatch_id;
    data.customer_id = customer_id;
    return {
      name: data.name ? data.name : shipment.name,
      shipment_date: data.shipment_date
        ? data.shipment_date
        : shipment.shipment_date,
      quantity: data.quantity ? data.quantity : shipment.quantity,
      outgoing_batch_id: data.outgoing_batch_id
        ? data.outgoing_batch_id
        : shipment.outgoing_batch_id,
      customer_id: data.customer_id ? data.customer_id : shipment.customer_id,
    };
  };

  const handleUpdateShipment = async (data, e) => {
    const formData = makeData(data);
    const controller = new AbortController();
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.put(`/shipment/${params.id}`, formData, {
        signal: controller.signal,
      });

      if (res.status === 200) {
        setLoading(false);
        controller.abort();
        navigate('/dashboard/shipments');
      }
    } catch (err) {
      setLoading(false);
      setErr(err.response.data.errors);
    }
  };

  const handleUnique = async (nameProperty, value) => {
    if (shipment?.[nameProperty] !== value) {
      const controller = new AbortController();
      const data = {
        property: nameProperty,
        data: {
          [nameProperty]: value,
        },
      };

      try {
        const res = await axiosPrivate.post('/unique-shipment-batch', data, {
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
      <div>
        {isEmpty(shipment) ? (
          <Loader />
        ) : (
          <div>
            <Link to="/dashboard/shipments" className="d-flex flex-column">
              <img
                className="align-self-end page-close create-page-close-position"
                src={close}
                alt=""
              />
            </Link>
            <h1 className="text-center edit-header edit-header-my">
              Update Information
            </h1>
            <form onSubmit={handleSubmit(handleUpdateShipment)}>
              <div className="row p-5 edit-data-container edit-data-info">
                <div className="col-md-6 py-3 px-80">
                  <label
                    htmlFor="shipment-name"
                    className="form-label fw-bold text-warning"
                  >
                    Shipment Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    {...register('name', {
                      required: 'Name is Required',
                    })}
                    onBlur={(e) => handleUnique('name', e.target.value)}
                    id="shipment-name"
                    defaultValue={shipment?.name}
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                  {err && <p className="text-danger">{err?.name[0]}</p>}
                </div>

                <div className="col-md-6 py-3 px-80">
                  <label
                    htmlFor="shipment-date"
                    className="form-label fw-bold text-warning"
                  >
                    Shipment Date
                  </label>
                  <input
                    type="date"
                    {...register('shipment_date', {
                      required: 'Shipment Date is Required',
                    })}
                    defaultValue={new Date().toISOString().substr(0, 10)}
                    className="form-control rounded-0"
                    id="shipment-date"
                    placeholder="Shipment Date"
                  />
                  {errors.shipment_date && (
                    <p className="text-danger">
                      {errors.shipment_date.message}
                    </p>
                  )}
                  {err && <p className="text-danger">{err?.shipment_date}</p>}
                </div>

                <div className="col-md-6 py-3 px-80">
                  <label
                    htmlFor="outgoing-batch"
                    className="form-label fw-bold text-warning"
                  >
                    Outgoing Batch
                  </label>
                  <DropDown
                    handleDropDown={handleDropDown}
                    dropDownValue={outgoingBatches}
                    defaultValue={outgoingBatches.find(
                      (outgoingBatch) =>
                        outgoingBatch.id === shipment?.outgoing_batch_id,
                    )}
                    optionLabel="outgoing_batch_code"
                  />
                </div>
                {outgoingBatch_id && (
                  <div className="col-md-6 py-3 px-80">
                    <label
                      htmlFor="quantity"
                      className="form-label fw-bold text-warning"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      step="1"
                      min={1}
                      className="form-control rounded-0"
                      {...register('quantity', {
                        required: 'Quantity is Required',
                        validate: {
                          positive: (value) =>
                            parseFloat(value) > 0 ||
                            'Quantity must be positive',
                          max: (value) =>
                            parseFloat(value) <= totalTotalQuantity ||
                            `Quantity must be less than or equal to ${totalTotalQuantity}`,
                          integer: (value) =>
                            Number.isInteger(parseFloat(value)) ||
                            'Quantity must be an integer',
                        },
                      })}
                      id="quantity"
                      defaultValue={shipment?.quantity}
                      placeholder="Quantity"
                    />
                    {errors.quantity && (
                      <p className="text-danger">{errors.quantity.message}</p>
                    )}
                    {err && <p className="text-danger">{err?.quantity[0]}</p>}
                  </div>
                )}

                <div className="col-md-6 py-3 px-80">
                  <label
                    htmlFor="customer"
                    className="form-label fw-bold text-warning"
                  >
                    Customer
                  </label>
                  <DropDown
                    handleDropDown={handleCustomerDropDown}
                    dropDownValue={customers}
                    defaultValue={customers.find(
                      (customer) => customer.id === shipment?.customer_id,
                    )}
                  />
                </div>
                {customer_id && outgoingBatch_id && (
                  <div className="col-md-12 p-3">
                    <button
                      type="submit"
                      disabled={errors?.name?.message}
                      className="btn btn-orange float-end edit-update-btn"
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
