import React from 'react';
import SideNavigationStore from '../Side Navigation/SideNavigationStore';
import ProductList from './ProductList';

const FrontStore = () => {

  return (
    <div className="d-flex">
      <SideNavigationStore />
      <div style={{ flex: 1, marginLeft: '60px', padding: '10px', }}>
        <ProductList />
      </div>
    </div>
  );
};

export default FrontStore