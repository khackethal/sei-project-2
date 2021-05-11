import { Link } from 'react-router-dom'
import React from 'react'
import { useLocation } from 'react-router-dom'

function Nav() {
  const location = useLocation()
  const [menuIsActive, setMenuIsActive] = React.useState(false)
  const toggleMenu = () => {
    setMenuIsActive(!menuIsActive)
  }
  React.useEffect(() => {
    setMenuIsActive(false)
  }, [location.pathname])
  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            {' '}
            Home{' '}
          </Link>
          <span
            className={`navbar-burger ${menuIsActive ? 'is-active' : ''} `}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div className={`navbar-menu ${menuIsActive ? 'is-active' : ''} `}>
          <div className="navbar-start">
            <Link to="/coins" className="navbar-item">
              {' '}
              All Coins
            </Link>
            <Link to="/calculator" className="navbar-item">
              {' '}
              Exchange Calculator
            </Link>
            <Link to="/crystalball" className="navbar-item">
              {' '}
              Crystal Ball 🔮
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
