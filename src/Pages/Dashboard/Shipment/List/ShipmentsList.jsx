import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTables from '../../../../components/DataTablesNew';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ErrorModal from '../../../../components/ErrorModal';
import show from '../../../../assets/Logo/actions/show.svg';
import edit from '../../../../assets/Logo/actions/edit.svg';

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
      <div className="action-container">
        <Link to={`/dashboard/orders/show/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={show} className="show-action" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/orders/edit/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={edit} className="edit-action" alt="" />
          </button>
        </Link>
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

  const memoizedData = useMemo(() => shipments.data, [shipments]);

  return (
    <div>
      <h1 className="text-center my-64 list-header">Shipments</h1>
      <DataTables
        columns={columns}
        data={memoizedData}
        header={'Shipments'}
        navigation={'/dashboard/shipments/create'}
        searchPlaceholder="Search Suppliers"
      />
    </div>
  );
}
