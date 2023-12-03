import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import DateFormat from '../../../../components/DateFormat';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import ErrorModal from '../../../../components/ErrorModal';

const buttons = [
  {
    name: 'Products',
    link: '/dashboard/product',
    class: 'btn-small',
  },
  {
    name: 'Search product',
    link: '/dashboard/product/search',
    class: 'btn-small',
  },
  {
    name: 'Product Stocks',
    link: '/dashboard/stocks',
    class: 'btn-small',
  },
];

const Show = () => {
  const [product, setProduct] = useState();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProduct = async () => {
      try {
        const response = await axiosPrivate.get(`/product/${params.id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setProduct(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getProduct();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {!product ? (
        <div className="container text-center">
          <Loader />
        </div>
      ) : (
        <div className="container">
          <div>
            <div className="card supplier-form">
              <div className="card-body">
                <h4 className="card-title text-purple  m-3">
                  Product Information
                </h4>
                <table className="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <th scope="col" className="text-warning">
                        Name
                      </th>
                      <td>{product?.name}</td>
                      <th scope="col" className="text-warning">
                        Product Code
                      </th>
                      <td>{product?.product_code}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        External ID Ref
                      </th>
                      <td>{product?.external_ref}</td>
                      <th scope="col" className="text-warning">
                        Created At
                      </th>
                      <td>
                        <DateFormat dateValue={product?.created_at} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {product?.supplier && (
            <div className="my-3">
              <div className="card p-3">
                <div className="card-body">
                  <h4 className="card-title text-purple  m-3">
                    Supplier Information
                  </h4>
                  <table className="table table-striped table-bordered">
                    <tbody>
                      <tr>
                        <th scope="col" className="text-warning">
                          Name
                        </th>
                        <td>{product?.supplier?.name}</td>
                        <th scope="col" className="text-warning">
                          Address
                        </th>
                        <td>{product?.supplier?.address}</td>
                      </tr>
                      <tr>
                        <th scope="col" className="text-warning">
                          City
                        </th>
                        <td>{product?.supplier?.city}</td>
                        <th scope="col" className="text-warning">
                          Zip
                        </th>
                        <td>{product?.supplier?.zip}</td>
                      </tr>
                      <tr>
                        <th scope="col" className="text-warning">
                          Contact Person Name
                        </th>
                        <td>{product?.supplier?.contact_person_name}</td>
                        <th scope="col" className="text-warning">
                          Contact Person Phone
                        </th>
                        <td>{product?.supplier?.contact_person_phone}</td>
                      </tr>
                      <tr>
                        <th scope="col" className="text-warning">
                          Contact Person Email
                        </th>
                        <td>{product?.supplier?.contact_person_email}</td>
                        <th scope="col" className="text-warning">
                          Legal Identity Number
                        </th>
                        <td>{product?.supplier?.legal_identity_number}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {product?.stocks?.length > 0 && (
            <div className="mb-3">
              <div className="card supplier-form ">
                <div className="card-body">
                  <h4
                    className="card-title
                                        text-purple  m-3"
                  >
                    Stock Information
                  </h4>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" className="text-warning">
                          Ingoing Batch Number
                        </th>
                        <th scope="col" className="text-warning">
                          Total Weight (g)
                        </th>
                        <th scope="col" className="text-warning">
                          Total Sold Weight (g)
                        </th>
                        <th scope="col" className="text-warning">
                          Remaining Weight (g)
                        </th>
                        <th scope="col" className="text-warning">
                          Last Stock Date
                        </th>
                        <th scope="col" className="text-warning">
                          Best Before Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product?.stocks?.map((stock) => {
                        return (
                          <tr key={stock?.id}>
                            <td>{stock?.ingoing_batch_number}</td>
                            <td>{stock?.total_weight}</td>
                            <td>
                              {stock?.total_sold_weight == null
                                ? 0
                                : stock?.total_sold_weight}
                            </td>
                            <td>
                              {stock?.total_weight - stock?.total_sold_weight}
                            </td>
                            <td>
                              <DateFormat dateValue={stock?.last_stock_date} />
                            </td>
                            <td>
                              <DateFormat dateValue={stock?.best_before_date} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Show;
