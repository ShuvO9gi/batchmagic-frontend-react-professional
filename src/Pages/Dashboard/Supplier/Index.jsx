import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SupplierList from './List/SuppliersList';
import SupplierCreate from './Create/Create';
import SupplierShow from './Show/Show';
import SupplierEdit from './Edit/Edit';
import './IndexSupplier.css';

const Supplier = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SupplierList />} />
        <Route path="/create" element={<SupplierCreate />} />
        <Route path="/show/:id" element={<SupplierShow />} />
        <Route path="/edit/:id" element={<SupplierEdit />} />
      </Routes>
    </div>
  );
};

export default Supplier;
