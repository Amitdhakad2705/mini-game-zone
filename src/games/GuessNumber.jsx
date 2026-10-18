
import { useState } from 'react'
import './GuessNumber.css'
import { useNavigate } from 'react-router-dom'

function GuessNumber() {
  const navigate = useNavigate()
  const [secretNumber, setSecretNumber] = useState(
    () => Math.floor(Math.random() * 100) + 1
  )
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('Enter a number between 1 and 100')
  const [attempts, setAttempts] = useState(0)
  const [won, setWon] = useState(false)

  function handleGuess() {
    const number = Number(guess)

    if (guess === '' || number < 1 || number > 100 || !Number.isInteger(number)) {
      setMessage('Please enter a whole number from 1 to 100.')
      return
    }


    if (won) return

    setAttempts(attempts + 1)

    if (number === secretNumber) {
      setMessage('🎉 Correct! You guessed the number!')
      setWon(true)
    } else if (number < secretNumber) {
      setMessage('⬆️ Too low! Try a higher number.')
    } else {
      setMessage('⬇️ Too high! Try a lower number.')
    }

    setGuess('')
  }

  function restartGame() {
    setSecretNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setMessage('Enter a number between 1 and 100')
    setAttempts(0)
    setWon(false)
  }

  return (
    
    <section className="guess-game">
        <button onClick={() => navigate('/')}>
      ← Back to Home
      </button>
      <div className="guess-panel">
        <span className="guess-label">NUMBER CHALLENGE</span>
        <h2>Guess the Number</h2>
        <p className="guess-description">
          I have selected a secret number between 1 and 100.
          Can you find it?
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleGuess()
          }}
        >
          <label htmlFor="guess-input">Your guess</label>
          <input
            id="guess-input"
            type="number"
            min="1"
            max="100"
            step="1"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Enter a number..."
            disabled={won}
          />

          <button type="submit" disabled={won}>
            Check Number
          </button>
        </form>

        <p className="guess-message" aria-live="polite">{message}</p>
        <p className="guess-attempts">Attempts: {attempts}</p>

        {won && (
          <button className="guess-restart" onClick={restartGame}>
            Play Again ↻
          </button>
        )}
      </div>
    </section>
  )
}

export default GuessNumber
