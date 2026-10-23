
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Login backend abhi connect nahi hua hai.')
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <Link to="/" className="login-brand">
          <span className="login-brand-icon">🎮</span>
          <span>Mini Game Zone</span>
        </Link>

        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">
          Sign in to continue your gaming journey.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Password</label>
          <div className="login-password-wrapper">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword(previous => !previous)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>
        </form>

        <p className="login-register-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <Link to="/" className="login-home-link">
          ← Back to Home
        </Link>
      </section>
    </main>
  )
}

export default Login
