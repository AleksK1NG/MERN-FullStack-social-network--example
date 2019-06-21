import React, { useEffect } from 'react'
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

const ProfilePage = ({ profile, isLoading, repos, getProfileById, match, profileOwner }) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  if (isLoading || !profile) return <Spinner />

  return (
    <section className="container">
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>

      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src="https://www.gravatar.com/avatar/0312d0d39585741666c19c217ed769f7?s=200&r=pg&d=mm"
            alt="Image"
          />
          <h1 className="large">Alexander Bryksin</h1>
          <p className="lead">Developer at Google</p>
          <p>Seattle, WA</p>
          <div className="icons my-1">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>

        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">John's Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed doloremque nesciunt, repellendus nostrum
            deleniti recusandae nobis neque modi perspiciatis similique?
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            <div className="p-1">
              <i className="fa fa-check"></i> React
            </div>
            <div className="p-1">
              <i className="fa fa-check"></i> Vue
            </div>
            <div className="p-1">
              <i className="fa fa-check"></i> JavaScript
            </div>
            <div className="p-1">
              <i className="fa fa-check"></i> TypeScript
            </div>
            <div className="p-1">
              <i className="fa fa-check"></i> Go
            </div>
          </div>
        </div>

        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          <div>
            <h3 className="text-dark">Google</h3>
            <p>Oct 2017 - Current</p>
            <p>
              <strong>Position: </strong>Senior Developer
            </p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
              placeat, dolorum ullam ipsam, sapiente suscipit dicta eius velit amet aspernatur asperiores modi quidem
              expedita fugit.
            </p>
          </div>
          <div>
            <h3 className="text-dark">Sun Microsystems</h3>
            <p>Nov 20010 - Nov 2017</p>
            <p>
              <strong>Position: </strong>Developer
            </p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
              placeat, dolorum ullam ipsam, sapiente suscipit dicta eius velit amet aspernatur asperiores modi quidem
              expedita fugit.
            </p>
          </div>
        </div>

        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          <div>
            <h3>MADI</h3>
            <p>Sep 2005 - June 2010</p>
            <p>
              <strong>Degree: </strong>Masters
            </p>
            <p>
              <strong>Field Of Study: </strong>Computer Science
            </p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
              placeat, dolorum ullam ipsam, sapiente suscipit dicta eius velit amet aspernatur asperiores modi quidem
              expedita fugit.
            </p>
          </div>
        </div>

        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo One
                </a>
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Repo Two
                </a>
              </h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 777</li>
                <li className="badge badge-dark">Watchers: 121</li>
                <li className="badge badge-light">Forks: 125</li>
              </ul>
            </div>
          </div>
        </div>
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
  { getProfileById }
)(ProfilePage)
