import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './IndexStock.css';
import StockList from './List/StocksList';
import StockCreate from './Create/Create';
import StockShow from './Show/Show';
import StockEdit from './Edit/Edit';
import NotFound from '../../../../Pages/NotFound/NotFound';

const Stocks = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StockList />} />
        <Route path="/create" element={<StockCreate />} />
        <Route path="/show/:id" element={<StockShow />} />
        <Route path="/edit/:id" element={<StockEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Stocks;
