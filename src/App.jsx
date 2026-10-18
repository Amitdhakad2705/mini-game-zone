
import './App.css'

import BackgroundAnimation from './components/BackgroundAnimation'
import Navbar from './components/Navbar'
import GamesSection from './components/GamesSection'
import Footer from './components/Footer'

import GuessNumber from './games/GuessNumber'
import Game2048 from './games/2048Game'
import RockPaperScissors from './games/RockPaperScissors'
import TicTacToe from './games/TicTacToe'

import MyStats from './pages/MyStats'
import About from './pages/About'

import { Routes, Route } from 'react-router-dom'


function HomePage() {
  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <main className="app" id="home">
        <section className="home-hero">
          <h1>Mini Game Zone</h1>
          <p>Your World. Your Game. Your Glory.</p>

          <button onClick={scrollToGames}>
            Explore Games
          </button>
        </section>

        {/* Games Section */}
        <section id="games" className="home-section">
          <GamesSection />
        </section>

        {/* My Stats Section */}
        <section id="stats" className="home-section">
          <h1>My Stats</h1>
          <p>Track your gaming journey!</p>

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

          <p>Your gaming statistics will appear here as you play.</p>

          <button onClick={() => (window.location.href = '/stats')}>
            View Full Stats →
          </button>
        </section>

        {/* About Section */}
        <section id="about" className="home-section">
          <h1>About Mini Game Zone</h1>
          <p className="about-tagline">
            Your World. Your Game. Your Glory.
          </p>

          <p>
            Welcome to Mini Game Zone — your place to play,
            challenge yourself, and have fun!
          </p>

          <div className="about-features">
            <article className="about-card">
              <span>🕹️</span>
              <h2>Fun Games</h2>
              <p>Enjoy quick and entertaining games whenever you want.</p>
            </article>

            <article className="about-card">
              <span>🧠</span>
              <h2>Challenge Yourself</h2>
              <p>Improve your thinking and test your skills through gameplay.</p>
            </article>

            <article className="about-card">
              <span>👥</span>
              <h2>Play Together</h2>
              <p>Enjoy friendly challenges with your friends.</p>
            </article>
          </div>

          <button onClick={() => (window.location.href = '/about')}>
            Learn More →
          </button>
        </section>
      </main>

      <Footer />
    </>
  )
}


function App() {
  return (
    <>
      <BackgroundAnimation />

      <Routes>
        {/* Home page: Navbar sirf yahan dikhega */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />

        {/* Separate pages: Navbar aur Footer nahi dikhenge */}
        <Route path="/stats" element={<MyStats />} />

        <Route path="/about" element={<About />} />

        {/* Existing games */}
        <Route
          path="/games/guess-number"
          element={<GuessNumber />}
        />

        <Route
          path="/games/2048"
          element={<Game2048 />}
        />

        <Route
          path="/games/rock-paper-scissors"
          element={<RockPaperScissors />}
        />

        <Route
          path="/games/tic-tac-toe"
          element={<TicTacToe />}
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={
            <main className="app">
              <h1>Page Not Found</h1>
              <p>This page does not exist.</p>

              <button onClick={() => (window.location.href = '/')}>
                Back to Home
              </button>
            </main>
          }
        />
      </Routes>
    </>
  )
}

export default App
