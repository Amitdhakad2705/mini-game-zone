
import GameCard from './GameCard'
import './GamesSection.css'
import { useNavigate } from 'react-router-dom'

const games = [

  {
    id: 3,
    icon: '⭕',
    title: 'Tic-Tac-Toe',
    description: 'Outsmart your opponent!',
  },
  {
  id: 4,
  icon: '🧩',
  title: '2048 Puzzle',
  description: 'Merge tiles and reach 2048!',
},
{
    id: 1,
    icon: '🔢',
    title: 'Guess the Number',
    description: 'Guess the secret number!',
  },
  {
    id: 2,
    icon: '✊',
    title: 'Rock Paper Scissors',
    description: 'Challenge the computer!',
  },
]


function GamesSection() {
 

const navigate = useNavigate()

const handlePlay = (gameTitle) => {
  if (gameTitle === '2048 Puzzle') {
    navigate('/games/2048')
  } else if (gameTitle === 'Guess the Number') {
    navigate('/games/guess-number')
  } else if (gameTitle === 'Rock Paper Scissors') {
    navigate('/games/rock-paper-scissors')
  } else if (gameTitle === 'Tic-Tac-Toe') {
    navigate('/games/tic-tac-toe')
  } else {
    alert(`${gameTitle} will be available soon!`)
  }
}


  return (
    <section className="games-section" id="games">
      <div className="games-heading">
        <span>CHOOSE YOUR CHALLENGE</span>
        <h2>Featured Games</h2>
        <p>Pick a game. Test your skills. Have fun.</p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            icon={game.icon}
            title={game.title}
            description={game.description}
            onPlay={() => handlePlay(game.title)}
          />
        ))}
      </div>
    </section>
  )
}

export default GamesSection
