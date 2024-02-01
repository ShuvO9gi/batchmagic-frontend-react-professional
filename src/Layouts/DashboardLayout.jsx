import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';
import Sidebar from '../Pages/Dashboard/MixRecipes/Sidebar/Sidebar';
import '../../src/Pages/Dashboard/MixRecipes/Sidebar/Sidebar.css';

const DashboardLayout = () => {
  const { loading } = useAuth();
  return (
    <div>
      <Navbar></Navbar>
      <div className="recipe-content">
        <div className="recipe-sidebar">
          <Sidebar />
        </div>

        <div className="recipe-component">
          {loading && (
            <div className="d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
