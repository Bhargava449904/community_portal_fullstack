import React, { useState } from "react";

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    console.log("REGISTER CLICKED");

    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(
        "https://issue-portal-b46v.onrender.com/register/",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess(data.message || "Account created successfully");

      setUsername("");
      setEmail("");
      setPassword("");

      // optional: switch to login after success
      setTimeout(() => {
        onSwitchToLogin();
      }, 1200);

    } catch (err) {
      console.error(err);
      setError("Server not responding");
    }
  };

  return (
    <>
      <h2>Create Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

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

      <button className="register-btn" onClick={handleRegister}>
        Create Account
      </button>

      <p>
        Already have an account?
        <span
          style={{ cursor: "pointer", marginLeft: "5px" }}
          onClick={onSwitchToLogin}
        >
          Login
        </span>
      </p>
    </>
  );
}

export default Register;
