import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
      <section className="homepage hero is-fullheight-with-navbar">
        <div className="hero-body">
          <Link to="/coins"className="container">
            <h1 Link to="/coins" className="title is-1 has-text-centered has-text-white">
              Homepage
            </h1>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
