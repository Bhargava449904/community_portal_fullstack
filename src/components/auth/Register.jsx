import React, { useState } from "react";

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // ✅ FormData instead of JSON
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(
        "https://issue-portal-b46v.onrender.com/register/",
        {
          method: "POST",
          body: formData,          // ✅ important
          credentials: "include",  // safe for future cookies
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess("Account created successfully");
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setError("Server not responding");
    }
  };

  return (
    <div className="modal-box">
      <h2>Create Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <button className="register-btn" type="submit">
          Create Account
        </button>
      </form>

      <p>
        Already have an account?
        <span
          style={{ cursor: "pointer", marginLeft: "5px" }}
          onClick={onSwitchToLogin}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
