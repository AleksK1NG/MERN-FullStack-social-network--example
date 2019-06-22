import React, { useEffect, Fragment, Suspense } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  isCurrentUserProfileSelector,
  isLoadingSelector,
  reposSelector,
  userProfileSelector
} from '../../ducks/profile/profileSelectors'
import { getProfileById } from '../../ducks/profile/profileActions'
import Spinner from '../../components/Shared/Spinner/Spinner'
import { userSelector } from '../../ducks/auth/authSelectors'

const ProfileTop = React.lazy(() => import('../../components/Profile/ProfileTop/ProfileTop'))
const ProfileAbout = React.lazy(() => import('../../components/Profile/ProfileAbout/ProfileAbout'))
const ProfileExperience = React.lazy(() => import('../../components/Profile/ProfileExperience/ProfileExperience'))
const ProfileEducation = React.lazy(() => import('../../components/Profile/ProfileEducation/ProfileEducation'))
const ProfileGithub = React.lazy(() => import('../../components/Profile/ProfileGithub/ProfileGithub'))

const ProfilePage = ({ profile, isLoading, repos, getProfileById, match, profileOwner, user }) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  if (isLoading || !profile) return <Spinner />

  return (
    <section className="container">
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      {profileOwner && (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit Profile
        </Link>
      )}

      <Suspense fallback={<Spinner />}>
        <div className="profile-grid my-1">
          {profile && (
            <Fragment>
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} user={user} />
            </Fragment>
          )}

          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (
              <Fragment>
                {profile.experience.map((experience) => (
                  <ProfileExperience key={experience._id} experience={experience} />
                ))}
              </Fragment>
            ) : (
              <h4>No experience credentials</h4>
            )}
          </div>

          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {profile.education.length > 0 ? (
              <Fragment>
                {profile.education.map((education) => (
                  <ProfileEducation key={education._id} education={education} />
                ))}
              </Fragment>
            ) : (
              <h4>No education credentials</h4>
            )}
          </div>

          {repos && <ProfileGithub repos={repos} />}
        </div>
      </Suspense>
    </section>
  )
}

export default connect(
  (state) => ({
    profile: userProfileSelector(state),
    isLoading: isLoadingSelector(state),
    repos: reposSelector(state),
    profileOwner: isCurrentUserProfileSelector(state),
    user: userSelector(state)
  }),
  { getProfileById }
)(ProfilePage)
