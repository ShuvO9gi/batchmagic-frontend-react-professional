import React from 'react';
import './Index.css';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './List/CustomerList';
import CustomersCreate from './Create/Create';
import CustomersShow from './Show/Show';
import CustomersEdit from './Edit/Edit';

const Customers = () => {
  return (
    <div className="page-component">
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/create" element={<CustomersCreate />} />
        <Route path="/show/:id" element={<CustomersShow />} />
        <Route path="/edit/:id" element={<CustomersEdit />} />
      </Routes>
    </div>
  );
};

export default Customers;
