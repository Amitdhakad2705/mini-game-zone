
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TicTacToe.css'

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return board.every(Boolean) ? 'Draw' : null
}

function TicTacToe() {
  const navigate = useNavigate()

  const [mode, setMode] = useState('computer')
  const [board, setBoard] = useState(Array(9).fill(''))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [result, setResult] = useState(null)
  const [thinking, setThinking] = useState(false)

  function resetGame(nextMode = mode) {
    setMode(nextMode)
    setBoard(Array(9).fill(''))
    setCurrentPlayer('X')
    setResult(null)
    setThinking(false)
  }

  function makeMove(index, player, currentBoard = board) {
    if (currentBoard[index] || getWinner(currentBoard)) {
      return currentBoard
    }

    const nextBoard = [...currentBoard]
    nextBoard[index] = player

    setBoard(nextBoard)
    setResult(getWinner(nextBoard))
    return nextBoard
  }

  function handleCellClick(index) {
    if (thinking || result || board[index]) return

    const nextBoard = makeMove(index, currentPlayer)

    if (getWinner(nextBoard)) return

    if (mode === 'friend') {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
      return
    }

    // Computer mode: computer plays O.
    const emptyCells = nextBoard
      .map((cell, cellIndex) => cell === '' ? cellIndex : -1)
      .filter(cellIndex => cellIndex !== -1)

    if (emptyCells.length === 0) {
      setResult('Draw')
      return
    }

    setThinking(true)

    // Choose a winning move, block X if needed, otherwise play randomly.
    const computerBoard = [...nextBoard]
    let computerMove = -1

    for (const cellIndex of emptyCells) {
      const testBoard = [...computerBoard]
      testBoard[cellIndex] = 'O'
      if (getWinner(testBoard) === 'O') {
        computerMove = cellIndex
        break
      }
    }

    if (computerMove === -1) {
      for (const cellIndex of emptyCells) {
        const testBoard = [...computerBoard]
        testBoard[cellIndex] = 'X'
        if (getWinner(testBoard) === 'X') {
          computerMove = cellIndex
          break
        }
      }
    }

    if (computerMove === -1) {
      computerMove = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }

    const finalBoard = [...nextBoard]
    finalBoard[computerMove] = 'O'
    setBoard(finalBoard)
    setResult(getWinner(finalBoard))
    setCurrentPlayer('X')
    setThinking(false)
  }

  return (
    <main className="tic-tac-toe">
      <button className="ttt-back" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <h1>Tic-Tac-Toe</h1>
      <p className="ttt-subtitle">Choose your challenge!</p>

      <div className="ttt-modes">
        <button
          className={mode === 'computer' ? 'ttt-mode active' : 'ttt-mode'}
          onClick={() => resetGame('computer')}
        >
          🤖 Play vs Computer
        </button>
        <button
          className={mode === 'friend' ? 'ttt-mode active' : 'ttt-mode'}
          onClick={() => resetGame('friend')}
        >
          👥 Play vs Friend
        </button>
      </div>

      <p className="ttt-status" aria-live="polite">
        {result
          ? result === 'Draw'
            ? "It's a Draw! 🤝"
            : `${result} Wins! 🎉`
          : thinking
            ? 'Computer is thinking...'
            : mode === 'computer'
              ? 'Your turn — X'
              : `Player ${currentPlayer}'s turn`}
      </p>

      <div className="ttt-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`ttt-cell ${cell ? `ttt-${cell.toLowerCase()}` : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={Boolean(result) || Boolean(cell) || thinking}
            aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ''}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="ttt-reset" onClick={() => resetGame()}>
        ↻ Restart Game
      </button>
    </main>
  )
}

export default TicTacToe
