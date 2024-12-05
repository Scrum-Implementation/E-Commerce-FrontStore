import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import AuthService from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ triggerAlert, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "", show: false });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await AuthService.login(email, password);
      if (userData) {
        onLogin();

        if (userData.role === "admin") {
          navigate("/admin/inventory");
        } else if (userData.role === "user") {
          navigate("/store/products");
        } else {
          throw new Error("Invalid role");
        }
      }
    } catch (error) {
      setAlert({
        message: "Invalid email or password.",
        type: "danger",
        show: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 5000); // hide the alert after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div>
      {alert.show && (
        <Alert
          variant={alert.type}
          className="alert-dismissible fade show"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050,
            width: "30%",
          }}
        >
          <div className="text-center">{alert.message}</div>
        </Alert>
      )}

      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-3"
          />
        </Form.Group>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            type="submit"
            style={{
              backgroundColor: "#FFD700",
              borderColor: "#FFD700",
              color: "black",
              padding: "10px 20px",
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "10px" }}
              />
            ) : null}
            {loading ? "Logging In..." : "Login"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
