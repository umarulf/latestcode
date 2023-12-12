import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handlePasswordChange = (value) => {
    const strength = checkPasswordStrength(value);
    setPasswordStrength(strength);
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) {
      return "Weak";
    } else if (password.length < 12) {
      return "Moderate";
    } else {
      return "Strong";
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passwordStrength === "Weak"
    ) {
      setErrorMessage(
        "All fields must be filled out, and the password must be strong enough."
      );
      return;
    }

    console.log("Signup data:", {
      name: name,
      email: email,
      password: password,
    });

    try {
      const response = await fetch("http://localhost:8080/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        console.error("Registration failed");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="signup bg-black h-screen pt-12">
      <div className="signup-container ">
        <h1 className="signup-heading">Signup Page</h1>

        <div className="signup-box">
          <form className="signup-form" onSubmit={handleSignup}>
            <label className="input-label">
              Name:
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="signup-input"
                required
              />
            </label>
            <label className="input-label">
              Email:
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input"
                required
              />
            </label>
            <label className="input-label">
              Password:
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                  handlePasswordChange(e.target.value);
                }}
                className="signup-input"
                required
              />
              {passwordTouched && (
                <p
                  className={`password-strength ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Moderate"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  Password Strength: {passwordStrength}
                </p>
              )}
            </label>
            <button
              type="submit"
              className={`signup-button ${
                passwordStrength === "Weak"
                  ? "bg-red-500"
                  : passwordStrength === "Moderate"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              disabled={passwordStrength === "Weak"}
            >
              Sign up
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/" className="login-link-text">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
