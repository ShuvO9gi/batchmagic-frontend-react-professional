import PropTypes from 'prop-types';
import './components.css';
import React from 'react';
import search from '../../../../assets/Logo/actions/search.svg';

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className="search-input-container">
      <input
        type="text"
        value={searchQuery}
        className="form-control input-search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search Customer"
      />
      <span className="search-icon">
        <img src={search} height={20} width={20} />
      </span>
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
