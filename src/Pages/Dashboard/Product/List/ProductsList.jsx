import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import show from '../../../../assets/Logo/actions/show.svg';
import edit from '../../../../assets/Logo/actions/edit.svg';
import ErrorModal from '../../../../components/ErrorModal';
import DataTables from '../../../../components/DataTablesNew';

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
      <div className="action-container">
        <Link to={`/dashboard/product/show/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={show} className="show-action" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/product/edit/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={edit} className="edit-action" alt="" />
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

  const memoizedData = useMemo(() => products.data, [products]);

  return (
    <div>
      {/* <DashboardNavigation buttons={buttons} /> */}
      <h1 className="text-center my-64 list-header">Product</h1>
      <DataTables
        columns={columns}
        data={memoizedData}
        header={'Product'}
        navigation={'/dashboard/product/create'}
        searchPlaceholder="Search Product Stocks"
      />
    </div>
  );
};

export default ProductList;
