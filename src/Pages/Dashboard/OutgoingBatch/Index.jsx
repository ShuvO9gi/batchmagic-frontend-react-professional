import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OutgoingBatchesList from './List/OutgoingBatchesList';
import OutgoingBatchesCreate from './Create/Create';
import OutgoingBatchesShow from './Show/Show';
import OutgoingBatchesSearch from './Search/Search';
import './IndexOutgoingBatch.css';

const OutgoingBatches = () => {
  return (
    <div className="page-component">
      <Routes>
        <Route path="/" element={<OutgoingBatchesList />} />
        <Route path="/create" element={<OutgoingBatchesCreate />} />
        <Route path="/show/:id" element={<OutgoingBatchesShow />} />
        <Route path="/edit/:id" element={<OutgoingBatchesSearch />} />
      </Routes>
    </div>
  );
};

export default OutgoingBatches;
