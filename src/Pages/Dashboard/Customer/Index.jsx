import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShipmentList from './List/shipments-list';
import CustomersCreate from './Create/Create';
import CustomersShow from './Show/Show';
import CustomersEdit from './Edit/Edit';
import Sidebar from '../MixRecipes/Sidebar/Sidebar';
import '../MixRecipes/mix-recipes.css';

const Customers = () => {
  return (
    <div className="recipe-content">
      <div className="recipe-sidebar">
        <Sidebar />
      </div>
      <div className="recipe-component">
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
