
import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    navigate('/')
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>🎮 Mini Game Zone</h2>
          <p>Your World. Your Game. Your Glory.</p>
          <span>Play. Challenge. Repeat.</span><br />
          <span>Best Gaming Experience</span>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <button
            onClick={() => {
              navigate('/')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Home
          </button>

          <button onClick={() => scrollToSection('games')}>
            Games
          </button>

          <Link to="/stats" className="footer-page-link">
            My Stats
          </Link>

          <Link to="/about" className="footer-page-link">
            About
          </Link>
        </div>

        <div className="footer-contact">
          <h3>About Our Zone</h3>
          <p>
            Enjoy fun mini-games, challenge your skills,
            and make every moment exciting.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Mini Game Zone.
          All rights reserved.
        </p>
        <p>Made with ❤️ for gamers</p><br />
        <p>@amitdhakad</p>
      </div>
    </footer>
  )
}

export default Footer
