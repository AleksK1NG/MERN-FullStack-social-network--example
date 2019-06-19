import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Alexander Bryksin
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Users</Link>
        </li>
        <li>
          <Link to="/">Register</Link>
        </li>
        <li>
          <Link to="/">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
