// StockModal.js

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import edit from '../../../../../assets/Logo/actions/edit.svg';
import show from '../../../../../assets/Logo/actions/show.svg';
import close from '../../../../../assets/Logo/actions/cross.svg';
import DataTables from './DataTables';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { useState } from 'react';
import ErrorModal from '../../../../../components/ErrorModal';

const StockModal = ({
  isOpen = true,
  onClose,
  product,
  setStockChanged,
  children,
}) => {
  // Render nothing if the modal is not open
  if (!isOpen) {
    return null;
  }

  const [stocks, setStocks] = useState(product.stocks);

  const axiosPrivate = useAxiosPrivate();

  const handleArchiveClick = async (stockId) => {
    const controller = new AbortController();
    try {
      const res = await axiosPrivate.put(
        `/stock-archive/${stockId}`,
        {
          is_archive: true,
        },
        {
          signal: controller.signal,
        },
      );

      if (res.status === 200) {
        setStocks(stocks.filter((stock) => stock.id !== stockId));
        controller.abort();
      }
    } catch (err) {
      <ErrorModal />;
    }
  };

  const columns = [
    {
      name: 'Batch No',
      selector: (row) => row.ingoing_batch_number,
      sortable: true,
    },
    {
      name: 'Sold Wieght (g)',
      selector: (row) => row?.total_sold_weight ?? 0,
      sortable: true,
    },
    {
      name: 'Total Weight (g)',
      selector: (row) => row?.total_weight,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="action-container">
          <Link to={`/dashboard/product/stock/show/${row.id}`}>
            <button className="btn btn-action-customized">
              <img src={show} className="show-action" alt="" />
            </button>
          </Link>
          <Link to={`/dashboard/product/stock/edit/${row.id}`}>
            <button className="btn btn-action-customized">
              <img src={edit} className="edit-action" alt="" />
            </button>
          </Link>
          <button
            className="btn btn-action-customized"
            onClick={() => handleArchiveClick(row.id)} // Call handleArchiveClick function
          >
            <img src={edit} className="archive-action" alt="" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="modal-overlay">
      <div className="stock-modal">
        <div className="d-flex flex-column stock-modal-header list-header">
          <h2>Stock Details</h2>
          <img
            onClick={() => {
              setStockChanged(true);

              onClose();
            }}
            className="align-self-end page-close"
            src={close}
            alt=""
          />
        </div>
        <div className="stock-modal-content">
          {children}

          <DataTables
            columns={columns}
            data={stocks.filter((stock) => !stock.is_archive)}
          />
        </div>
      </div>
    </div>
  );
};

StockModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  product: PropTypes.object,
  setStockChanged: PropTypes.func,
};

export default StockModal;
