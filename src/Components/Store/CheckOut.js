import React, { useState } from 'react';

function Checkout() {
  const [address, setAddress] = useState({
    name: 'Tine',
    phone: '(+63) 9123456789',
    location: 'Cabuyao, Laguna',
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const handleAddressChange = () => setIsEditingAddress(true);
  const saveAddress = () => setIsEditingAddress(false);
  const handlePaymentChange = () => setIsEditingPayment(true);
  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
    setIsEditingPayment(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#003366' }}>
      {/* Delivery Address Section */}
      <div style={{ borderBottom: 'px solid #FFD700', marginBottom: '20px' }}>
        <h2 style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}>Delivery Address</h2>
        {isEditingAddress ? (
          <div>
            <input
              type="text"
              defaultValue={address.name}
              placeholder="Name"
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <input
              type="text"
              defaultValue={address.phone}
              placeholder="Phone"
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <input
              type="text"
              defaultValue={address.location}
              placeholder="Location"
              onChange={(e) => setAddress({ ...address, location: e.target.value })}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <button
              onClick={saveAddress}
              style={{
                backgroundColor: '#FFD700',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Save Address
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ flex: 1, fontSize: '14px' }}>
              <strong>{address.name}</strong> <span>{address.phone}</span>
              <br />
              <span>{address.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  backgroundColor: '#FFD700',
                  color: '#003366',
                  padding: '2px 8px',
                  fontSize: '12px',
                  borderRadius: '5px',
                }}
              >
                Default
              </span>
              <button
                onClick={handleAddressChange}
                style={{
                  background: 'none',
                  color: '#003366',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Ordered Section */}
      <div style={{ borderBottom: '3px solid #FFD700', marginBottom: '20px' }}>
        <h2 style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}>Products Ordered</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontWeight: 'bold', borderBottom: '2px solid #FFD700' }}>
          <div style={{ flex: 1, fontSize: '14px' }}></div>
          <div style={{ width: '120px', textAlign: 'center' }}>Unit Price</div>
          <div style={{ width: '80px', textAlign: 'center' }}>Quantity</div>
          <div style={{ width: '100px', textAlign: 'center' }}>Subtotal</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <div style={{ flex: 1, fontSize: '14px' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Casing Tecno Pova 2 TPU</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Variation: pink</p>
          </div>
          <div style={{ width: '120px', textAlign: 'center' }}>₱129</div>
          <div style={{ width: '80px', textAlign: 'center' }}>1</div>
          <div style={{ width: '100px', textAlign: 'center', fontWeight: 'bold' }}>₱129</div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div style={{ padding: '10px 20px', borderBottom: '2px solid #FFD700', backgroundColor: '#fff' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>Payment Method</h2>
        {isEditingPayment ? (
          <div>
            <select
              defaultValue={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Gcash">Gcash</option>
            </select>
            <button
              onClick={() => savePaymentMethod(paymentMethod)}
              style={{
                backgroundColor: '#FFD700',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Save Payment Method
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>{paymentMethod}</p>
            <button
              onClick={handlePaymentChange}
              style={{
                background: 'none',
                color: '#000000',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Payment Details */}
      <div style={{ padding: '20px', fontSize: '14px', backgroundColor: '#FFFCF5', borderBottom: '2px solid #FFD700' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Merchandise Subtotal:</span>
          <span>₱129</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Shipping:</span>
          <span>₱40</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Voucher Discount:</span>
          <span style={{ color: '#e63946' }}>-₱13</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
          <span>Total Payment:</span>
          <span style={{ color: '#e63946' }}>₱156</span>
        </div>
      </div>

      {/* Place Order Button */}
      <div style={{ textAlign: 'right', padding: '20px' }}>
        <button
          style={{
            backgroundColor: '#FFD700',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
