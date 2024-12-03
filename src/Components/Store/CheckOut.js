import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../../Services/AuthService";

function Checkout() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

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

    fetchUserDetails();
  }, []);

  const handleAddressChange = () => setIsEditingAddress(true);
  const saveAddress = () => setIsEditingAddress(false);
  const handlePaymentChange = () => setIsEditingPayment(true);
  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
    setIsEditingPayment(false);
  };

  return (
    <div className="container py-4" style={{ color: "#003366" }}>
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
          <div className="flex-grow-1">Product</div>
          <div className="text-center" style={{ width: "120px" }}>
            Unit Price
          </div>
          <div className="text-center" style={{ width: "80px" }}>
            Quantity
          </div>
          <div className="text-center" style={{ width: "100px" }}>
            Subtotal
          </div>
        </div>
        <div className="d-flex justify-content-between py-2">
          <div className="flex-grow-1">
            <p className="m-0 font-weight-bold">Casing Tecno Pova 2 TPU</p>
          </div>
          <div className="text-center" style={{ width: "120px" }}>
            ₱129
          </div>
          <div className="text-center" style={{ width: "80px" }}>
            1
          </div>
          <div
            className="text-center font-weight-bold"
            style={{ width: "100px" }}
          >
            ₱129
          </div>
        </div>
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
          <div className="d-flex justify-content-between">
            <p className="text-muted">{paymentMethod}</p>
            <button
              onClick={handlePaymentChange}
              className="btn btn-link text-dark p-0"
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
          className="d-flex justify-content-between font-weight-bold"
          style={{ fontSize: "16px" }}
        >
          <span>Total Payment:</span>
          <span className="text-danger">₱156</span>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-warning text-dark px-4 py-2 font-weight-bold">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;