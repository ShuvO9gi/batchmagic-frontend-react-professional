/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './DataTablesNew.css';
import PropTypes from 'prop-types';
import { isEmpty } from './utils.jsx';
import Loader from './Loader.jsx';
import SearchBar from './SearchBarNew.jsx';
import { Link } from 'react-router-dom';
// import SearchList from './SearchList.jsx';
// import close from './../assets/Logo/actions/cross.svg';

const tableCustomStyles = {
  table: {
    style: {
      minHeight: 'maxContent',
    },
  },
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      justifyContent: 'left',
      color: '#FFAD05',
      paddingLeft: '36px',
    },
  },
  cells: {
    style: {
      fontSize: '16px',
      wordBreak: 'break-word',
      justifyContent: 'left',
      paddingLeft: '36px',
    },
    draggingStyle: {},
  },
};

const DataTables = ({
  columns,
  data,
  header,
  navigation,
  searchPlaceholder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
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
    if (!query) {
      setFilteredRows([]);
    } else {
      /* document.getElementById('toogle-add-btn').style.visibility = 'hidden';
      document.getElementById('toogle-page-close').style.visibility = 'visible'; */

      const filteredData = rows.filter((row) => {
        const propertiesToSearch = [
          'name',
          'outgoing_batch_code',
          'ingoing_batch_number',
        ];
        for (const property of propertiesToSearch) {
          if (
            row[property] &&
            row[property].toLowerCase().includes(query.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      setFilteredRows(filteredData);
    }
  };

  /* const handleClose = () => {
    // setFilteredRows(data);
    // setSearchQuery('');
    // document.getElementById('toogle-add-btn').style.visibility = 'visible';
    // document.getElementById('toogle-page-close').style.visibility = 'hidden';
    window.location.reload(); //Not Recommended
  }; */

  return (
    <div>
      {/* <Link
        // to={navigation}
        onClick={handleClose}
        id="toogle-page-close"
        style={{ visibility: 'hidden' }}
        className="d-flex flex-column"
      >
        <img
          className="align-self-end page-close edit-page-close-position"
          src={close}
          alt=""
        />
      </Link> */}

      <div className="container list-container">
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
                <div className="list-subheader">
                  <div className="search">
                    <SearchBar
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      handleSearch={handleSearch}
                      placeholder={searchPlaceholder}
                    />
                  </div>
                  <div id="toogle-add-btn" className="">
                    <Link to={navigation}>
                      <button type="button" className="btn list-add-btn">
                        Add {header}
                      </button>
                    </Link>
                  </div>
                </div>
              )
            }
            subHeaderAlign="center"
            customStyles={tableCustomStyles}
            // subHeaderWrap
          />
        }
      </div>
    </div>
  );
};

DataTables.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  header: PropTypes.string,
  navigation: PropTypes.string,
  searchPlaceholder: PropTypes.string.isRequired,
};

export default DataTables;
