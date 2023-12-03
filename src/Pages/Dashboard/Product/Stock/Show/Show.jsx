import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardNavigation from '../../../../../components/DashboardNavigation';
import DateFormat from '../../../../../components/DateFormat';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import Loader from '../../../../../components/Loader';
import { isEmpty } from '../../../../../components/utils';
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
    name: 'Create New Stock',
    link: '/dashboard/stock/create',
    class: 'btn-small',
  },
];

const Show = () => {
  const [stock, setStock] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getStock = async () => {
      try {
        const response = await axiosPrivate.get(`/stock/${params.id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setStock(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getStock();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {isEmpty(stock) ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="card supplier-form">
            <div className="card-body">
              <h4 className="card-title text-purple m-3">Stock Information</h4>
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <th scope="col" className="text-warning">
                      Ingoing Batch Number
                    </th>
                    <td>{stock?.ingoing_batch_number}</td>
                    <th scope="col" className="text-warning">
                      Product
                    </th>
                    <td>{stock?.related_product?.name}</td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-warning">
                      Best Before Date
                    </th>
                    <td>
                      <DateFormat dateValue={stock?.best_before_date} />
                    </td>
                    <th scope="col" className="text-warning">
                      Last stock date
                    </th>
                    <td>
                      <DateFormat dateValue={stock?.last_stock_date} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-warning">
                      Total Weight (Kg)
                    </th>
                    <td>{Number(stock?.total_weight?.toFixed(2) / 1000)}</td>
                    <th scope="col" className="text-warning">
                      Total Sold Weight (Kg)
                    </th>
                    <td>
                      {Number(
                        (stock?.total_sold_weight / 1000)?.toFixed(2) ?? 0,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-warning">
                      Remaining Weight (Kg)
                    </th>
                    <td>
                      {Number(
                        (
                          (stock?.total_weight - stock?.total_sold_weight) /
                          1000
                        ).toFixed(2),
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {stock?.related_product && (
            <div className="mt-3">
              <div className="card p-3">
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
                        <td>{stock?.related_product?.name}</td>
                        <th scope="col" className="text-warning">
                          Product Code
                        </th>
                        <td>{stock?.related_product?.product_code}</td>
                      </tr>
                      <tr>
                        <th scope="col" className="text-warning">
                          External Ref ID
                        </th>
                        <td>{stock?.related_product?.external_ref}</td>
                        <th scope="col" className="text-warning">
                          Created At
                        </th>
                        <td>
                          <DateFormat
                            dateValue={stock?.related_product?.created_at}
                          />
                        </td>
                      </tr>
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
