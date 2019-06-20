import React, { useEffect, lazy } from 'react'
import './DashboardPage.scss'
import { connect } from 'react-redux'
import { getCurrentUserProfile } from '../../ducks/profile/profileActions'
import { isLoadingSelector, userProfileSelector } from '../../ducks/profile/profileSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'
import { userSelector } from '../../ducks/auth/authSelectors'
import { load } from '../../utils/lazyLoadSingleComponent/lazyLoadSingleComponent'

const Experience = load(lazy(() => import('../../components/Dashboard/Experience/Experience')))
const Education = load(lazy(() => import('../../components/Dashboard/Education/Education')))

const DashboardPage = ({ getCurrentUserProfile, userProfile, isLoading, user }) => {
  useEffect(() => {
    getCurrentUserProfile()
  }, [getCurrentUserProfile])

  if (isLoading || !user) return <Spinner />

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
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

      {userProfile && <Experience experience={userProfile.experience} />}

      {userProfile && <Education education={userProfile.education} />}

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
    isLoading: isLoadingSelector(state),
    user: userSelector(state)
  }),
  { getCurrentUserProfile }
)(DashboardPage)

