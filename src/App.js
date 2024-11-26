import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Dashboard from './Components/AdminInventory/Dashboard'
import Inventory from './Components/AdminInventory/Inventory'
import SideNavigationAdmin from './Components/Side Navigation/SideNavigation'
import LSFrame from './Components/Auth/LSFrame'
import AuthService from './Services/AuthService'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setIsAuthenticated(!!user);
  }, []);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="d-flex small">
      {!isAuthPage && <SideNavigationAdmin />}
      <div className="content d-flex justify-content-center" style={{ width: '100%', backgroundColor: '#ccccff' }}>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<LSFrame onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<LSFrame />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/inventory" element={<ProtectedRoute element={<Inventory />} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App