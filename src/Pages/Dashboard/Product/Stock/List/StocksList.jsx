// Index.js
import React, { useEffect, useState, useMemo } from 'react';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import DataTables from '../../../../../components/DataTablesNew';
import show from '../../../../../assets/Logo/actions/show.svg';
import StockModal from '../Components/StockModal';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [stockChanged, setStockChanged] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get('/products', {
          signal: controller.signal,
        });
        if (isMounted) {
          setProducts(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          console.log('Request Aborted');
        } else {
          console.log('Error', error);
        }
      }
    };

    fetchData();
    setStockChanged(false);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, stockChanged]);

  const filteredProducts = useMemo(() => products, [products]);

  // const filteredProducts = useMemo(() => {
  //   return memoizedProducts?.filter(
  //     (product) => product.stocks && product.stocks.length > 0,
  //   );
  // }, [memoizedProducts]);

  const showStockModal = (rowId) => {
    setSelectedRowId(rowId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowId(null);
  };

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
      name: 'Stock Weight (kg)',
      selector: (row) => {
        let total = 0;
        let outgoing = 0;
        let remaining = 0;
        row?.stocks?.forEach((stock) => {
          total += stock.total_weight;
          outgoing += stock.total_sold_weight;
          remaining = (total - outgoing) / 1000;
        });
        return Number(remaining.toFixed(3));
      },
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="action-container">
          <button
            className="btn btn-action-customized"
            onClick={() => showStockModal(row.id)}
          >
            <img src={show} className="show-action" alt="" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-center my-64 list-header">Product Stocks</h1>
      <DataTables
        columns={columns}
        data={filteredProducts}
        header={'Stocks'}
        navigation={'/dashboard/product/stock/create'}
        searchPlaceholder="Search Products"
      />

      {selectedRowId && (
        <StockModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={products.find((product) => product.id === selectedRowId)}
          setStockChanged={setStockChanged}
        >
          {/* Render your modal content here */}
        </StockModal>
      )}
    </div>
  );
};

export default Index;
