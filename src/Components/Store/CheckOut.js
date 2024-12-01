import React from 'react';

function Checkout() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#003366' }}>
      {/* Delivery Address Section */}
<div style={{ borderBottom: '3px solid #FFD700', marginBottom: '20px' }}>
  <h2 style={{ color: '#000000', fontSize: '18px', fontWeight: 'bold' }}>Delivery Address</h2>
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    {/* Address Details */}
    <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.5' }}>
      <strong>Tine</strong> <span style={{ fontWeight: 'normal' }}>(+63) 9123456789</span>
      <br />
      <span>Cabuyao, Laguna</span>
    </div>
    {/* Default Badge and Change Button */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span
        style={{
          backgroundColor: '#FFD700',
          color: '#003366',
          padding: '2px 8px',
          fontSize: '12px',
          fontWeight: 'bold',
          borderRadius: '5px',
        }}
      >
        Default
      </span>
      <button
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
</div>

      {/* Products Ordered Section */}
      <div style={{ borderBottom: '3px solid #FFD700 ', marginBottom: '20px' }}>
        <h2 style={{ color: '#000000', fontSize: '18px', fontWeight: 'bold' }}>Products Ordered</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            fontWeight: 'bold',
            borderBottom: '2px solid #FFD700 ',
          }}
        >
          <div style={{ flex: 1, fontSize: '14px', color: '#333' }}></div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#333', width: '120px', flexShrink: 0 }}>
            Unit Price
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#333', width: '80px', flexShrink: 0 }}>
            Quantity
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#333', width: '100px', flexShrink: 0 }}>
            Item Subtotal
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '0px solid #ccc',
          }}
        >
          <div style={{ flex: 1, fontSize: '14px', color: '#333' }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Casing Tecno Pova 2 Tecno Pova 4 Pova 5 TPU</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Variation: pink, Tecno Pova 2</p>
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#333', width: '120px', flexShrink: 0 }}>
            <p style={{ margin: 0 }}>₱129</p>
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#333', width: '80px', flexShrink: 0 }}>
            <p style={{ margin: 0 }}>1</p>
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#333', width: '100px', flexShrink: 0 }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>₱129</p>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
<div
  style={{
    padding: '10px 20px',
    borderBottom: '2px solid #FFD700 ',
    backgroundColor: '#fff',
  }}
>
  <h2
    style={{
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000',
      marginBottom: '10px',
    }}
  >
    Payment Method
  </h2>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Cash on Delivery</p>
    <span
      style={{
        fontSize: '14px',
        color: '#0066cc',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}
    >
      CHANGE
    </span>
  </div>
</div>

{/* Payment Details */}
<div
  style={{
    padding: '20px',
    fontSize: '14px',
    backgroundColor: '#FFFCF5',
    borderBottom: '2px solid #FFD700 ',
  }}
>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    }}
  >
    <span>Merchandise Subtotal:</span>
    <span>₱129</span>
  </div>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    }}
  >
    <span>Shipping Subtotal:</span>
    <span>₱40</span>
  </div>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    }}
  >
    <span>Voucher Discount:</span>
    <span style={{ color: '#e63946' }}>-₱13</span>
  </div>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      fontSize: '16px',
    }}
  >
    <span>Total Payment:</span>
    <span style={{ color: '#e63946' }}>₱156</span>
  </div>
</div>

{/* Place Order Button */}
<div style={{ padding: '20px', textAlign: 'right' }}>
  <button
    style={{
      backgroundColor: '#FFD700',
      color: '#000000',
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
