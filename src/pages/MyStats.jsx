import './MyStats.css'
import { useNavigate } from 'react-router-dom'

function MyStats() {
  const navigate = useNavigate()

  return (
    <main className="stats-page">
      <button onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <h1>My Stats</h1>
      <p className="stats-subtitle">
        Track your gaming journey!
      </p>

      <div className="stats-grid">
        <article className="stat-card">
          <span>🎮</span>
          <h2>Games Played</h2>
          <p>0</p>
        </article>

        <article className="stat-card">
          <span>🏆</span>
          <h2>Total Wins</h2>
          <p>0</p>
        </article>

        <article className="stat-card">
          <span>⭐</span>
          <h2>Best Score</h2>
          <p>0</p>
        </article>
      </div>

      <p className="stats-note">
        Your gaming statistics will appear here as you play.
      </p>
    </main>
  )
}

export default MyStats
