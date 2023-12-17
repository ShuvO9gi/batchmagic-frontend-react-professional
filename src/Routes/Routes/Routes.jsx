import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import Main from '../../Layouts/Main';
import DashboardHome from '../../Pages/Dashboard/DashboardHome/DashboardHome';
import BatchTemplateCreate from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Create/Create';
import BatchTemplete from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Index/Index';
import OutgoingBatch from '../../Pages/Dashboard/OutgoingBatch/Index/Index';
import OutGoingBatchSearch from '../../Pages/Dashboard/OutgoingBatch/Search/Search';
import OutgoingBatchShow from '../../Pages/Dashboard/OutgoingBatch/Show/Show';
import OutgoingBatchCreate from '../../Pages/Dashboard/OutgoingBatch/Create/Create';
import ProductCreate from '../../Pages/Dashboard/Product/Create/Create';
import ProductIndex from '../../Pages/Dashboard/Product/Index/Index';
import ProductShow from '../../Pages/Dashboard/Product/Show/Show';
import SupplierCreate from '../../Pages/Dashboard/Supplier/Create/Create';
import SupplierEdit from '../../Pages/Dashboard/Supplier/Edit/Edit';
import SupplierIndex from '../../Pages/Dashboard/Supplier/Index/Index';
import SupplierShow from '../../Pages/Dashboard/Supplier/Show/Show';
import Home from '../../Pages/Home/Home/Home';
import NotFound from '../../Pages/NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import BatchTemplateShow from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Show/Show';
import BatchTemplateEdit from '../../Pages/Dashboard/OutgoingBatch/BatchTemplate/Edit/Edit';
import CustomerIndex from '../../Pages/Dashboard/Customer/Index/Index';
import CustomerCreate from '../../Pages/Dashboard/Customer/Create/Create';
import CustomerEdit from '../../Pages/Dashboard/Customer/Edit/Edit';
import CustomerShow from '../../Pages/Dashboard/Customer/Show/Show';
import ShipmentIndex from '../../Pages/Dashboard/Shipment/Index/Index';
import ShipmentCreate from '../../Pages/Dashboard/Shipment/Create/Create';
import ShipmentShow from '../../Pages/Dashboard/Shipment/Show/Show';
import StockIndex from '../../Pages/Dashboard/Product/Stock/Index/Index';
import StockCreate from '../../Pages/Dashboard/Product/Stock/Create/Create';
import StockShow from '../../Pages/Dashboard/Product/Stock/Show/Show';
import StockEdit from '../../Pages/Dashboard/Product/Stock/Edit/Edit';
import ProductSearch from '../../Pages/Dashboard/Product/Search/Search';
import ResetPassword from '../../Pages/Home/ResetPassword/ResetPassword';
import MixRecipes from '../../Pages/Dashboard/MixRecipes/index';
import MixRecipesShow from '../../Pages/Dashboard/MixRecipes/Show/Show';

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
      { path: '/dashboard/supplier', element: <SupplierIndex /> },
      { path: '/dashboard/supplier/create', element: <SupplierCreate /> },
      { path: '/dashboard/supplier/show/:id', element: <SupplierShow /> },
      { path: '/dashboard/supplier/edit/:id', element: <SupplierEdit /> },
      { path: '/dashboard/product', element: <ProductIndex /> },
      { path: '/dashboard/product/create', element: <ProductCreate /> },
      { path: '/dashboard/product/show/:id', element: <ProductShow /> },
      { path: '/dashboard/product/search', element: <ProductSearch /> },
      { path: '/dashboard/outgoing-batch', element: <OutgoingBatch /> },
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
      },
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
      { path: '/dashboard/customers', element: <CustomerIndex /> },
      { path: '/dashboard/customer/create', element: <CustomerCreate /> },
      { path: '/dashboard/customer/edit/:id', element: <CustomerEdit /> },
      { path: '/dashboard/customer/show/:id', element: <CustomerShow /> },

      { path: '/dashboard/shipments', element: <ShipmentIndex /> },
      { path: '/dashboard/shipment/create', element: <ShipmentCreate /> },
      { path: '/dashboard/shipment/show/:id', element: <ShipmentShow /> },

      { path: '/dashboard/stocks', element: <StockIndex /> },
      { path: '/dashboard/stock/create', element: <StockCreate /> },
      { path: '/dashboard/stock/show/:id', element: <StockShow /> },
      { path: '/dashboard/stock/edit/:id', element: <StockEdit /> },

      { path: '/dashboard/mix-recipes/*', element: <MixRecipes /> },
      { path: '/dashboard/mix-recipes/show/:id', element: <MixRecipesShow /> },
      // { path: '/dashboard/mix-recipes/create', element: <ShipmentCreate /> },
      // { path: '/dashboard/mix-recipes/show/:id', element: <ShipmentShow /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
