import React from 'react'
import api from '../api'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import '../MainNavBar.scss'
import '../imageBackground.png'

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout()
  }
  return (
    <nav className="App-header">
      <div className="insideNav">
        <h1 className="App-title">Magma</h1>
        <NavLink to="/" exact className="navText">
          Home
        </NavLink>
        {api.isLoggedIn() && (
          <NavLink to="/my-pattern" className="navText">
            My patterns
          </NavLink>
        )}

        {api.isLoggedIn() && (
          <NavLink to="/create-pattern" className="navText">
            Create !
          </NavLink>
        )}

        <NavLink to="/library" className="navText">
          Library
        </NavLink>

        {!api.isLoggedIn() && (
          <NavLink to="/signup" className="navText">
            Signup
          </NavLink>
        )}

        {!api.isLoggedIn() && (
          <NavLink to="/login" className="navText">
            Login
          </NavLink>
        )}
        {api.isLoggedIn() && (
          <Link to="/" onClick={handleLogoutClick} className="navText">
            Logout
          </Link>
        )}
      </div>
    </nav>
  )
}

export default withRouter(MainNavbar)
