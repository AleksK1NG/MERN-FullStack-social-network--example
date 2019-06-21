import React from 'react'
import { connect } from 'react-redux'

const ProfilesPage = () => {
  return (
    <section className="container">
      <h1 className="large text-primary">Users</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>

      <div className="profiles">
        <div className="profile bg-light">
          <img
            className="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <div>
            <h2>Alex Bryksin</h2>
            <p>Developer at Google</p>
            <p>Seattle, WA</p>
            <a href="profile.html" className="btn btn-primary">
              View Profile
            </a>
          </div>

          <ul>
            <li className="text-primary">
              <i className="fas fa-check"></i> React
            </li>
            <li className="text-primary">
              <i className="fas fa-check"></i> Vue
            </li>
            <li className="text-primary">
              <i className="fas fa-check"></i> JavaScript
            </li>
            <li className="text-primary">
              <i className="fas fa-check"></i> TypeScript
            </li>
            <li className="text-primary">
              <i className="fas fa-check"></i> Go
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default connect(
  (state) => ({}),
  {}
)(ProfilesPage)
