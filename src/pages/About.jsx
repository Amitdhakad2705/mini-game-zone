
import { useNavigate } from 'react-router-dom'
import './About.css'

function About() {
  const navigate = useNavigate()

  return (
    <main className="about-page">
      <button
        className="about-back"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>

      <section className="about-hero">
        <div className="about-logo">🎮</div>

        <h1>About Mini Game Zone</h1>

        <p className="about-tagline">
          Your World. Your Game. Your Glory.
        </p>

        <p className="about-description">
          Welcome to Mini Game Zone — your place to play,
          challenge yourself, and have fun!
        </p>
      </section>

      <section className="about-features">
        <article className="about-card">
          <span>🕹️</span>
          <h2>Fun Games</h2>
          <p>
            Enjoy quick and entertaining games whenever you want.
          </p>
        </article>

        <article className="about-card">
          <span>🧠</span>
          <h2>Challenge Yourself</h2>
          <p>
            Improve your thinking and test your skills through gameplay.
          </p>
        </article>

        <article className="about-card">
          <span>👥</span>
          <h2>Play Together</h2>
          <p>
            Enjoy friendly challenges and compete with your friends.
          </p>
        </article>
      </section>

      <section className="about-footer">
        <h2>Ready to Play?</h2>
        <p>Your next gaming adventure is waiting.</p>

        <button onClick={() => navigate('/#games')}>
          Explore Games →
        </button>
      </section>
    </main>
  )
}

export default About
