import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { validateLogin } from '../../utils/finalFormValidators/validateLoginForm'
import { loginUser } from '../../ducks/auth/authActions'

const LoginPage = ({ loginUser }) => {
  const onSubmit = (values, formApi) => {
    console.log('Login form =>', values)
    // loginUser(values)
    formApi.reset()
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into Your Account
      </p>

      <Form
        validate={validateLogin}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field name="email" component="input" type="text" label="Email">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Email Address" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password" component="input" type="password" label="Password">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Password" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <button type="submit" className="btn btn-primary" disabled={pristine || invalid}>
              Submit
            </button>
          </form>
        )}
      />

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  )
}
export default connect(
  null,
  { loginUser }
)(LoginPage)
