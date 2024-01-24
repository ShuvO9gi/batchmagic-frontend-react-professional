// Modal.js

import PropTypes from 'prop-types';
import ErrorModal from '../../../../../components/ErrorModal';
import { React, useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';

const StockModal = ({ isOpen, onClose, rowId, children }) => {
  const [product, setProduct] = useState({});
  console.log(product);

  const axiosPrivate = useAxiosPrivate();
  if (!isOpen) {
    return null;
  }
  console.log(rowId);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getStock = async () => {
      try {
        const response = await axiosPrivate.get(`/product/${rowId}`, {
          signal: controller.signal,
        });

        if (isMounted) {
          setProduct(response.data.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getStock();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

StockModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  rowId: PropTypes.number,
};

export default StockModal;
