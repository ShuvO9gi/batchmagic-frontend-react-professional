import React from 'react';
import '../Customer/Index.css';
import { Route, Routes } from 'react-router-dom';
import SupplierList from './Index/SuppliersList';
import SupplierCreate from './Create/Create';
import SupplierShow from './Show/Show';
import SupplierEdit from './Edit/Edit';

const Supplier = () => {
  return (
    <div className="page-component">
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
