import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const styles = {
    inputWrapper: {
      position: 'relative',
      width: '300px',
    },
    input: {
      width: '100%',
      height: '30px',
      fontSize: '14px',
      paddingLeft: '30px',
    },
    searchIcon: {
      position: 'absolute',
      left: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="d-flex me-3" onSubmit={handleSearch}>
      <div style={styles.inputWrapper}>
        <i className="bi bi-search" style={styles.searchIcon}></i>
        <input
          type="text"
          className="form-control"
          placeholder="Search for product and category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input} />
      </div>
    </form>
  );
};

export default Search;