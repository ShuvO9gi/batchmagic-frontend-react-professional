import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './product.css';
import ProductCreate from './Create/Create';
import ProductShow from './Show/Show';
import ProductSearch from './Search/Search';
import NotFound from '../../../Pages/NotFound/NotFound';
import ProductList from './List/List';

const Products = () => {
  return (
    <div className="product-component">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<ProductCreate />} />
        <Route path="/show/:id" element={<ProductShow />} />
        <Route path="/search" element={<ProductSearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Products;
