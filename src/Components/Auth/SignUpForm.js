import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import AuthService from "../../Services/AuthService";

const SignUpForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact_number: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "", show: false });
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    setAlert({ ...alert, show: false }); // Hide the alert when user starts typing
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (userDetails.password !== userDetails.confirmPassword) {
      setAlert({
        message: "Passwords do not match. Please try again.",
        type: "danger",
        show: true,
      });
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await AuthService.signup(userDetails);
      if (response) {
        setAlert({
          message: "Signup successful!",
          type: "success",
          show: true,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setAlert({
          message: "Email already exists.",
          type: "danger",
          show: true,
        });
      } else {
        setAlert({
          message: "Network error. Please check your connection.",
          type: "danger",
          show: true,
        });
      }
    }
    setLoading(false); // Stop loading
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

      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formName">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="formContactNumber">
          <Form.Control
            type="text"
            placeholder="Contact Number"
            name="contact_number"
            value={userDetails.contact_number}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={handleInputChange}
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
            {loading ? "Signing Up..." : "SignUp"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
