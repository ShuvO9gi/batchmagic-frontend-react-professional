/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './DataTable.css';
import PropTypes from 'prop-types';
import { isEmpty } from '../../../../components/utils.jsx';
import Loader from '../../../../components/Loader.jsx';
import SearchBar from '../Components/SearchBar.jsx';

const tableCustomStyles = {
  table: {
    style: {
      minHeight: '400px',
    },
  },
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      justifyContent: 'left',
      color: '#FFAD05',
    },
  },
  cells: {
    style: {
      wordBreak: 'break-word',
      justifyContent: 'left',
    },
    draggingStyle: {},
  },
};

const DataTables = ({ columns, data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState();

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    if (rows) {
      setPending(false);
    }
  }, [rows]);

  const handleSearch = (query) => {
    console.log(query);
    if (!query && !searchExpanded) {
      setSearchExpanded(false);
      setFilteredRows([]);
    } else {
      const filteredData = rows.filter((row) => {
        const property = ['name'];
        if (
          row[property] &&
          row[property].toLowerCase().includes(query.toLowerCase())
        ) {
          return true;
        }

        return false;
      });
      setFilteredRows(filteredData);
    }
  };

  return (
    <div>
      <div className="container datatable-custom mr-20">
        {
          <DataTable
            columns={columns}
            data={filteredRows.length > 0 ? filteredRows : rows}
            direction="ltr"
            fixedHeaderScrollHeight="400px"
            noDataComponent="No Data Found"
            highlightOnHover
            pagination
            progressPending={pending}
            progressComponent={<Loader />}
            responsive
            striped
            subHeader
            subHeaderComponent={
              !isEmpty(rows) && (
                <SearchBar
                  searchExpanded={searchExpanded}
                  setSearchExpanded={setSearchExpanded}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                />
              )
            }
            subHeaderAlign="right"
            customStyles={tableCustomStyles}
            subHeaderWrap
          />
        }
      </div>
    </div>
  );
};

DataTables.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
};

export default DataTables;
