import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import { isEmpty } from '../../../../components/utils';
import ErrorModal from '../../../../components/ErrorModal';

const buttons = [
  {
    name: 'create new batch',
    link: '/dashboard/outgoing-batch/create',
  },
  {
    name: 'Outgoing Batches',
    link: '/dashboard/outgoing-batch',
  },
  {
    name: 'search batch',
    link: '/dashboard/outgoing-batch',
  },
];

const Show = () => {
  const [batch, setBatch] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getBatch = async () => {
      try {
        const response = await axiosPrivate.get(
          `/outgoing-batch/${params.id}`,
          { signal: controller.signal },
        );
        if (isMounted) {
          setBatch(response.data.data[0]);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getBatch();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {isEmpty(batch) ? (
        <Loader />
      ) : (
        <div className="container">
          <div>
            <div className="card supplier-form">
              <div className="card-body">
                <h4 className="card-title text-purple  m-3">
                  Batch Information
                </h4>
                <table className="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <th scope="col" className="text-orange">
                        Code
                      </th>
                      <td>{batch?.outgoing_batch_code}</td>
                      <th scope="col" className="text-orange">
                        Total Quantity
                      </th>
                      <td>
                        {batch?.total_quantity + batch?.shipment_quantity}
                      </td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-orange">
                        Batch Template
                      </th>
                      <td>{batch?.batch_template?.name}</td>
                      <th scope="col" className="text-orange">
                        Shipped Quantity
                      </th>
                      <td>{batch?.shipment_quantity}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-orange">
                        Batch Weight (g)
                      </th>
                      <td>
                        {Number(
                          (
                            (batch?.total_quantity + batch?.shipment_quantity) *
                            batch?.batch_template?.total_weight
                          ).toFixed(2),
                        )}
                      </td>
                      <th scope="col" className="text-orange">
                        Remaining Quantity
                      </th>
                      <td>{batch?.total_quantity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {batch?.outgoing_stocks && (
            <div className="my-3">
              <div className="card p-3">
                <div className="card-body">
                  <h4 className="card-title text-purple  m-3">
                    Stock Information
                  </h4>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" className="text-orange">
                          Product Name
                        </th>
                        <th scope="col" className="text-orange">
                          Weight (g)
                        </th>
                        <th scope="col" className="text-orange">
                          Stock Number
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {batch?.outgoing_stocks?.map((outgoing_stock) => {
                        return (
                          <tr key={outgoing_stock?.id}>
                            <td>
                              {outgoing_stock?.stock?.related_product?.name}
                            </td>
                            <td>
                              {Number(outgoing_stock?.weight?.toFixed(2))}
                            </td>
                            <td>
                              {outgoing_stock?.stock?.ingoing_batch_number}
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
