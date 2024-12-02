import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthService from "../../Services/AuthService";

const SignUpForm = ({ triggerAlert }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact_number: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await AuthService.signup(userDetails);
      if (response) {
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        triggerAlert("Email already exists.");
      } else {
        triggerAlert("Network error. Please check your connection.");
      }
    }
  };

  return (
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

      {error && <div className="text-danger mb-3">{error}</div>}

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
        >
          SignUp
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
