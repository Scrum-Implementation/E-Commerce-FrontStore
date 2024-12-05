import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Delete from "./Buttons/DeleteIconButton";
import DeleteDialog from "./DialogDelete";
import EditDialog from "./DialogEdit";
import EditIconButton from "./Buttons/EditIconButton";
import productService from "../../Services/productService";

const InventoryTable = ({ inventory }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState(false);
  const [inventoryData, setInventoryData] = useState(inventory);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        setInventoryData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [inventoryData]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setShowDialog(false);
    setItemToDelete(null);
    setErrorAlert(false);
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await productService.deleteProduct(itemToDelete.id);
        setInventoryData((prevData) =>
          prevData.filter((item) => item.id !== itemToDelete.id)
        );
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting product:", error);
        setErrorAlert(true);
      }
    }
  };

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setItemToEdit(null);
  };

  const handleSaveEdit = async (updatedItem) => {
    const response = await productService.updateProduct(
      updatedItem.id,
      updatedItem
    );
    setInventoryData((prevData) =>
      prevData.map((item) => (item.id === response.id ? response : item))
    );
    handleCloseEditDialog();
  };

  return (
    <div
      className="table-responsive"
      style={{
        maxHeight: "530px",
        overflowY: "auto",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-3 text-dark">Loading products...</div>
          </div>
        </div>
      ) : (
        <>
          {errorAlert && (
            <div className="alert alert-danger text-center mt-2" role="alert">
              Error: Product not found. Refresh the Inventory Table!
            </div>
          )}
          {inventoryData.length === 0 && (
            <div className="alert alert-danger text-center mt-2" role="alert">
              No Products Available.
            </div>
          )}

          <table className="table mt-2" style={{ border: "2px solid #B6B6FF" }}>
            <thead>
              <tr>
                <th
                  className="text-center"
                  style={{
                    width: "80px",
                    backgroundColor: "#003366",
                    color: "white",
                  }}
                >
                  Item No.
                </th>
                <th
                  className="text-center"
                  style={{
                    backgroundColor: "#003366",
                    color: "white",
                    border: "1px solid #B6B6FF",
                  }}
                >
                  Product Name
                </th>
                <th
                  className="text-center"
                  style={{
                    backgroundColor: "#003366",
                    color: "white",
                    border: "1px solid #B6B6FF",
                  }}
                >
                  Price
                </th>
                <th
                  className="text-center"
                  style={{
                    backgroundColor: "#003366",
                    color: "white",
                    border: "1px solid #B6B6FF",
                  }}
                >
                  Category
                </th>
                <th
                  className="text-center"
                  style={{
                    backgroundColor: "#003366",
                    color: "white",
                    border: "1px solid #B6B6FF",
                  }}
                >
                  Description
                </th>
                <th
                  className="text-center"
                  style={{
                    backgroundColor: "#003366",
                    color: "white",
                    border: "1px solid #B6B6FF",
                  }}
                >
                  Quantity
                </th>
                <th
                  className="text-center"
                  style={{
                    backgroundColor: "#003366",
                    color: "white",
                    border: "1px solid #B6B6FF",
                  }}
                >
                  Barcode
                </th>
                <th
                  className="text-center"
                  style={{
                    backgroundColor: "#003366",
                    color: "white",
                    border: "1px solid #B6B6FF",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "table-primary" : ""}
                >
                  <td
                    className="text-center"
                    style={{ border: "1px solid #003366" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="text-start"
                    style={{ border: "1px solid #B6B6FF" }}
                  >
                    {item.product_name || "-"}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #B6B6FF" }}
                  >
                    ₱{item.price || "-"}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #B6B6FF" }}
                  >
                    {item.category || "-"}
                  </td>
                  <td
                    className="text-start"
                    style={{
                      border: "1px solid #B6B6FF",
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.description?.length > 200
                      ? `${item.description.substring(0, 200)}...`
                      : item.description || "-"}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #B6B6FF" }}
                  >
                    {item.quantity || "-"}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #B6B6FF" }}
                  >
                    {item.barcode || "-"}
                  </td>
                  <td
                    className="text-center"
                    style={{ border: "1px solid #B6B6FF" }}
                  >
                    <>
                      <Delete onClick={() => handleDeleteClick(item)} />
                      <span className="mx-1"></span>
                      <EditIconButton onClick={() => handleEditClick(item)} />
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showDialog && (
        <DeleteDialog
          item={itemToDelete}
          onClose={handleCloseDeleteDialog}
          onDelete={handleDelete}
        />
      )}
      {showEditDialog && (
        <EditDialog
          item={itemToEdit}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default InventoryTable;
