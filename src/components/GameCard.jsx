
function GameCard({ icon, title, description, onPlay }) {
  return (
    <article className="game-card">
      <div className="game-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button onClick={onPlay}>
        Play Now →
      </button>
    </article>
  )
}

export default GameCard
