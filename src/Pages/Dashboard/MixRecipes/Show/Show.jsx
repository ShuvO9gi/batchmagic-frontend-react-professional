import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../Shared/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const Show = () => {
  const params = useParams();

  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default Show;
