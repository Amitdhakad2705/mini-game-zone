
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RockPaperScissors.css'

function RockPaperScissors() {
  const navigate = useNavigate()

  const [playerChoice, setPlayerChoice] = useState('')
  const [computerChoice, setComputerChoice] = useState('')
  const [result, setResult] = useState('Choose your move!')
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  })

  const choices = [
    { name: 'Rock', emoji: '✊' },
    { name: 'Paper', emoji: '✋' },
    { name: 'Scissors', emoji: '✌️' },
  ]

  function playGame(choice) {
    const computer = choices[
      Math.floor(Math.random() * choices.length)
    ].name

    setPlayerChoice(choice)
    setComputerChoice(computer)

    if (choice === computer) {
      setResult("It's a Draw!")
      setScore(previous => ({
        ...previous,
        draws: previous.draws + 1,
      }))
    } else if (
      (choice === 'Rock' && computer === 'Scissors') ||
      (choice === 'Paper' && computer === 'Rock') ||
      (choice === 'Scissors' && computer === 'Paper')
    ) {
      setResult('You Win! 🎉')
      setScore(previous => ({
        ...previous,
        wins: previous.wins + 1,
      }))
    } else {
      setResult('Computer Wins!')
      setScore(previous => ({
        ...previous,
        losses: previous.losses + 1,
      }))
    }
  }

  function resetGame() {
    setPlayerChoice('')
    setComputerChoice('')
    setResult('Choose your move!')
    setScore({ wins: 0, losses: 0, draws: 0 })
  }

  return (
    <main className="rps-game">
      <button onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <h1>Rock Paper Scissors</h1>
      <p>Challenge the computer!</p>

      <div className="rps-choices">
        {choices.map(choice => (
          <button
            key={choice.name}
            className="rps-choice"
            onClick={() => playGame(choice.name)}
            aria-label={choice.name}
          >
            <span>{choice.emoji}</span>
            <small>{choice.name}</small>
          </button>
        ))}
      </div>

      <div className="rps-result">
        <p>You: {playerChoice || '—'}</p>
        <p>Computer: {computerChoice || '—'}</p>
        <h2>{result}</h2>
      </div>

      <div className="rps-score">
        <div>Wins<strong>{score.wins}</strong></div>
        <div>Losses<strong>{score.losses}</strong></div>
        <div>Draws<strong>{score.draws}</strong></div>
      </div>

      <button onClick={resetGame}>↻ Play Again</button>
    </main>
  )
}

export default RockPaperScissors
