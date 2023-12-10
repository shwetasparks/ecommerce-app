import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import animate.css for animations

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    if (count === 0) {
      navigate("/login");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h1>Redirecting to you in {count} seconds</h1>
        <div
          className="spinner-border animate__animated animate__spin"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
