import Api from "./Api";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await Api.post("/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (userDetails) => {
    try {
      const response = await Api.post("/signup", userDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await Api.post("/logout");
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: async () => {
    try {
      const response = await Api.get("/isAuthenticated");
      return response.data.isAuthenticated;
    } catch (error) {
      return false;
    }
  },
};

export default AuthService;
