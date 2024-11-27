import React from 'react';
import SideNavigationStore from '../Side Navigation/SideNavigationStore';
import ProductList from './ProductList';

const FrontStore = () => {

  return (
    <div className="d-flex">
      <SideNavigationStore />
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default FrontStore