import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
      <section className="homepage hero is-fullheight-with-navbar">
        <div className="hero-body">
          <Link to="/coins"className="container">
            <div className="title has-text-centered is-1">🔮</div>
            <h1 Link to="/coins" className="title is-1 has-text-centered has-text-white">
              Crystal Crypto 
            </h1>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
