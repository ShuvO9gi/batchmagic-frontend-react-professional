import React from 'react';
import './list.css';
import { Link } from 'react-router-dom';
import show from '../../../../assets/Logo/actions/show.svg';
import edit from '../../../../assets/Logo/actions/edit.svg';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate.jsx';
//import ErrorModal from '../../../../components/ErrorModal.jsx';
import DataTables from '../Components/DataTables.jsx';

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
      <div className="action-container">
        <Link to={`/dashboard/customers/show/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={show} className="show-action" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/customers/edit/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={edit} className="edit-action" alt="" />
          </button>
        </Link>
        {/* <button className="btn btn-danger"><img src={deletes} className="edit-image" alt="" /></button> */}
      </div>
    ),
  },
];

const ShipmentList = () => {
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
      <h1 className="text-center my-64 list-header">Customer</h1>
      <DataTables columns={columns} data={customers.data} />
    </div>
  );
};

export default ShipmentList;
