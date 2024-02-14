import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import show from '../../../../assets/Logo/actions/show.svg';
import edit from '../../../../assets/Logo/actions/edit.svg';
import duplicate from '../../../../assets/Logo/actions/duplicate.svg';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate.jsx';
import ErrorModal from '../../../../components/ErrorModal.jsx';
import DataTables from '../../../../components/DataTablesNew';

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Weight (g)',
    selector: (row) => row.total_weight,
    sortable: true,
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className="action-container">
        <Link to={`/dashboard/mix-recipes/show/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={show} className="show-action" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/mix-recipes/edit/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={edit} className="edit-action" alt="" />
          </button>
        </Link>
        <Link to={`/dashboard/mix-recipes/duplicate/${row.id}`}>
          <button className="btn btn-action-customized">
            <img src={duplicate} className="duplicate-action" alt="" />
          </button>
        </Link>
      </div>
    ),
  },
];

const MixRecipeList = () => {
  const [batch_template, setBatch_template] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getBatchtemplates = async () => {
      try {
        const response = await axiosPrivate.get('/batch-templates', {
          signal: controller.signal,
        });
        if (isMounted) {
          setBatch_template(response?.data);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          <ErrorModal />;
        } else {
          <ErrorModal />;
        }
      }
    };
    getBatchtemplates();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const memoizedData = useMemo(() => batch_template.data, [batch_template]);

  return (
    <div>
      <h1 className="text-center my-64 list-header">Mix Recipes</h1>
      <DataTables
        columns={columns}
        data={memoizedData}
        header={'A Recipe'}
        navigation={'/dashboard/mix-recipes/create'}
        searchPlaceholder="Search Batch Template"
      />
    </div>
  );
};

export default MixRecipeList;
