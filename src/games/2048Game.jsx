
import { useState, useEffect, useRef } from 'react'
import './2048Game.css'

function createBoard() {
  const board = Array(16).fill(0)

  for (let i = 0; i < 2; i++) {
    let index = Math.floor(Math.random() * 16)

    while (board[index] !== 0) {
      index = Math.floor(Math.random() * 16)
    }

    board[index] = Math.random() < 0.9 ? 2 : 4
  }

  return board
}

function moveLeft(board) {
  const newBoard = []

  for (let row = 0; row < 4; row++) {
    const start = row * 4
    const values = board.slice(start, start + 4).filter(n => n !== 0)

    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] === values[i + 1]) {
        values[i] *= 2
        values.splice(i + 1, 1)
      }
    }

    while (values.length < 4) values.push(0)
    newBoard.push(...values)
  }

  return newBoard
}

function moveBoard(board, direction) {
  let workingBoard = [...board]

  if (direction === 'right') {
    workingBoard = workingBoard.map((_, index) => {
      const row = Math.floor(index / 4)
      const col = 3 - (index % 4)
      return board[row * 4 + col]
    })
    workingBoard = moveLeft(workingBoard)
    return workingBoard.map((_, index) => {
      const row = Math.floor(index / 4)
      const col = 3 - (index % 4)
      return workingBoard[row * 4 + col]
    })
  }

  if (direction === 'up' || direction === 'down') {
    const rotated = Array(16).fill(0)

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        rotated[c * 4 + r] = board[r * 4 + c]
      }
    }

    workingBoard = moveBoard(rotated, direction === 'up' ? 'left' : 'right')

    const result = Array(16).fill(0)
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        result[r * 4 + c] = workingBoard[c * 4 + r]
      }
    }
    return result
  }

  return moveLeft(workingBoard)
}

function addRandomTile(board) {
  const empty = board
    .map((value, index) => value === 0 ? index : -1)
    .filter(index => index !== -1)

  if (empty.length === 0) return board

  const index = empty[Math.floor(Math.random() * empty.length)]
  const newBoard = [...board]
  newBoard[index] = Math.random() < 0.9 ? 2 : 4

  return newBoard
}

function getScore(board) {
  return board.reduce((total, value) => total + value, 0)
}

function Game2048() {
  const [board, setBoard] = useState(() => createBoard())
  const [best, setBest] = useState(() => Number(localStorage.getItem('2048-best') || 0))
  const [gameOver, setGameOver] = useState(false)
  const touchStart = useRef({ x: 0, y: 0 })

  const restart = () => {
    setBoard(createBoard())
    setGameOver(false)
  }

  const playMove = (direction) => {
    if (gameOver) return

    const moved = moveBoard(board, direction)
    if (moved.every((value, i) => value === board[i])) return

    const nextBoard = addRandomTile(moved)
    setBoard(nextBoard)

    const score = getScore(nextBoard)
    if (score > best) {
      setBest(score)
      localStorage.setItem('2048-best', String(score))
    }

    const noEmpty = nextBoard.every(value => value !== 0)
    const canMerge = nextBoard.some((value, i) => {
      const row = Math.floor(i / 4)
      const col = i % 4
      return (
        (col < 3 && value === nextBoard[i + 1]) ||
        (row < 3 && value === nextBoard[i + 4])
      )
    })

    if (noEmpty && !canMerge) setGameOver(true)
  }

  // Laptop/PC keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      const keys = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      }

      if (keys[event.key]) {
        event.preventDefault()
        playMove(keys[event.key])
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [playMove])

  // Mobile finger swipe controls
  const handleTouchStart = (event) => {
    const touch = event.touches[0]

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    }
  }

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0]

    const dx = touch.clientX - touchStart.current.x
    const dy = touch.clientY - touchStart.current.y

    if (Math.max(Math.abs(dx), Math.abs(dy)) < 25) return

    if (Math.abs(dx) > Math.abs(dy)) {
      playMove(dx > 0 ? 'right' : 'left')
    } else {
      playMove(dy > 0 ? 'down' : 'up')
    }
  }
  return (
    <main className="game2048">
      <button onClick={() => window.location.href = '/'}>
        ← Back to Home
      </button>

      <h1>2048 Puzzle</h1>
      <p>Merge matching tiles and reach 2048!</p>

      <div className="score-row">
        <div>Score <strong>{getScore(board)}</strong></div>
        <div>Best <strong>{best}</strong></div>
      </div>

      <div
        className="board2048"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {board.map((value, index) => (
          <div
            key={index}
            className={`tile tile-${value}`}
          >
            {value || ''}
          </div>
        ))}
      </div>

      {gameOver && <h2>Game Over!</h2>}

      <button onClick={restart}>↻ New Game</button>
      <p className="game-hint">Use arrow keys or swipe on mobile.</p>
    </main>
  )
}

export default Game2048
