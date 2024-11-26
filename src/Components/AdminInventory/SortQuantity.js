import React from 'react';

const SortQuantity = ({ onSortReset, onSortLowToHigh, onSortHighToLow }) => {
  const styles = {
    button: {
      height: '26px',
      width: '80px',
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
    formCheck: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioLabel: {
      marginLeft: '5px',
    },
  };

  return (
    <div className="dropdown me-2">
      <button 
        className="btn dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton" 
        data-bs-toggle="dropdown" 
        aria-expanded="false" 
        style={styles.button}>
        Qty
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={styles.dropdownMenu}>
        <li>
          <button 
            className="dropdown-item" 
            style={styles.dropdownItem}
            onClick={onSortReset}>
            Reset
          </button>
        </li>
        <li>
          <div className="form-check" style={styles.formCheck}>
            <input 
              className="form-check-input" 
              type="radio" 
              name="sortStockOptions" 
              id="sortLowToHighStock" 
              onClick={onSortLowToHigh} 
            />
            <label className="form-check-label" htmlFor="sortLowToHighStock" style={{...styles.dropdownItem, ...styles.radioLabel}}>
              Qty Low to High
            </label>
          </div>
        </li>
        <li>
          <div className="form-check" style={styles.formCheck}>
            <input 
              className="form-check-input" 
              type="radio" 
              name="sortStockOptions" 
              id="sortHighToLowStock" 
              onClick={onSortHighToLow} 
            />
            <label className="form-check-label" htmlFor="sortHighToLowStock" style={{...styles.dropdownItem, ...styles.radioLabel}}>
              Qty High to Low
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SortQuantity;