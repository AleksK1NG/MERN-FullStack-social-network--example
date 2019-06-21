import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { validateAddEducationForm } from '../../utils/finalFormValidators/validateAddEducationForm'
import { addEducation } from '../../ducks/profile/profileActions'

const AddEducationPage = ({ addEducation }) => {
  const [disableDate, setDisableDate] = useState(false)

  const onSubmit = (values, formApi) => {
    addEducation(values)
    console.log(' Add education values => ', values)
    formApi.reset()
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you have
      </p>
      <small>* = required field</small>

      <Form
        initialValues={{current: false}}
        validate={validateAddEducationForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="form">
            <Field name="school" component="input" type="text" label="* School or Bootcamp">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="* School or Bootcamp" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="degree" component="input" type="text" label="* Degree or Certificate">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="* Degree or Certificate" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="fieldofstudy" component="input" type="text" label="Field Of Study">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Field Of Study" />
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


              <Field name="current" component="input" type="checkbox" label="to">
                {({ input, meta }) => (
                  <p onClick={() => setDisableDate(!disableDate)}>
                    <input
                      checked={disableDate}
                      type="checkbox"
                      {...input}
                    />{' '}
                    Current School or Bootcamp
                    {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                  </p>
                )}
              </Field>

            {!disableDate && (
              <Field name="to" component="input" type="date" label="to">
                {({ input, meta }) => (
                  <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" {...input} disabled={disableDate} />
                    {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                  </div>
                )}
              </Field>
            )}

            <Field name="description" component="textarea" type="text" label="Program Description">
              {({ input, meta }) => (
                <div className="field">
                  <textarea {...input} className="textarea" placeholder="Program Description" cols="30" rows="5" />
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

export default connect(
  null,
  { addEducation }
)(AddEducationPage)
