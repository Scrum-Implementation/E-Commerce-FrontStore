import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Laptop", price: 800, quantity: 1 },
    { id: 2, name: "Smartphone", price: 500, quantity: 1 },
    { id: 3, name: "Headphones", price: 100, quantity: 2 },
  ]);

  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(item.quantity + change, 0) }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert(`Thank you for your purchase! Total: $${calculateTotal()}`);
    setCart([]); // Clear the cart after checkout
  };

  return (
    <Container className="py-4">
      <div style={{ backgroundColor: "#F8F9FA", padding: "20px", borderRadius: "10px" }}>
        <div
          style={{
            backgroundColor: "#003366",
            color: "#FFD700",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          <h2 className="mb-0">Shopping Cart</h2>
        </div>
        {cart.length > 0 ? (
          <>
            <Table bordered hover style={{ backgroundColor: "#FFFFFF", borderColor: "#003366" }}>
              <thead style={{ backgroundColor: "#003366", color: "#FFFFFF" }}>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>₱{item.price}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="me-2"
                        style={{ borderColor: "#FFD700", color: "#003366" }}
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="ms-2"
                        style={{ borderColor: "#FFD700", color: "#003366" }}
                      >
                        +
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, -item.quantity)
                        }
                        style={{
                          backgroundColor: "#FFD700",
                          borderColor: "#FFD700",
                          color: "#003366",
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div
              className="d-flex justify-content-end align-items-center"
              style={{ borderTop: "2px solid #003366", paddingTop: "15px" }}
            >
              <h4 className="me-4" style={{ color: "#003366" }}>Total: ₱{calculateTotal()}</h4>
              <Button
                onClick={handleCheckout}
                style={{
                  backgroundColor: "#FFD700",
                  borderColor: "#FFD700",
                  color: "#003366",
                  fontWeight: "bold",
                }}
              >
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <p style={{ color: "gray" }}>Your cart is empty.</p>
        )}
      </div>
    </Container>
  );
};

export default Cart;
