import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import show from '../../../../assets/Logo/file.png';
import ErrorModal from '../../../../components/ErrorModal';
import React from 'react';
import DataTables from '../Components/DataTables';

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Supplier',
    selector: (row) => row?.supplier?.name,
    sortable: true,
  },
  {
    name: 'Stock Weight (g)',
    selector: (row) => {
      let total = 0;
      let outgoing = 0;
      let remaining = 0;
      row?.stocks?.forEach((stock) => {
        total += stock.total_weight;
        outgoing += stock.total_sold_weight;
        remaining = total - outgoing;
      });
      return Number(remaining.toFixed(2));
    },
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div>
        <Link to={`/dashboard/product/show/${row.id}`}>
          <button className="btn btn-success">
            <img src={show} className="edit-image" alt="" />
          </button>
        </Link>
      </div>
    ),
  },
];
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get('/products', {
          signal: controller.signal,
        });
        if (isMounted) {
          setProducts(response.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getProducts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      {/* <DashboardNavigation buttons={buttons} /> */}
      <h3 className="text-center my-5 text-purple">Products</h3>
      <DataTables columns={columns} data={products.data} />
    </div>
  );
};

export default ProductList;
