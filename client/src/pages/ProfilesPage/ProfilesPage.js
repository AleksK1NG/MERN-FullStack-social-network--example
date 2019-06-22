import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllProfiles } from '../../ducks/profile/profileActions'
import { isLoadingSelector, userProfilesSelector } from '../../ducks/profile/profileSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'
import ProfileItem from '../../components/Profile/ProfileItem/ProfileItem'

const ProfilesPage = ({ getAllProfiles, profiles, isLoading }) => {
  useEffect(() => {
    getAllProfiles()
  }, [getAllProfiles])

  if (isLoading || !profiles) return <Spinner />

  return (
    <section className="container">
      <h1 className="large text-primary">Users</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>

      <div className="profiles">
        {profiles ? (
          profiles.map((profile) => <ProfileItem profile={profile} key={profile._id} />)
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </section>
  )
}

export default connect(
  (state) => ({
    isLoading: isLoadingSelector(state),
    profiles: userProfilesSelector(state)
  }),
  { getAllProfiles }
)(ProfilesPage)
