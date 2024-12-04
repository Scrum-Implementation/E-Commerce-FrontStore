import React, { useEffect, useState } from "react";
import InventoryTable from "./InventoryTable";
import AddProduct from "./AddProduct";
import DialogProductForm from "./DialogProductForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import productService from "../../Services/productService";
import FilterCategory from "./FilterCategory";
import FilterPriceRange from "./FilterPriceRange";
import Search from "./Search";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sorting from "./SortCategoryAndPrice";
import SortStock from "./SortQuantity";

const Inventory = () => {
  const [showDialogProductForm, setShowDialogProductForm] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const products = await productService.getProducts();
    setInventoryData(products);
    setFilteredData(products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddProductClick = () => {
    setShowDialogProductForm(true);
  };

  const handleCloseDialogProductForm = () => {
    setShowDialogProductForm(false);
  };

  const handleAddProduct = async (newProduct) => {
    const addedProduct = await productService.addProduct(newProduct);
    setInventoryData((prevData) => [...prevData, addedProduct]);
    setFilteredData((prevData) => [...prevData, addedProduct]);
  };

  const handleSearch = (term) => {
    const filtered = inventoryData.filter((item) =>
      item.product_name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSelectCategory = (category) => {
    const filtered = inventoryData.filter((item) => item.category === category);
    setFilteredData(filtered);
  };

  const handleResetCategory = () => {
    setFilteredData(inventoryData);
  };

  const handleSelectPriceRange = (min, max) => {
    const filtered = inventoryData.filter((item) => {
      const price = parseFloat(item.price);
      return price >= min && price <= max;
    });
    setFilteredData(filtered);
  };

  const handleResetPriceRange = () => {
    setFilteredData(inventoryData);
  };

  const handleSortReset = () => {
    setFilteredData(inventoryData);
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

  const handleSortStockLowToHigh = () => {
    const sorted = [...filteredData].sort((a, b) => a.quantity - b.quantity);
    setFilteredData(sorted);
  };

  const handleSortStockHighToLow = () => {
    const sorted = [...filteredData].sort((a, b) => b.quantity - a.quantity);
    setFilteredData(sorted);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <AddProduct onClick={handleOpenAddProductClick} />
        <Search onSearch={handleSearch} className="mx-3" />
        <button
          className="btn btn-outline-secondary"
          style={{
            backgroundColor: "#FFD700",
            color: "#003366",
            borderColor: "#003366",
            padding: "2px 16px",
          }}
          onClick={fetchProducts}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
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
          inventoryData={inventoryData}
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

        <SortStock
          onSortLowToHigh={handleSortStockLowToHigh}
          onSortHighToLow={handleSortStockHighToLow}
          onSortReset={handleSortReset}
          className="ms-3"
        />
      </div>

      {loading ? (
        <div className="text-center mt-3">
          <i className="bi bi-arrow-clockwise"></i>
        </div>
      ) : (
        <InventoryTable
          inventoryData={filteredData}
          setInventoryData={setInventoryData}
        />
      )}

      <DialogProductForm
        show={showDialogProductForm}
        onClose={handleCloseDialogProductForm}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default Inventory;
