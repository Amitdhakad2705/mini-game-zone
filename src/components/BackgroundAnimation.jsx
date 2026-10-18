
import './BackgroundAnimation.css'

function BackgroundAnimation() {
  return (
    <div className="particle-universe">
      <div className="particle-glow glow-one"></div>
      <div className="particle-glow glow-two"></div>
      <div className="particle-glow glow-three"></div>

      {Array.from({ length: 45 }, (_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            '--x': `${(index * 37) % 100}%`,
            '--delay': `${(index % 10) * -0.8}s`,
            '--duration': `${5 + (index % 6)}s`,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundAnimation
