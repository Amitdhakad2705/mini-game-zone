
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Registration backend abhi connect nahi hua hai.')
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <Link to="/" className="register-brand">
          <span className="register-brand-icon">🎮</span>
          <span>Mini Game Zone</span>
        </Link>

        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">
          Join the game and start your journey!
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            required
          />

          <label htmlFor="register-email">Gmail / Email Address</label>
          <input
            id="register-email"
            type="email"
            placeholder="you@gmail.com"
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Password</label>
          <div className="register-password-wrapper">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button
              type="button"
              className="register-password-toggle"
              onClick={() => setShowPassword(previous => !previous)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="register-submit">
            Create Account
          </button>
        </form>

        <p className="register-login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/" className="register-home-link">
          ← Back to Home
        </Link>
      </section>
    </main>
  )
}

export default Register
