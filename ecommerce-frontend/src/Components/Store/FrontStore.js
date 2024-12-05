import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Search from "../AdminInventory/Search";
import FilterCategory from "../AdminInventory/FilterCategory";
import FilterPriceRange from "../AdminInventory/FilterPriceRange";
import Sorting from "../AdminInventory/SortCategoryAndPrice";
import productService from "../../Services/productService";
import SideNavigationStore from "../Side Navigation/SideNavigationStore";

const FrontStore = () => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await productService.getProducts();
        setProducts(productData);
        setFilteredData(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    const filtered = products.filter((item) =>
      item.product_name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSelectCategory = (category) => {
    const filtered =
      category === "All"
        ? products
        : products.filter((item) => item.category === category);
    setFilteredData(filtered);
  };

  const handleResetCategory = () => {
    setFilteredData(products);
  };

  const handleSelectPriceRange = (min, max) => {
    const filtered = products.filter((item) => {
      const price = parseFloat(item.price);
      return price >= min && price <= max;
    });
    setFilteredData(filtered);
  };

  const handleResetPriceRange = () => {
    setFilteredData(products);
  };

  const handleSortAZ = () => {
    const sorted = [...filteredData].sort((a, b) =>
      a.product_name.localeCompare(b.product_name)
    );
    setFilteredData(sorted);
  };

  const handleSortZA = () => {
    const sorted = [...filteredData].sort((a, b) =>
      b.product_name.localeCompare(a.product_name)
    );
    setFilteredData(sorted);
  };

  const handleSortLowToHigh = () => {
    const sorted = [...filteredData].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    setFilteredData(sorted);
  };

  const handleSortHighToLow = () => {
    const sorted = [...filteredData].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    setFilteredData(sorted);
  };

  const handleSortReset = () => {
    setFilteredData(products);
  };

  return (
    <div className="d-flex">
      <SideNavigationStore />
      <div style={{ flex: 1, marginLeft: "60px", padding: "10px" }}>
        <div className="d-flex justify-content-center align-items-center my-3">
          <Search onSearch={handleSearch} className="mx-3" />
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="me-3 d-flex align-items-center">
            <span className="me-2">Filter by:</span>
            <FilterPriceRange
              onSelectPriceRange={handleSelectPriceRange}
              onResetPriceRange={handleResetPriceRange}
            />
          </div>

          <FilterCategory
            inventoryData={products}
            onSelectCategory={handleSelectCategory}
            onResetCategory={handleResetCategory}
            className="mx-3"
          />

          <div className="me-3 ms-3 d-flex align-items-center">
            <span className="me-2">Sort by:</span>
            <Sorting
              onSortReset={handleSortReset}
              onSortAZ={handleSortAZ}
              onSortZA={handleSortZA}
              onSortLowToHigh={handleSortLowToHigh}
              onSortHighToLow={handleSortHighToLow}
            />
          </div>
        </div>

        <ProductList filteredData={filteredData} />
      </div>
    </div>
  );
};

export default FrontStore;
