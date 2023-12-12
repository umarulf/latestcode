import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      console.error("Email and password cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();
      console.log("Response data of login:", responseData);

      if (!response.ok) {
        console.error("Authentication failed");
        setSuccess("False");
        return;
      }
      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("name", responseData.name);
      console.log("User ID:", responseData.userId);
      navigate("/app");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login bg-black h-screen pt-12">
      <div className="login-container">
        <h1 className="login-heading">Login Page</h1>

        <div className="login-box">
          <form className="login-form" onSubmit={handleLogin}>
            <label className="input-label">
              Email:
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </label>
            <label className="input-label">
              Password:
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
            </label>

            {success && <p className="alert">Invalid credentials</p>}

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>
        </div>
        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link-text">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
