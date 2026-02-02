import React from 'react'
import '../auth/login.css'

function Login({ onSwitchToRegister }) {
  return (
    <div>
        <h2>Login</h2>
      <input placeholder="Email" />
      <input placeholder="Password" />
      <button className='login-button'>Login</button>
      <p>
        Don’t have an account?
        <span onClick={onSwitchToRegister}> Create account</span>
      </p>
    </div>
  )
}

export default Login
