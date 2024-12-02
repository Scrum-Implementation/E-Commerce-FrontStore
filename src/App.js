import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Components/AdminInventory/Dashboard";
import Inventory from "./Components/AdminInventory/Inventory";
import SideNavigationAdmin from "./Components/Side Navigation/SideNavigation";
import LSFrame from "./Components/Auth/LSFrame";
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
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await AuthService.isAuthenticated();
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

  // Render Bootstrap spinner while checking authentication.
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
      {!isAuthPage && <SideNavigationAdmin />}
      <div
        className="content d-flex justify-content-center"
        style={{ width: "100%", backgroundColor: "#003366" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
          <Route
            path="/login"
            element={<LSFrame onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/signup" element={<LSFrame />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/inventory"
            element={<ProtectedRoute element={<Inventory />} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
