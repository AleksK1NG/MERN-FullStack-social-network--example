import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { validateAddExperienceForm } from '../../utils/finalFormValidators/validateAddExperienceForm'

const AddExperiencePage = () => {
  const onSubmit = (values, formApi) => {
    // createUserProfile(values)
    console.log(' Add education values => ', values)
    formApi.reset()
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any job positions that you have had in the past
      </p>
      <small>* = required field</small>

      <Form
        validate={validateAddExperienceForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="form">
            <Field name="title" component="input" type="text" label="* Job Title">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="* Job Title" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="company" component="input" type="text" label="* Company">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="* Company" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="location" component="input" type="text" label="Location">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Location" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="from" component="input" type="date" label="from">
              {({ input, meta }) => (
                <div className="form-group">
                  <h4>From Date</h4>
                  <input type="date" {...input} />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <div className="form-group">
              <p>
                <input type="checkbox" name="current" value="" /> Current Job
              </p>
            </div>

            <Field name="to" component="input" type="date" label="to">
              {({ input, meta }) => (
                <div className="form-group">
                  <h4>To Date</h4>
                  <input type="date" {...input} />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="description" component="textarea" type="text" label="Job Description">
              {({ input, meta }) => (
                <div className="field">
                  <textarea {...input} className="textarea" placeholder="Job Description" cols="30" rows="5" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <input type="submit" className="btn btn-primary my-1" disabled={pristine || invalid} />
            <Link to="/dashboard" className="btn btn-light my-1">
              Go Back
            </Link>
          </form>
        )}
      />
    </section>
  )
}

export default AddExperiencePage
