import React, { useEffect } from 'react'
import './DashboardPage.scss'
import { connect } from 'react-redux'
import { getCurrentUserProfile } from '../../ducks/profile/profileActions'
import { isLoadingSelector, userProfileSelector } from '../../ducks/profile/profileSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'

const DashboardPage = ({ getCurrentUserProfile, userProfile, isLoading }) => {
  useEffect(() => {
    getCurrentUserProfile()
  }, [])

  if (isLoading) return <Spinner />

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome Alexander Bryksin
      </p>
      <div className="dash-buttons">
        <a href="create-profile.html" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </a>
        <a href="add-experience.html" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </a>
        <a href="add-education.html" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </a>
      </div>

      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google</td>
            <td className="hide-sm">Senior Developer</td>
            <td className="hide-sm">02-03-2017 - 01-01-2019</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td className="hide-sm">Senior Developer</td>
            <td className="hide-sm">01-01-2019- Now</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Moscow MADI</td>
            <td className="hide-sm">Software Engineer</td>
            <td className="hide-sm">01-08-2005 - 01-06-2010</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </section>
  )
}

export default connect(
  (state) => ({
    userProfile: userProfileSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { getCurrentUserProfile }
)(DashboardPage)
