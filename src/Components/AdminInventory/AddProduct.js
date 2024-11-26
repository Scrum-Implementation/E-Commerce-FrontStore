import React from 'react';

const AddProduct = ({ onClick }) => {
  return (
    <div
      style={{
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
      }} >

      <i
        className="bi bi-plus-circle-fill"
        style={{
          cursor: 'pointer',
          fontSize: '24px',
          color: 'blue',
          marginLeft: '8px',
        }} 
      onClick={onClick} >
      </i>
      Add Product
    </div>
  );
};

export default AddProduct;
