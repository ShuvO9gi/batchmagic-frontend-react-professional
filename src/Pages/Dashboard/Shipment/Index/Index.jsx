import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import show from '../../../../assets/Logo/file.png';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import DataTables from '../../../../components/DataTables';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ErrorModal from '../../../../components/ErrorModal';

const buttons = [
  {
    name: 'Create new shipments',
    link: '/dashboard/shipment/create',
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
    name: 'Customer Name',
    selector: (row) => row?.customer?.name,
    sortable: true,
  },
  {
    name: 'Batch Number',
    selector: (row) => row?.outgoing_batch?.outgoing_batch_code,
    sortable: true,
  },
  {
    name: 'Quantity',
    selector: (row) => row?.quantity,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div>
        <Link to={`/dashboard/shipment/show/${row.id}`}>
          <button className="btn btn-success">
            <img src={show} className="edit-image" alt="" />
          </button>
        </Link>
        {/* <Link to={`/dashboard/customer/edit/${row.id}`}><button className="btn btn-warning mx-3"><img src={edit} className="edit-image" alt="" /></button></Link> */}
        {/* <button className="btn btn-danger"><img src={deletes} className="edit-image" alt="" /></button> */}
      </div>
    ),
  },
];

export default function Index() {
  const [shipments, setShipments] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getCutomers = async () => {
      try {
        const response = await axiosPrivate.get('/shipments', {
          signal: controller.signal,
        });
        if (isMounted) {
          setShipments(response.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
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
      <h3 className="text-center my-5 text-purple">Shipments</h3>
      <DataTables columns={columns} data={shipments.data} />
    </div>
  );
}
