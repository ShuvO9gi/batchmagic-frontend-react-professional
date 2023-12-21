import incoming_products from '../../../../assets/Logo/sidebar/incoming_products.svg';
import incoming_products_selected from '../../../../assets/Logo/sidebar/incoming_products_selected.svg';
import batches from '../../../../assets/Logo/sidebar/batches.svg';
import batches_selected from '../../../../assets/Logo/sidebar/batches_selected.svg';
import suppliers from '../../../../assets/Logo/sidebar/suppliers.svg';
import suppliers_selected from '../../../../assets/Logo/sidebar/suppliers_selected.svg';
import customers from '../../../../assets/Logo/sidebar/customers.svg';
import customers_selected from '../../../../assets/Logo/sidebar/customers_selected.svg';
import outgoing_shipments from '../../../../assets/Logo/sidebar/outgoing_shipments.svg';
import outgoing_shipments_selected from '../../../../assets/Logo/sidebar/outgoing_shipments_selected.svg';
import mix_recipes from '../../../../assets/Logo/sidebar/mix_recipes.svg';
import mix_recipes_selected from '../../../../assets/Logo/sidebar/mix_recipes_selected.svg';

export const sidebarMenu = [
  {
    title: 'Incoming Products',
    icon: incoming_products,
    iconSelected: incoming_products_selected,
    link: '/dashboard/product',
  },
  {
    title: 'Batches',
    icon: batches,
    iconSelected: batches_selected,
    link: '/dashboard/outgoing-batch',
  },
  {
    title: 'Suppliers',
    icon: suppliers,
    iconSelected: suppliers_selected,
    link: '/dashboard/supplier',
  },
  {
    title: 'Customers',
    icon: customers,
    iconSelected: customers_selected,
    link: '/dashboard/customers',
  },
  {
    title: 'Outgoing Batches',
    icon: outgoing_shipments,
    iconSelected: outgoing_shipments_selected,
    link: '/dashboard/shipments',
  },
  {
    title: 'Mix Recipies',
    icon: mix_recipes,
    iconSelected: mix_recipes_selected,
    link: '/dashboard/mix-recipes/',
  },
];
