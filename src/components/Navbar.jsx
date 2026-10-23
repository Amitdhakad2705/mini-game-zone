
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const goToSection = (event, sectionId) => {
    event.preventDefault()
    closeMenu()

    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        <span className="brand-logo">🎮</span>

        <div className="brand-text">
          <span className="brand-name">Mini Game Zone</span>
          <span className="brand-tagline">AMIT GAMING WORLD</span>
        </div>
      </Link>

      <div className="nav-links-desktop">
        <Link to="/" onClick={closeMenu}>Home</Link>

        <a href="/#games" onClick={event => goToSection(event, 'games')}>
          Games
        </a>

        <Link to="/stats" onClick={closeMenu}>My Stats</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(previous => !previous)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <Link to="/login" className="login-button" onClick={closeMenu}>
          Login
        </Link>
      </div>

      <div className={`nav-links-mobile ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>

        <a href="/#games" onClick={event => goToSection(event, 'games')}>
          Games
        </a>

        <Link to="/stats" onClick={closeMenu}>My Stats</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
      </div>
    </nav>
  )
}

export default Navbar
