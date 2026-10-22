import { useState } from 'react'
import './App.css'

const categories = [
  { name: 'Plumbing', icon: '🔧', description: 'Repairs and installations' },
  { name: 'Electrical', icon: '💡', description: 'Wiring and electrical work' },
  { name: 'Carpentry', icon: '🪚', description: 'Furniture and woodwork' },
  { name: 'Cleaning', icon: '🧹', description: 'Home cleaning services' },
  { name: 'Painting', icon: '🎨', description: 'Walls and interiors' },
  { name: 'Appliances', icon: '🛠️', description: 'Repairs and maintenance' },
  { name: 'Healthcare', icon: '🩺', description: 'Clinics and pharmacies' },
  { name: 'Groceries', icon: '🛒', description: 'Everyday essentials' },
]

function App() {
  const [search, setSearch] = useState('')

  const filteredCategories = categories.filter((category) =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  )

  return (
    <main className="app">
      <nav className="navbar">
        <a className="brand" href="#home">
          Neighbrly<span>.</span>
        </a>

        <a className="nav-link" href="#services">
          Explore services
        </a>
      </nav>

      <section className="hero" id="home">
        <p className="eyebrow">YOUR COMMUNITY, CONNECTED</p>

        <h1>
          Your neighbourhood,
          <br />
          <span>all in one place.</span>
        </h1>

        <p className="hero-description">
          Discover local services, useful facilities, and the people
          who make your community feel like home.
        </p>

        <form
          className="search-bar"
          onSubmit={(event) => {
            event.preventDefault()
            document.getElementById('services')?.scrollIntoView({
              behavior: 'smooth',
            })
          }}
        >
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="What service are you looking for?"
            aria-label="Search services"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="services" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR LOCAL EXPERT</p>
            <h2>What do you need today?</h2>
          </div>

          <span className="result-count">
            {filteredCategories.length} categories
          </span>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="category-grid">
            {filteredCategories.map((category) => (
              <article className="category-card" key={category.name}>
                <div className="category-icon" aria-hidden="true">
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="card-arrow" aria-hidden="true">
                  →
                </span>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">
            No matching categories found. Try another search.
          </p>
        )}
      </section>

      <section className="about" id="about">
        <h2>Everything you need, closer to home.</h2>
        <p>
          Find local professionals and discover useful facilities
          around your community.
        </p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Neighbrly. Built for your community.
      </footer>
    </main>
  )
}

export default App
