import React, { useState } from 'react';
import SideNavigationStore from '../Side Navigation/SideNavigationStore';
import ProductList from './ProductList';
import Search from '../AdminInventory/Search';

const FrontStore = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="d-flex">
      <SideNavigationStore />

      <div style={{ flex: 1, marginLeft: '60px', padding: '10px', }}>
        <div className="d-flex justify-content-center my-3">
          <Search onSearch={handleSearch} />
        </div>

        <ProductList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default FrontStore