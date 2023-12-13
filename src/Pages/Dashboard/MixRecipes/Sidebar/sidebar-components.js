import incoming_products from '../../../../assets/Logo/sidebar/incoming_products.svg';
import batches from '../../../../assets/Logo/sidebar/batches.svg';
import suppliers from '../../../../assets/Logo/sidebar/suppliers.svg';
import customers from '../../../../assets/Logo/sidebar/customers.svg';
import outgoing_shipments from '../../../../assets/Logo/sidebar/outgoing_shipments.svg';
import mix_recipes from '../../../../assets/Logo/sidebar/mix_recipes.svg';

export const sidebarMenu = [
  {
    title: 'Incoming Products',
    icon: incoming_products,
    link: '/dashboard/product',
  },
  {
    title: 'Batches',
    icon: batches,
    link: '/dashboard/outgoing-batch',
  },
  {
    title: 'Suppliers',
    icon: suppliers,
    link: '/dashboard/supplier',
  },
  {
    title: 'Customers',
    icon: customers,
    link: '/dashboard/customers',
  },
  {
    title: 'Outgoing Shipments',
    icon: outgoing_shipments,
    link: '/dashboard/shipments',
  },
  {
    title: 'Mix Recipies',
    icon: mix_recipes,
    link: '/dashboard/mix-recipes',
  },
];
