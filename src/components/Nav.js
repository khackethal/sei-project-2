import { Link } from 'react-router-dom'
import React from 'react'

function Nav() {
  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item"> Home </Link>
        </div>
        <div className="navbar-start">
          <Link to="/coins" className="navbar-item"> All Coins</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav