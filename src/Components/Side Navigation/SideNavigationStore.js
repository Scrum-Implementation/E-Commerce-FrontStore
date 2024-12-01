import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SideNavigationStore = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setCartCount(0);
  }, []);

  useEffect(() => {
    const tooltipElements = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipElements.forEach((element) => {
      new window.bootstrap.Tooltip(element);
    });

    return () => {
      tooltipElements.forEach((element) => {
        const tooltip = window.bootstrap.Tooltip.getInstance(element);
        if (tooltip) tooltip.dispose();
      });
    };
  }, []);

  return (
    <>
      <nav
        className="navbar flex-column position-fixed top-0 start-0 h-100"
        style={{ width: "60px", background: "#003366" }}
      >
        <div className="navbar-nav" style={{ flex: 1 }}>
          <div
            className="d-flex justify-content-center mt-2"
            style={{ marginBottom: "80px" }}
          >
            <i
              className="bi bi-person-circle"
              style={{ fontSize: "32px", color: "#FFD700" }}
            ></i>
          </div>

          <div
            className="nav-link d-flex justify-content-center mb-2"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Home"
          >
            <Link to="/store/shop">
              <i
                className="bi bi-house-door-fill"
                style={{ fontSize: "24px", color: "#FFD700" }}
                onMouseEnter={(e) => (e.target.style.color = "gray")}
                onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
              ></i>
            </Link>
          </div>

          <div
            className="nav-link d-flex justify-content-center position-relative"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Cart"
          >
            <Link to="/store/cart" className="position-relative">
              <i
                className="bi bi-cart"
                style={{ fontSize: "24px", color: "#FFD700" }}
                onMouseEnter={(e) => (e.target.style.color = "gray")}
                onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
              ></i>

              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  backgroundColor: "white",
                  color: "#003366",
                  fontSize: "10px",
                  border: "1px solid #003366",
                }}
              >
                {cartCount}
              </span>
            </Link>
          </div>

          <div
            className="nav-link d-flex justify-content-center mb-5"
            style={{ marginTop: "auto", cursor: "pointer" }}
            onClick={handleConfirmLogout}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Logout"
          >
            <i
              className="bi bi-box-arrow-left"
              style={{ fontSize: "24px", color: "#FFD700" }}
              onMouseEnter={(e) => (e.target.style.color = "gray")}
              onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
            ></i>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <p>Are you sure you want to log out?</p>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SideNavigationStore;