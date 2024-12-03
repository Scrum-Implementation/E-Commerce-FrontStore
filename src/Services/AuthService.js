import Api from "./Api";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await Api.post("/login", { email, password });
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  },

  signup: async (userDetails) => {
    try {
      const response = await Api.post("/signup", userDetails);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      await Api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      throw error;
    }
  },

  isAuthenticated: async () => {
    try {
      const response = await Api.get("/isAuthenticated");
      return response.data.isAuthenticated;
    } catch (error) {
      console.error(
        "Authentication check error:",
        error.response?.data || error.message
      );
      return false;
    }
  },

  getUserDetails: async () => {
    try {
      const response = await Api.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Fetch user details error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default AuthService;
