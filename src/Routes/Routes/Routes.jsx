import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Main from '../../Layouts/Main';
import DashboardHome from '../../Pages/Dashboard/DashboardHome/DashboardHome';
import BatchTemplateCreate from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Create/Create';
import BatchTemplete from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Index/Index';
/*  */
import OutgoingBatches from '../../Pages/Dashboard/OutgoingBatch/Index';
/* import OutGoingBatchSearch from '../../Pages/Dashboard/OutgoingBatch/Search/Search';
import OutgoingBatchShow from '../../Pages/Dashboard/OutgoingBatch/Show/Show';
import OutgoingBatchCreate from '../../Pages/Dashboard/OutgoingBatch/Create/Create'; */
import Supplier from '../../Pages/Dashboard/Supplier/Index';
/* import SupplierCreate from '../../Pages/Dashboard/Supplier/Create/Create';
import SupplierEdit from '../../Pages/Dashboard/Supplier/Edit/Edit';
import SupplierShow from '../../Pages/Dashboard/Supplier/Show/Show'; */
import Home from '../../Pages/Home/Home/Home';
import NotFound from '../../Pages/NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import BatchTemplateShow from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Show/Show';
import BatchTemplateEdit from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Edit/Edit';
/*  */
import Customers from '../../Pages/Dashboard/Customer/Index';
import Shipments from '../../Pages/Dashboard/Shipment/Index';
import StockIndex from '../../Pages/Dashboard/Product/Stock/Index/Index';
import StockCreate from '../../Pages/Dashboard/Product/Stock/Create/Create';
import StockShow from '../../Pages/Dashboard/Product/Stock/Show/Show';
import StockEdit from '../../Pages/Dashboard/Product/Stock/Edit/Edit';
import ResetPassword from '../../Pages/Home/ResetPassword/ResetPassword';
import MixRecipes from '../../Pages/Dashboard/MixRecipes/index';
import Products from '../../Pages/Dashboard/Product';

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
      { path: '/dashboard/outgoing-batch/*', element: <OutgoingBatches /> },
      /* { path: '/dashboard/outgoing-batch', element: <OutgoingBatch /> },
      {
        path: '/dashboard/outgoing-batch/search',
        element: <OutGoingBatchSearch />,
      },
      {
        path: '/dashboard/outgoing-batch/show/:id',
        element: <OutgoingBatchShow />,
      },
      {
        path: '/dashboard/outgoing-batch/create',
        element: <OutgoingBatchCreate />,
      }, */
      { path: '/dashboard/batch-template', element: <BatchTemplete /> },
      {
        path: '/dashboard/batch-template/create',
        element: <BatchTemplateCreate />,
      },
      {
        path: '/dashboard/batch-template/show/:id',
        element: <BatchTemplateShow />,
      },
      {
        path: '/dashboard/batch-template/edit/:id',
        element: <BatchTemplateEdit />,
      },
      { path: '/dashboard/customers/*', element: <Customers /> },
      /* { path: '/dashboard/customers', element: <CustomerIndex /> },
      { path: '/dashboard/customer/create', element: <CustomerCreate /> },
      { path: '/dashboard/customer/edit/:id', element: <CustomerEdit /> },
      { path: '/dashboard/customer/show/:id', element: <CustomerShow /> }, */

      { path: '/dashboard/shipments/*', element: <Shipments /> },
      /* { path: '/dashboard/shipments', element: <ShipmentIndex /> },
      { path: '/dashboard/shipment/create', element: <ShipmentCreate /> },
      { path: '/dashboard/shipment/show/:id', element: <ShipmentShow /> }, */

      { path: '/dashboard/stocks', element: <StockIndex /> },
      { path: '/dashboard/stock/create', element: <StockCreate /> },
      { path: '/dashboard/stock/show/:id', element: <StockShow /> },
      { path: '/dashboard/stock/edit/:id', element: <StockEdit /> },
      { path: '/dashboard/mix-recipes/*', element: <MixRecipes /> },
      // { path: '/dashboard/mix-recipes/create', element: <ShipmentCreate /> },
      // { path: '/dashboard/mix-recipes/show/:id', element: <ShipmentShow /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
