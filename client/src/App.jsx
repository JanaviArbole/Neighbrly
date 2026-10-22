
import './App.css'

function App() {
  return (
    <main className="app">
      <nav className="navbar">
        <a className="brand" href="/">
          Neighbrly<span>.</span>
        </a>

        <a className="nav-link" href="#about">
          About
        </a>
      </nav>

      <section className="hero">
        <p className="eyebrow">YOUR COMMUNITY, CONNECTED</p>

        <h1>
          Your neighbourhood,
          <br />
          <span>all in one place.</span>
        </h1>

        <p className="hero-description">
          Discover trusted local services, useful facilities,
          and the people who make your community feel like home.
        </p>

        <a className="primary-button" href="#about">
          Explore Neighbrly <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className="about" id="about">
        <h2>Everything you need, closer to home.</h2>
        <p>
          Find local professionals, discover nearby facilities,
          and stay connected with your community.
        </p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Neighbrly. Built for your community.
      </footer>
    </main>
  )
}

export default App
