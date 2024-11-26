import React from 'react'

const FilterCategory = ({ inventoryData, onSelectCategory, onResetCategory }) => {
  const categories = [...new Set(inventoryData.map(item => item.category))];

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
      maxHeight: '170px',
      overflowY: 'auto',
    },
    dropdownItem: {
      fontSize: '12px',
      textAlign: 'center', 
    },
  };

  return (
    <div className="dropdown me-5">
      <button 
        className="btn dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton" 
        data-bs-toggle="dropdown" 
        aria-expanded="false" 
        style={styles.button}>
        Category
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={styles.dropdownMenu}>
        <li>
          <button 
            className="dropdown-item" 
            style={styles.dropdownItem}
            onClick={onResetCategory}>
            No Filter
          </button>
        </li>
        {categories.map((category, index) => (
          <li key={index}>
            <button 
              className="dropdown-item" 
              style={styles.dropdownItem}
              onClick={() => onSelectCategory(category)}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterCategory