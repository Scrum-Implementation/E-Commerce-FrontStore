import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FrontStore from "./Components/Store/FrontStore";
import Cart from "./Components/Store/Cart";
import CheckOut from "./Components/Store/CheckOut";
import LSFrame from "./Components/Auth/LSFrame";
import AdminInventory from "./Components/AdminInventory/Inventory";
import AuthService from "./Services/AuthService";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(""); // Track user role (admin or user)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await AuthService.isAuthenticated();
        if (authStatus) {
          const userDetails = await AuthService.getUserDetails();
          setRole(userDetails.role); // Set role after authentication
        }
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const ProtectedRoute = ({ element }) => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="d-flex small">
      <div
        className="content d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  isAuthenticated
                    ? role === "admin"
                      ? "/admin/inventory"
                      : "/store/products"
                    : "/login"
                }
              />
            }
          />
          <Route
            path="/login"
            element={<LSFrame onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/signup" element={<LSFrame />} />

          {/* Admin Routes */}
          <Route
            path="/admin/inventory"
            element={<ProtectedRoute element={<AdminInventory />} />}
          />

          {/* User Routes */}
          <Route
            path="/store/products"
            element={<ProtectedRoute element={<FrontStore />} />}
          />
          <Route
            path="/store/cart"
            element={<ProtectedRoute element={<Cart />} />}
          />
          <Route
            path="/store/checkout"
            element={<ProtectedRoute element={<CheckOut />} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
