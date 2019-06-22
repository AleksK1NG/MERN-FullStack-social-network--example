import React, { memo } from 'react'

const ProfileGithub = ({ repos }) => {
  if (!repos) return <h2>No repositories for this user </h2>

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>

      {repos &&
        repos.map((r) => (
          <div className="repo bg-white p-1 my-1" key={r.id}>
            <div>
              <h4>
                <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                  {r.name}
                </a>
              </h4>
              <p>{r.description}</p>
            </div>

            <div>
              <ul>
                <li className="badge badge-primary">Stars: {r.stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {r.watchers_count}</li>
                <li className="badge badge-light">Forks: {r.forks_count}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  )
}

export default memo(ProfileGithub)
