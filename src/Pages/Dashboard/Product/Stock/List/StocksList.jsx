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
    name: 'Create New Stock',
    link: '/dashboard/stock/create',
    class: 'btn-small',
  },
  {
    name: 'Products',
    link: '/dashboard/product',
    class: 'btn-small',
  },
];

const columns = [
  {
    name: 'Batch Number',
    selector: (row) => row.ingoing_batch_number,
    sortable: true,
  },
  {
    name: 'Product',
    selector: (row) => row.product_name,
    sortable: true,
  },
  {
    name: 'Remaining Weight (Kg)',
    selector: (row) =>
      Number(((row.total_weight - row.total_sold_weight) / 1000).toFixed(2)),
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div>
        <Link to={`/dashboard/stock/show/${row.id}`}>
          <button className="btn btn-success">
            <img src={show} className="edit-image" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/stock/edit/${row.id}`}>
          <button className="btn btn-warning mx-3">
            <img src={edit} className="edit-image" alt="" />
          </button>
        </Link>
      </div>
    ),
  },
];

const Index = () => {
  const [stocks, setStocks] = useState([]);
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
        if (error instanceof DOMException && error.name === 'AbortError') {
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getStocks = async () => {
      try {
        const response = await axiosPrivate.get('/stocks', {
          signal: controller.signal,
        });
        if (isMounted) {
          setStocks(response.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getStocks();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (
      products.data?.length > 0 &&
      stocks.data?.length > 0 &&
      stocks.data.some((stock) => !stock.product_name)
    ) {
      const newStocksData = stocks.data.map((stock) => {
        if (stock.product_name) {
          return stock;
        }
        const product = products.data.find(
          (product) => product.id === stock.product_id,
        );
        return {
          ...stock,
          product_name: product?.name,
        };
      });
      setStocks({
        ...stocks,
        data: newStocksData,
      });
    }
  }, [products, stocks]);

  return (
    <div>
      <DashboardNavigation buttons={buttons} />
      <h3 className="text-center my-5 text-purple">Stocks</h3>
      <DataTables columns={columns} data={stocks.data} />
    </div>
  );
};

export default Index;
