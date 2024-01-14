import React from 'react';
import './Index.css';
import { Route, Routes } from 'react-router-dom';
import ShipmentList from './List/shipments-list';
import CustomersCreate from './Create/Create';
import CustomersShow from './Show/Show';
import CustomersEdit from './Edit/Edit';
import Sidebar from '../MixRecipes/Sidebar/Sidebar';

const Customers = () => {
  return (
    <div className="page-content">
      <div className="page-sidebar">
        <Sidebar />
      </div>
      <div className="page-component">
        <Routes>
          <Route path="/" element={<ShipmentList />} />
          <Route path="/create" element={<CustomersCreate />} />
          <Route path="/show/:id" element={<CustomersShow />} />
          <Route path="/edit/:id" element={<CustomersEdit />} />
        </Routes>
      </div>
    </div>
  );
};

export default Customers;
