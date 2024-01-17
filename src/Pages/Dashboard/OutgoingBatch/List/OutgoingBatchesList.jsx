import React, { useEffect, useMemo, useState } from 'react';
import './OutgoingBatchesList.css';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import DataTables from '../../../../components/DataTablesNew';
import show from '../../../../assets/Logo/actions/show.svg';
import edit from '../../../../assets/Logo/actions/edit.svg';
import ErrorModal from '../../../../components/ErrorModal';

const columns = [
  {
    name: 'Batch Number',
    selector: (row) => row.outgoing_batch_code,
    sortable: true,
  },
  {
    name: 'Shipped Quantity',
    selector: (row) => row.shipment_quantity,
    sortable: true,
  },
  {
    name: 'Remaining Quantity',
    selector: (row) => row.total_quantity,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className="action-container">
        <Link to={`/dashboard/outgoing-batch/show/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={show} className="show-action" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/outgoing-batch/edit/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={edit} className="edit-action" alt="" />
          </button>
        </Link>
      </div>
    ),
  },
];

const OutgoingBatchesList = () => {
  const [batches, setBatches] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getBatches = async () => {
      try {
        const response = await axiosPrivate.get('/outgoing-batches', {
          signal: controller.signal,
        });
        if (isMounted) {
          setBatches(response.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getBatches();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const memoizedData = useMemo(() => batches.data, [batches]);

  return (
    <div>
      <h1 className="text-center my-64 list-header">Outgoing Batches</h1>
      <DataTables
        columns={columns}
        data={memoizedData}
        header={'A Batch'}
        navigation={'/dashboard/outgoing-batch/create'}
      />
    </div>
  );
};

export default OutgoingBatchesList;
