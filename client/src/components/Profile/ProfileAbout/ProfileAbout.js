import React, { Fragment } from 'react'

const ProfileAbout = ({ profile }) => {
  debugger
  return (
    <div className="profile-about bg-light p-2">
      {profile.bio && (
        <Fragment>
          <h2 className="text-primary">{profile.githubusername}s Bio</h2>
          <p>{profile.bio}</p>
          <div className="line" />
        </Fragment>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileAbout
