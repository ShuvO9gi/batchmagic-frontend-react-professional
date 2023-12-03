import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import DataTables from '../../../../components/DataTables';
import show from '../../../../assets/Logo/file.png';
import ErrorModal from '../../../../components/ErrorModal';

const buttons = [
  {
    name: 'create new batch',
    link: '/dashboard/outgoing-batch/create',
  },
  {
    name: 'Batch templates',
    link: '/dashboard/batch-template',
  },
  {
    name: 'search batch',
    link: '/dashboard/outgoing-batch/search',
  },
];

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
      <div>
        <Link to={`/dashboard/outgoing-batch/show/${row.id}`}>
          <button className="btn btn-success">
            <img src={show} className="edit-image" alt="" />
          </button>
        </Link>
      </div>
    ),
  },
];

const Index = () => {
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

  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      <h3 className="text-center my-5 text-purple">Outgoing Batches</h3>
      <DataTables columns={columns} data={batches.data} />
    </div>
  );
};

export default Index;
