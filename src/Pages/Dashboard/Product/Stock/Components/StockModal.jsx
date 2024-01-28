// StockModal.js

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import edit from '../../../../../assets/Logo/actions/edit.svg';
import show from '../../../../../assets/Logo/actions/show.svg';
import DataTables from './DataTables';

const StockModal = ({ isOpen = true, onClose, product, children }) => {
  // Render nothing if the modal is not open
  if (!isOpen) {
    return null;
  }

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
        </div>
      ),
    },
  ];

  console.log({ product });
  return (
    <div className="modal-overlay">
      <div className="stock-modal">
        <div className="stock-modal-header">
          <h2>Stock Details</h2>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="stock-modal-content">
          {children}

          <DataTables columns={columns} data={product.stocks} />
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
};

export default StockModal;
