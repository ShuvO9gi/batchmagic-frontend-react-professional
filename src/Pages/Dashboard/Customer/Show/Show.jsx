import { useEffect, useState } from 'react';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import { isEmpty } from '../../../../components/utils';
import ErrorModal from '../../../../components/ErrorModal';

const buttons = [
  {
    name: 'Customers',
    link: '/dashboard/customers',
  },
  {
    name: 'Create Customer',
    link: '/dashboard/customer/create',
  },
];
export default function Show() {
  const [customer, setCustomer] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getCustomer = async () => {
      try {
        const response = await axiosPrivate.get(`/customer/${params.id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setCustomer(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getCustomer();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {isEmpty(customer) ? (
        <Loader />
      ) : (
        <div className="container">
          <div>
            <div className="card supplier-form">
              <div className="card-body">
                <h4 className="card-title text-purple  m-3">
                  Customer Information
                </h4>
                <table className="table table-striped table-bordered">
                  <tbody>
                    <tr>
                      <th scope="col" className="text-warning">
                        Name
                      </th>
                      <td>{customer?.name}</td>
                      <th scope="col" className="text-warning">
                        Address
                      </th>
                      <td>{customer?.address}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        City
                      </th>
                      <td>{customer?.city}</td>
                      <th scope="col" className="text-warning">
                        Zip
                      </th>
                      <td>{customer?.zip}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        Contact Person Name
                      </th>
                      <td>{customer?.contact_person_name}</td>
                      <th scope="col" className="text-warning">
                        Contact Person Phone
                      </th>
                      <td>{customer?.contact_person_phone}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        Contact Person Email
                      </th>
                      <td>{customer?.contact_person_email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {customer?.shipments?.length > 0 && (
            <div className="my-5">
              <div className="card supplier-form ">
                <div className="card-body">
                  <h4
                    className="card-title
                                        text-purple  m-3"
                  >
                    Shipments Information
                  </h4>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" className="text-warning">
                          Name
                        </th>
                        <th scope="col" className="text-warning">
                          Outgoing Batch Number
                        </th>
                        <th scope="col" className="text-warning">
                          Quantity
                        </th>
                        <th scope="col" className="text-warning">
                          Shipment Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer?.shipments?.map((ship) => {
                        return (
                          <tr key={ship?.id}>
                            <td>{ship?.name}</td>
                            <td>{ship?.outgoing_batch?.outgoing_batch_code}</td>
                            <td>{ship?.quantity}</td>
                            <td>{ship?.shipment_date}</td>
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
}
