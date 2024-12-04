import React, { useState, useEffect } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation to checkout page
import "bootstrap/dist/css/bootstrap.min.css";
import cartService from "../../Services/cartService";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0); // State to track cart count
  const navigate = useNavigate(); // To navigate programmatically

  // Fetch cart items on component load
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch the cart items from the API
  const fetchCartItems = async () => {
    try {
      const response = await cartService.getCarts();
      console.log("Fetched cart items:", response); // Check the structure of response

      const cartItems = response.items || [];
      setCart(cartItems);
      setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0)); // Update cart count
      setError(null);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart items. Please try again.");
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.total_price_per_product * item.quantity, 0);

  // Handle quantity change
  const handleQuantityChange = async (id, type) => {
    try {
      let updatedCart = [...cart];
      const index = updatedCart.findIndex((item) => item.id === id);
      if (index !== -1) {
        if (type === "increase") {
          updatedCart[index].quantity += 1;
        } else if (type === "decrease" && updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
        }
      }

      setCart(updatedCart);
      setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0)); // Update cart count

      // Update the cart on the server
      await cartService.updateQuantity(id, updatedCart[index].quantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (id) => {
    try {
      await cartService.removeFromCart(id); // Call API to remove item
      await fetchCartItems(); // Re-fetch the cart after removing an item
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item from cart. Please try again.");
    }
  };

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate("/store/checkout"); // Redirect to the checkout page
  };

  return (
    <Container className="py-4">
      <div
        style={{
          backgroundColor: "#F8F9FA",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
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

        {error && <div className="alert alert-danger">{error}</div>}

        {cart.length > 0 ? (
          <>
            <Table
              bordered
              hover
              style={{ backgroundColor: "#FFFFFF", borderColor: "#003366" }}
            >
              <thead style={{ backgroundColor: "#003366", color: "#FFFFFF" }}>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>₱{item.total_price_per_product}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, "decrease")}
                          style={{
                            backgroundColor: "#FFD700",
                            color: "#003366",
                            border: "none",
                          }}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, "increase")}
                          style={{
                            backgroundColor: "#FFD700",
                            color: "#003366",
                            border: "none",
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                        style={{
                          backgroundColor: "#FFD700",
                          color: "#003366",
                          border: "none",
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Gold-colored line below the table */}
            <hr style={{ borderColor: "#003366", borderWidth: "2px" }} />

            <div className="d-flex justify-content-between align-items-center">
  <h4>Total: ₱{calculateTotal()}</h4>
  {/* Checkout Button */}
  <Button
    variant="primary"
    onClick={handleCheckout}
    style={{
      backgroundColor: "#003366",
      border: "none",
    }}
  >
    Proceed to Checkout
  </Button>
</div>

          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </Container>
  );
};

export default Cart;
