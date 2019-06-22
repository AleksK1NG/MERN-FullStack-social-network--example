import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  isCurrentUserProfileSelector,
  isLoadingSelector,
  reposSelector,
  userProfileSelector
} from '../../ducks/profile/profileSelectors'
import { getGithubRepos, getProfileById } from '../../ducks/profile/profileActions'
import Spinner from '../../components/Shared/Spinner/Spinner'
import ProfileTop from '../../components/Profile/ProfileTop/ProfileTop'
import ProfileAbout from '../../components/Profile/ProfileAbout/ProfileAbout'
import ProfileExperience from '../../components/Profile/ProfileExperience/ProfileExperience'
import ProfileEducation from '../../components/Profile/ProfileEducation/ProfileEducation'
import ProfileGithub from '../../components/Profile/ProfileGithub/ProfileGithub'

const ProfilePage = ({ profile, isLoading, repos, getProfileById, match, profileOwner, getGithubRepos }) => {
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

      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        {/*<ProfileAbout profile={profile} />*/}

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
    </section>
  )
}

export default connect(
  (state) => ({
    profile: userProfileSelector(state),
    isLoading: isLoadingSelector(state),
    repos: reposSelector(state),
    profileOwner: isCurrentUserProfileSelector(state)
  }),
  { getProfileById, getGithubRepos }
)(ProfilePage)
