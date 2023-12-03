import { useEffect, useState } from 'react';
import DataTables from '../../../../components/DataTables';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import edit from '../../../../assets/Logo/edit.png';
import show from '../../../../assets/Logo/file.png';
// import deletes from '../../../../assets/Logo/delete.png';
import './Index.css';
import DashboardNavigation from '../../../../components/DashboardNavigation';
import { Link } from 'react-router-dom';
import ErrorModal from '../../../../components/ErrorModal';

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Products',
    selector: (row) => row?.product?.length,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div>
        <Link to={`/dashboard/supplier/show/${row.id}`}>
          <button className="btn btn-success">
            <img src={show} className="edit-image" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/supplier/edit/${row.id}`}>
          <button className="btn btn-warning mx-3">
            <img src={edit} className="edit-image" alt="" />
          </button>
        </Link>
        {/* <button className="btn btn-danger"><img src={deletes} className="edit-image" alt="" /></button> */}
      </div>
    ),
  },
];

const buttons = [
  {
    name: 'Create new supplier',
    link: '/dashboard/supplier/create',
  },
];

const Index = () => {
  const [suppliers, setSuppliers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSuppliers = async () => {
      try {
        // setLoading(true)
        const response = await axiosPrivate.get('/suppliers', {
          signal: controller.signal,
        });
        // setLoading(false)
        if (isMounted) {
          setSuppliers(response?.data);
        }
      } catch (error) {
        // setLoading(false)
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getSuppliers();
    return () => {
      // setLoading(false)
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      {/* {
                loading &&
                <div className='d-flex justify-content-center align-items-center'>
                    <Loader />
                </div>

            } */}
      <h3 className="text-center my-5 text-purple">Suppliers</h3>
      <DataTables columns={columns} data={suppliers.data} />
    </div>
  );
};

export default Index;
