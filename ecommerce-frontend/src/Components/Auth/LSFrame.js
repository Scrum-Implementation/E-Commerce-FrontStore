import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Card, Alert } from "react-bootstrap";
import ToggleButton from "./ToggleButton";

const LSFrame = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const triggerAlert = (message) => {
    setErrorMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <>
      {showAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
          style={{
            position: "fixed",
            top: "10px",
            width: "90%",
            maxWidth: "26rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050,
          }}
        >
          {errorMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card
          style={{
            borderRadius: "6%",
            backgroundColor: "#201c1c",
            width: "100%",
            maxWidth: "25rem",
            height: "auto",
          }}
        >
          <Card.Header className="d-flex justify-content-center">
            <h3 className="text-center mt-4 mb-4 text-white">
              Product{" "}
              <span
                style={{
                  backgroundColor: "#FFD700",
                  color: "#201c1c",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                Management
              </span>
            </h3>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <ToggleButton isLogin={isLogin} toggleForm={toggleForm} />
            </div>

            {isLogin ? (
              <LoginForm triggerAlert={triggerAlert} onLogin={onLogin} />
            ) : (
              <SignUpForm triggerAlert={triggerAlert} />
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default LSFrame;
