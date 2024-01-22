import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Main from '../../Layouts/Main';
import DashboardHome from '../../Pages/Dashboard/DashboardHome/DashboardHome';
import OutgoingBatches from '../../Pages/Dashboard/OutgoingBatch/Index';
import Supplier from '../../Pages/Dashboard/Supplier/Index';
import Home from '../../Pages/Home/Home/Home';
import NotFound from '../../Pages/NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Customers from '../../Pages/Dashboard/Customer/Index';
import Shipments from '../../Pages/Dashboard/Shipment/Index';
import StockIndex from '../../Pages/Dashboard/Product/Stock/List/List';
import StockCreate from '../../Pages/Dashboard/Product/Stock/Create/Create';
import Products from '../../Pages/Dashboard/Product';
// import StockIndex from '../../Pages/Dashboard/Product/Stock/Index';
/* import StockCreate from '../../Pages/Dashboard/Product/Stock/Create/Create';
import StockShow from '../../Pages/Dashboard/Product/Stock/Show/Show';
import StockEdit from '../../Pages/Dashboard/Product/Stock/Edit/Edit'; */
import ResetPassword from '../../Pages/Home/ResetPassword/ResetPassword';
import MixRecipes from '../../Pages/Dashboard/MixRecipes/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/password-reset/:id', element: <ResetPassword /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        {' '}
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: '/dashboard', element: <DashboardHome /> },
      { path: '/dashboard/supplier/*', element: <Supplier /> },
      { path: '/dashboard/product/*', element: <Products /> },
      // { path: '/dashboard/stocks/*', element: <StockIndex /> },
      /* { path: '/dashboard/stock/create', element: <StockCreate /> },
      { path: '/dashboard/stock/show/:id', element: <StockShow /> },
      { path: '/dashboard/stock/edit/:id', element: <StockEdit /> }, */
      { path: '/dashboard/outgoing-batch/*', element: <OutgoingBatches /> },
      { path: '/dashboard/customers/*', element: <Customers /> },
      { path: '/dashboard/shipments/*', element: <Shipments /> },
      { path: '/dashboard/stock', element: <StockIndex /> },
      { path: '/dashboard/stock/create', element: <StockCreate /> },
      { path: '/dashboard/stock/show/:id', element: <StockShow /> },
      { path: '/dashboard/stock/edit/:id', element: <StockEdit /> },
      { path: '/dashboard/mix-recipes/*', element: <MixRecipes /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
