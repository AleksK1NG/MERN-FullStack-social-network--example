import React, { useEffect, lazy, Fragment } from 'react'
import './DashboardPage.scss'
import { connect } from 'react-redux'
import {
  deleteEducation,
  deleteExperience,
  deleteProfile,
  getCurrentUserProfile
} from '../../ducks/profile/profileActions'
import { isLoadingSelector, userProfileSelector } from '../../ducks/profile/profileSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'
import { userSelector } from '../../ducks/auth/authSelectors'
import { load } from '../../utils/lazyLoadSingleComponent/lazyLoadSingleComponent'
import DashboardActions from '../../components/Dashboard/DashboardActions/DashboardActions'
import { Link } from 'react-router-dom'

const Experience = load(lazy(() => import('../../components/Dashboard/Experience/Experience')))
const Education = load(lazy(() => import('../../components/Dashboard/Education/Education')))

const DashboardPage = ({
  getCurrentUserProfile,
  userProfile,
  isLoading,
  user,
  deleteProfile,
  deleteExperience,
  deleteEducation,
  history
}) => {
  debugger
  useEffect(() => {
    getCurrentUserProfile()
  }, [getCurrentUserProfile])

  if (isLoading || !user) return <Spinner />

  const goToProfileHandler = () => {
    history.push(`/profile/${user._id}`)
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" onClick={goToProfileHandler}></i> Welcome {user && user.name}
      </p>

      {userProfile ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={userProfile.experience} deleteExperience={deleteExperience} />
          <Education education={userProfile.education} deleteEducation={deleteEducation} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={deleteProfile}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </section>
  )
}

export default connect(
  (state) => ({
    userProfile: userProfileSelector(state),
    isLoading: isLoadingSelector(state),
    user: userSelector(state)
  }),
  { getCurrentUserProfile, deleteProfile, deleteExperience, deleteEducation }
)(DashboardPage)
