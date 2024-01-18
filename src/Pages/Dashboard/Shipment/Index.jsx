import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShipmentsList from './Index/ShipmentsList';
import ShipmentsCreate from './Create/Create';
import ShipmentsShow from './Show/Show';
import ShipmentsEdit from './Edit/Edit';
import './IndexShipment.css';

const Shipments = () => {
  return (
    <div className="page-component">
      <Routes>
        <Route path="/" element={<ShipmentsList />} />
        <Route path="/create" element={<ShipmentsCreate />} />
        <Route path="/show/:id" element={<ShipmentsShow />} />
        <Route path="/edit/:id" element={<ShipmentsEdit />} />
      </Routes>
    </div>
  );
};

export default Shipments;
