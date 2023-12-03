import { useEffect, useState } from 'react';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import { isEmpty } from '../../../../components/utils';
import ErrorModal from '../../../../components/ErrorModal';

const buttons = [
  {
    name: 'Shipments',
    link: '/dashboard/shipments',
    class: 'btn-small',
  },
];

export default function Show() {
  const [shipment, setShipment] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getShipment = async () => {
      try {
        const response = await axiosPrivate.get(`/shipment/${params.id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setShipment(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getShipment();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {isEmpty(shipment) ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="card supplier-form ">
            <div className="card-body">
              <h4
                className="card-title
                                        text-purple  m-3"
              >
                Shipments Information
              </h4>
              <table className="table table-striped table-bordered">
                <tbody>
                  <tr>
                    <th scope="col" className="text-warning">
                      Name
                    </th>
                    <td>{shipment?.name}</td>
                    <th scope="col" className="text-warning">
                      Outgoing Batch Number
                    </th>
                    <td>{shipment?.outgoing_batch?.outgoing_batch_code}</td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-warning">
                      Quantity
                    </th>
                    <td>{shipment?.quantity}</td>
                    <th scope="col" className="text-warning">
                      Shipment Date
                    </th>
                    <td>{shipment?.shipment_date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-5">
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
                      <td>{shipment?.customer?.name}</td>
                      <th scope="col" className="text-warning">
                        Address
                      </th>
                      <td>{shipment?.customer?.address}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        City
                      </th>
                      <td>{shipment?.customer?.city}</td>
                      <th scope="col" className="text-warning">
                        Zip
                      </th>
                      <td>{shipment?.customer?.zip}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        Contact Person Name
                      </th>
                      <td>{shipment?.customer?.contact_person_name}</td>
                      <th scope="col" className="text-warning">
                        Contact Person Phone
                      </th>
                      <td>{shipment?.customer?.contact_person_phone}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        Contact Person Email
                      </th>
                      <td>{shipment?.customer?.contact_person_email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
