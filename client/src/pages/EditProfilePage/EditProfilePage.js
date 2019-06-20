import React, { useState, Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { validateCreateProfileForm } from '../../utils/finalFormValidators/validateCreateProfileForm'
import { getCurrentUserProfile, updateUserProfile } from '../../ducks/profile/profileActions'
import { userProfileSelector } from '../../ducks/profile/profileSelectors'
import Spinner from '../../components/Shared/Spinner/Spinner'
import { categories } from '../../data/jobTitlesData'

const EditProfilePage = ({ updateUserProfile, userProfile, getCurrentUserProfile }) => {
  useEffect(() => {
    getCurrentUserProfile()
  }, [getCurrentUserProfile])
  const [showSocialInputs, setShowSocialInputs] = useState(false)

  const onSubmit = (values, formApi) => {
    updateUserProfile(values)
    formApi.reset()
  }

  if (!userProfile) return <Spinner />

  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your profile stand out
      </p>
      <small>* = required field</small>

      <Form
        initialValues={{
          company: userProfile.company || '',
          website: userProfile.website || '',
          location: userProfile.company || '',
          status: userProfile.location || '',
          skills: userProfile.status || '',
          githubusername: userProfile.githubusername || '',
          bio: userProfile.bio || '',
          twitter: userProfile.twitter || '',
          facebook: userProfile.facebook || '',
          linkedin: userProfile.linkedin || '',
          youtube: userProfile.youtube || '',
          instagram: userProfile.instagram || ''
        }}
        validate={validateCreateProfileForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="form">
            <Field name="status" component="select" type="text" label="Categories">
              {({ input, meta }) => (
                <div className="form-group">
                  <select {...input}>
                    <option value="category">* Select Professional Status</option>
                    {categories &&
                      categories.map((category, id) => (
                        <option value={category} key={id}>
                          {category}
                        </option>
                      ))}
                  </select>
                  <small className="form-text">Give us an idea of where you are at in your career</small>
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="company" component="input" type="text" label="Company">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Company" />
                  <small className="form-text">Could be your own company or one you work for</small>
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="website" component="input" type="text" label="Website">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Website" />
                  <small className="form-text">Could be your own or a company website</small>
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="location" component="input" type="text" label="Location">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Location" />
                  <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="skills" component="input" type="text" label="* Skills">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="* Skills" />
                  <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="githubusername" component="input" type="text" label="Github Username">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Github Username" />
                  <small className="form-text">
                    If you want your latest repos and a Github link, include your username
                  </small>
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="bio" component="textarea" type="text" label="A short bio of yourself">
              {({ input, meta }) => (
                <div className="field">
                  <textarea {...input} className="textarea" placeholder="A short bio of yourself" rows="3" />
                  <small className="form-text">Tell us a little about yourself</small>
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <div className="my-2">
              <button type="button" className="btn btn-light" onClick={() => setShowSocialInputs(!showSocialInputs)}>
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>

            {showSocialInputs && (
              <Fragment>
                <Field name="twitter" component="input" type="text" label="Twitter URL">
                  {({ input, meta }) => (
                    <div className="form-group social-input">
                      <i className="fab fa-twitter fa-2x"></i>
                      <input type="text" {...input} placeholder="Twitter URL" />
                      {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="facebook" component="input" type="text" label="Facebook URL">
                  {({ input, meta }) => (
                    <div className="form-group social-input">
                      <i className="fab fa-facebook fa-2x"></i>
                      <input type="text" {...input} placeholder="Facebook URL" />
                      {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="youtube" component="input" type="text" label="YouTube URL">
                  {({ input, meta }) => (
                    <div className="form-group social-input">
                      <i className="fab fa-youtube fa-2x"></i>
                      <input type="text" {...input} placeholder="YouTube URL" />
                      {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="linkedin" component="input" type="text" label="Linkedin URL">
                  {({ input, meta }) => (
                    <div className="form-group social-input">
                      <i className="fab fa-linkedin fa-2x"></i>
                      <input type="text" {...input} placeholder="Linkedin URL" />
                      {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="instagram" component="input" type="text" label="Instagram URL">
                  {({ input, meta }) => (
                    <div className="form-group social-input">
                      <i className="fab fa-instagram fa-2x"></i>
                      <input type="text" {...input} placeholder="Instagram URL" />
                      {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </Fragment>
            )}

            <input type="submit" className="btn btn-primary my-1" disabled={invalid} />
            <a className="btn btn-light my-1" href="dashboard.html">
              Go Back
            </a>
          </form>
        )}
      />
    </section>
  )
}

export default connect(
  (state) => ({
    userProfile: userProfileSelector(state)
  }),
  { updateUserProfile, getCurrentUserProfile }
)(EditProfilePage)
