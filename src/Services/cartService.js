// cartService.js
import Api from "./Api";

const cartService = {
  getCarts: async () => {
    try {
      const response = await Api.get("/carts");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw new Error("Could not fetch cart items.");
    }
  },

  addToCart: async (cartItem) => {
    try {
      const response = await Api.post("/carts", cartItem);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error("Could not add product to cart.");
    }
  },

  removeFromCart: async (id) => {
    try {
      await Api.delete(`/carts/${id}`);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw new Error("Could not remove product from cart.");
    }
  },

  updateQuantity: async (id, quantity) => {
    try {
      const response = await Api.put(`/carts/${id}`, { quantity });
      return response.data;
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw new Error("Could not update product quantity.");
    }
  },
};

export default cartService;
