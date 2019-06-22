import React, { Fragment, memo } from 'react'

const ProfileAbout = ({ profile }) => {
  console.log('profile user => ', profile.user)
  return (
    <div className="profile-about bg-light p-2">
      {profile.bio && (
        <Fragment>
          {profile.user && <h2 className="text-primary">{profile.user.name}'s Bio</h2>}
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

export default memo(ProfileAbout)
