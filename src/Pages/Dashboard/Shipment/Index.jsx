import React from 'react';
// import './Index.css';
import { Route, Routes } from 'react-router-dom';
import ShipmentsIndex from './Index/Index';
import ShipmentsCreate from './Create/Create';
import ShipmentsShow from './Show/Show';
import ShipmentsEdit from './Edit/Edit';
import Sidebar from '../MixRecipes/Sidebar/Sidebar';

const Shipments = () => {
  return (
    <div className="page-content">
      <div className="page-sidebar">
        <Sidebar />
      </div>
      <div className="page-component">
        <Routes>
          <Route path="/" element={<ShipmentsIndex />} />
          <Route path="/create" element={<ShipmentsCreate />} />
          <Route path="/show/:id" element={<ShipmentsShow />} />
          <Route path="/edit/:id" element={<ShipmentsEdit />} />
        </Routes>
      </div>
    </div>
  );
};

export default Shipments;
