import React from 'react';
import './list.css';
import { Link } from 'react-router-dom';
import show from '../../../../assets/Logo/actions/show.svg';
import edit from '../../../../assets/Logo/actions/edit.svg';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ErrorModal from '../../../../components/ErrorModal';
import DataTables from '../DataTable/DataTables.jsx';

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Weight (g)',
    selector: (row) => row?.supplier?.name,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className="action-container">
        <Link to={`/dashboard/mix-recipes/show/${row.id}`}>
          <img src={show} className="show-recipe" alt="" />
        </Link>
        <Link to={`/dashboard/mix-recipes/edit/${row.id}`}>
          <img src={edit} className="edit-recipe" alt="" />
        </Link>
      </div>
    ),
  },
];

const MixRecipeList = () => {
  const [products, setProducts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get('/products', {
          signal: controller.signal,
        });
        if (isMounted) {
          setProducts(response.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name == 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getProducts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <h3 className="text-center my-5 text-purple">Mix Recipes</h3>
      <DataTables columns={columns} data={products.data} />
    </div>
  );
};

export default MixRecipeList;
