import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

const DashboardLayout = () => {
  const { loading } = useAuth();
  return (
    <div>
      <Navbar></Navbar>
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
