import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Loader from '../../../../components/Loader';
import { isEmpty } from '../../../../components/utils';
import ErrorModal from '../../../../components/ErrorModal';

const buttons = [
  {
    name: 'Suppliers',
    link: '/dashboard/supplier',
  },
];
const Show = () => {
  const [supplier, setSupplier] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getSupplier = async () => {
      try {
        const response = await axiosPrivate.get(`/supplier/${params.id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setSupplier(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getSupplier();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {isEmpty(supplier) ? (
        <Loader />
      ) : (
        <div className="container">
          <div>
            <div className="card supplier-form">
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
                      <td>{supplier?.name}</td>
                      <th scope="col" className="text-warning">
                        Address
                      </th>
                      <td>{supplier?.address}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        City
                      </th>
                      <td>{supplier?.city}</td>
                      <th scope="col" className="text-warning">
                        Zip
                      </th>
                      <td>{supplier?.zip}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        Contact Person Name
                      </th>
                      <td>{supplier?.contact_person_name}</td>
                      <th scope="col" className="text-warning">
                        Contact Person Phone
                      </th>
                      <td>{supplier?.contact_person_phone}</td>
                    </tr>
                    <tr>
                      <th scope="col" className="text-warning">
                        Contact Person Email
                      </th>
                      <td>{supplier?.contact_person_email}</td>
                      <th scope="col" className="text-warning">
                        Legal Identity Number
                      </th>
                      <td>{supplier?.legal_identity_number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {supplier?.product?.length > 0 && (
            <div className="my-5">
              <div className="card supplier-form ">
                <div className="card-body">
                  <h4
                    className="card-title
                                        text-purple  m-3"
                  >
                    Product Information
                  </h4>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" className="text-warning">
                          Name
                        </th>
                        <th scope="col" className="text-warning">
                          External ID Ref
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplier?.product?.map((prod) => {
                        return (
                          <tr key={prod?.id}>
                            <td>{prod?.name}</td>
                            <td>{prod?.external_ref}</td>
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
