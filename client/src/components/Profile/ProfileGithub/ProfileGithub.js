import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { reposSelector, userProfilesSelector } from '../../../ducks/profile/profileSelectors'
import { getGithubRepos } from '../../../ducks/profile/profileActions'
import Spinner from '../../Shared/Spinner/Spinner'

const ProfileGithub = ({ repos }) => {
  if (repos) {
    console.log('ProfileGithub render repos => ', repos)
  }

  if (!repos) return <h2>No repositories for this user </h2>

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos ? repos.length : 'no repos'}

      {repos &&
        repos.map((r) => (
          <div className="repo bg-white p-1 my-1" key={r.id}>
            <h2>{r.name}</h2>
          </div>
        ))}
    </div>
  )
}

export default connect(
  (state) => ({
    repos: reposSelector(state),
    profile: userProfilesSelector(state)
  }),
  { getGithubRepos }
)(ProfileGithub)
