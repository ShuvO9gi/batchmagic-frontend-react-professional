import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import DataTables from '../../../../components/DataTables';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import show from '../../../../assets/Logo/file.png';
import edit from '../../../../assets/Logo/edit.png';

const buttons = [
  {
    name: 'Create new customer',
    link: '/dashboard/customer/create',
    class: 'btn-small',
  },
];

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Shipments',
    selector: (row) => row?.shipments?.length,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div>
        <Link to={`/dashboard/customer/show/${row.id}`}>
          <button className="btn btn-success">
            <img src={show} className="edit-image" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/customer/edit/${row.id}`}>
          <button className="btn btn-warning mx-3">
            <img src={edit} className="edit-image" alt="" />
          </button>
        </Link>
        {/* <button className="btn btn-danger"><img src={deletes} className="edit-image" alt="" /></button> */}
      </div>
    ),
  },
];

export default function Index() {
  const [customers, setCustomers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getCutomers = async () => {
      try {
        const response = await axiosPrivate.get('/customers', {
          signal: controller.signal,
        });
        if (isMounted) {
          setCustomers(response.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          return error;
        } else {
          return 'Download error: ' + error.message;
        }
      }
    };
    getCutomers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      <h3 className="text-center my-5 text-purple">Customers</h3>
      <DataTables columns={columns} data={customers.data} />
    </div>
  );
}
