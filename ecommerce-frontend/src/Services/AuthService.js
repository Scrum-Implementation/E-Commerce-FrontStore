import Api from "./Api";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await Api.post("/login", { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
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
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      throw error;
    }
  },

  isAuthenticated: async () => {
    return !!localStorage.getItem("token");
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
