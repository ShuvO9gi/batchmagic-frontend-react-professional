import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from '../../../../../components/DashboardNavigation';
import DataTables from '../../../../../components/DataTables';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import edit from '../../../../../assets/Logo/edit.png';
import show from '../../../../../assets/Logo/file.png';
import ErrorModal from '../../../../../components/ErrorModal';
const buttons = [
  {
    name: 'Create new Batch template',
    link: '/dashboard/batch-template/create',
  },
  {
    name: 'Outgoing Batches',
    link: '/dashboard/outgoing-batch',
  },
  {
    name: 'search batch',
    link: '/dashboard/outgoing-batch/search',
  },
];
const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Weight (g)',
    selector: (row) => row.total_weight,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div>
        <Link to={`/dashboard/batch-template/show/${row.id}`}>
          <button className="btn btn-success">
            <img src={show} className="edit-image" alt="" />
          </button>
        </Link>
        {!row.outgoing_batches && (
          <Link to={`/dashboard/batch-template/edit/${row.id}`}>
            <button className="btn btn-warning mx-3">
              <img src={edit} className="edit-image" alt="" />
            </button>
          </Link>
        )}
        {/* <button className="btn btn-danger"><img src={deletes} className="edit-image" alt="" /></button> */}
      </div>
    ),
  },
];

const Index = () => {
  const [batch_template, setBatch_template] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getBatchtemplates = async () => {
      try {
        const response = await axiosPrivate.get('/batch-templates', {
          signal: controller.signal,
        });
        if (isMounted) {
          setBatch_template(response?.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getBatchtemplates();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      <h3 className="text-center my-5 text-purple">Batch Templates</h3>
      <DataTables columns={columns} data={batch_template.data} />
    </div>
  );
};

export default Index;
