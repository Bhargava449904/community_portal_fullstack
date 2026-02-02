import React, { useState } from "react";
import "../auth/login.css";
import { useNavigate } from "react-router-dom";

function Login({ onSwitchToRegister }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(
        "https://issue-portal-b46v.onrender.com/login/",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // 🔥 ROLE-BASED ROUTING
      if (data.role === "citizen") {
        navigate("/create_issue");
      }else {
        navigate("/"); // fallback
      }

    } catch (err) {
      console.error(err);
      setError("Server not responding");
    }
  };

  return (
    <div className="modal-box">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      <p>
        Don’t have an account?
        <span onClick={onSwitchToRegister}> Create account</span>
      </p>
    </div>
  );
}

export default Login;
