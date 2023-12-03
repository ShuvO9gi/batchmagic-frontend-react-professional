import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../../../../components/DashboardNavigation';
import DropDown from '../../../../../components/DropDown';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';
import ErrorModal from '../../../../../components/ErrorModal';

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
  {
    name: 'Search Product',
    link: '/dashboard/product/search',
    class: 'btn-small',
  },
];

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState();
  const { err, setErr } = useState({});
  const { setLoading } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        const res = await axiosPrivate.get('/products', {
          signal: controller.signal,
        });
        if (res.status === 200) {
          setProducts(res?.data?.data);
        }
      } catch (err) {
        <ErrorModal />;
      }
    };
    getProducts();
    return () => {
      controller.abort();
    };
  }, []);

  const handleDropDown = (product) => {
    setProductId(product?.id);
  };

  const handleAddProduct = async (data, e) => {
    data.product_id = productId;
    const controller = new AbortController();
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.post('/stock', data, {
        signal: controller.signal,
      });

      if (res.status === 200) {
        setLoading(false);
        controller.abort();
        navigate('/dashboard/stocks');
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response.data.errors?.batch_before_date[0] ||
          "Couldn't add product to stock",
      );
      setErr(err.response.data.errors);
    }
  };

  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      <div>
        <div className="container my-5">
          <h3 className="text-purple my-5">Add Products to Stock</h3>
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className="row supplier-form p-5">
              <div className="col-md-6 p-3">
                <label
                  htmlFor="product"
                  className="form-label fw-bold text-warning"
                >
                  Product
                </label>
                <DropDown
                  handleDropDown={handleDropDown}
                  dropDownValue={products}
                />
              </div>
              <div className="col-md-6 p-3">
                <label
                  htmlFor="weight"
                  className="form-label fw-bold text-warning"
                >
                  Weight (g)
                </label>
                <input
                  type="number"
                  step="0.01"
                  max={999999.99}
                  className="form-control"
                  {...register('total_weight', {
                    required: 'Weight is required',
                    max: {
                      value: 999999.99,
                      message: 'Weight must be less than 999999.99',
                    },
                    min: {
                      value: 0,
                      message: 'Weight must be greater than 0',
                    },
                  })}
                  id="weight"
                  placeholder="Weight"
                />
                {errors.total_weight && (
                  <p className="text-danger">{errors.total_weight.message}</p>
                )}
                {err && <p className="text-danger">{err?.total_weight[0]}</p>}
              </div>
              <div className="col-md-6 p-3">
                <label
                  htmlFor="batch-number"
                  className="form-label fw-bold text-warning"
                >
                  Batch Number
                </label>
                <input
                  type="text"
                  {...register('ingoing_batch_number', {
                    required: 'Batch number is Required',
                  })}
                  className="form-control"
                  id="batch-number"
                  placeholder="Batch number"
                />
                {errors.ingoing_batch_number && (
                  <p className="text-danger">
                    {errors.ingoing_batch_number.message}
                  </p>
                )}
                {err && (
                  <p className="text-danger">{err?.ingoing_batch_number}</p>
                )}
              </div>

              <div className="col-md-6 p-3">
                <label
                  htmlFor="batch-before-date"
                  className="form-label fw-bold text-warning"
                >
                  Best Before Date
                </label>
                <input
                  type="date"
                  {...register('best_before_date', {
                    required: 'Best Before Date is Required',
                  })}
                  className="form-control"
                  id="batch-before-date"
                />
                {errors.best_before_date && (
                  <p className="text-danger">
                    {errors.best_before_date.message}
                  </p>
                )}
                {err && <p className="text-danger">{err?.best_before_date}</p>}
              </div>

              <div className="col-md-6 p-3">
                <label
                  htmlFor="stock-date"
                  className="form-label fw-bold text-warning"
                >
                  Stock Date
                </label>
                <input
                  type="date"
                  {...register('last_stock_date', {
                    required: 'Last Stock Date is Required',
                  })}
                  className="form-control"
                  defaultValue={new Date().toISOString().substr(0, 10)}
                  id="stock-date"
                />
                {errors.last_stock_date && (
                  <p className="text-danger">
                    {errors.last_stock_date.message}
                  </p>
                )}
                {err && <p className="text-danger">{err?.last_stock_date}</p>}
              </div>
              {productId && (
                <div className="col-md-12 p-3">
                  <button type="submit" className="btn btn-orange float-end">
                    Add to stock
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Create;
