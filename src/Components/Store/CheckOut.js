import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../../Services/AuthService";
import cartService from "../../Services/cartService";

function Checkout() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Added state for success message

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await AuthService.getUserDetails();
        setAddress((prevAddress) => ({
          ...prevAddress,
          name: userDetails.name || "",
          phone: userDetails.contact_number || "",
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const data = await cartService.getCarts();
        setCartItems(data.items);
        setGrandTotal(data.grand_total);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchUserDetails();
    fetchCartItems();
  }, []);

  const handleAddressChange = () => setIsEditingAddress(true);
  const saveAddress = () => setIsEditingAddress(false);
  const handlePaymentChange = () => setIsEditingPayment(true);
  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
    setIsEditingPayment(false);
  };

  const handlePlaceOrder = () => {
    setSuccessMessage("Order placed successfully!"); // Set success message
    setShowModal(false); // Hide modal
  };

  return (
    <div className="container py-4" style={{ color: "#003366" }}>
      {successMessage && ( // Conditionally render the success message
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}

      <div className="border-bottom mb-4">
        <h2 className="text-dark font-weight-bold">Delivery Information</h2>
        {isEditingAddress ? (
          <div>
            <input
              type="text"
              className="form-control mb-3"
              value={address.name}
              placeholder="Name"
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-3"
              value={address.phone}
              placeholder="Phone"
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-3"
              value={address.location}
              placeholder="Add your location (required)"
              onChange={(e) =>
                setAddress({ ...address, location: e.target.value })
              }
            />
            {address.location === "" && (
              <small className="text-danger">Location is required</small>
            )}
            <button
              onClick={saveAddress}
              className="btn btn-warning text-dark w-100"
            >
              Save Address
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <strong>{address.name}</strong> <span>{address.phone}</span>
              <br />
              <span>{address.location || "Add your location (required)"}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge badge-warning text-dark">Default</span>
              <button
                onClick={handleAddressChange}
                className="btn btn-link text-dark p-0"
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="border-bottom mb-4">
        <h2 className="text-dark font-weight-bold">Products Ordered</h2>
        <div className="d-flex justify-content-between py-2 font-weight-bold border-bottom border-warning">
          <div
            className="flex-grow-1 ms-5"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Product
          </div>
          <div
            className="text-center me-2"
            style={{ width: "120px", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Unit Price
          </div>
          <div
            className="text-center me-2"
            style={{ width: "80px", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Quantity
          </div>
          <div
            className="text-center  me-5"
            style={{ width: "100px", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Subtotal
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-2">No items in cart.</div>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.id}>
              <div className="d-flex justify-content-between py-2 me-5">
                <div className="flex-grow-1 ms-5">
                  <p className="m-0">{item.product_name}</p>
                </div>
                <div className="text-center me-2" style={{ width: "120px" }}>
                  ₱{item.total_price_per_product / item.quantity}
                </div>
                <div className="text-center me-2" style={{ width: "80px" }}>
                  x{item.quantity}
                </div>
                <div
                  className="text-center font-weight-bold me-2"
                  style={{ width: "100px" }}
                >
                  ₱{item.total_price_per_product}
                </div>
              </div>
              {index < cartItems.length - 1 && <hr className="my-2" />}
            </div>
          ))
        )}
      </div>

      <div className="border-bottom mb-4 pb-3">
        <h2 className="font-weight-bold text-dark">Payment Method</h2>
        {isEditingPayment ? (
          <div>
            <select
              className="form-control mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Gcash">Gcash</option>
            </select>
            <button
              onClick={() => savePaymentMethod(paymentMethod)}
              className="btn btn-warning text-dark w-100"
            >
              Save Payment Method
            </button>
          </div>
        ) : (
       <div className="d-flex justify-content-between align-items-center ms-5 me-5">
       <p style={{ fontSize: "1.2rem", marginBottom: "0" }}>{paymentMethod}</p>
       <button
    onClick={handlePaymentChange}
    className="btn btn-link text-dark p-0"
    style={{ fontSize: "1rem" }}
    >
      Change
     </button>
     </div>

        )}
      </div>

      <div
        className="bg-light p-3 mb-4"
        style={{ borderBottom: "2px solid #FFD700" }}
      >
        <div
          className="d-flex justify-content-between ms-5"
          style={{ fontSize: "1.2rem" }}
        >
          <span>Total Payment:</span>
          <span className="text-danger me-5" style={{ fontSize: "1.2rem" }}>
            ₱{grandTotal}
          </span>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-warning text-dark px-4 py-2 me-5"
          onClick={() => setShowModal(true)}
        >
          Place Order
        </button>
      </div>

      {showModal && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Your Order</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to place this order?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
