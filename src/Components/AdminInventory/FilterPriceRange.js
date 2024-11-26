import React, { useState } from 'react';

const FilterPriceRange = ({ onSelectPriceRange, onResetPriceRange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApplyRange = () => {
    if (minPrice && maxPrice) {
      onSelectPriceRange(parseFloat(minPrice), parseFloat(maxPrice));
    }
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    onResetPriceRange();
  };

  const styles = {
    button: {
      height: '26px',
      width: '150px',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      color: 'white',
    },
    dropdownMenu: {
      minWidth: '150px',
    },
    dropdownItem: {
      fontSize: '12px',
      textAlign: 'center',
    },
    input: {
      width: '60px',
      margin: '5px',
      textAlign: 'center',
      fontSize: '12px',
    },
  };

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={styles.button}
      >
        Price Range
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={styles.dropdownMenu}>
        <li>
          <button
            className="dropdown-item"
            style={styles.dropdownItem}
            onClick={handleReset}
          >
            No Filter
          </button>
        </li>
        <li>
          <div className="d-flex justify-content-center">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="₱ MIN"
              style={styles.input}
            />
            -
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="₱ MAX"
              style={styles.input}
            />
          </div>
          <button
            className="btn btn-primary btn-sm d-block mx-auto mt-2"
            onClick={handleApplyRange}
          >
            Apply
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterPriceRange;
