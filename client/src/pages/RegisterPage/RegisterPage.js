import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { validateRegister } from '../../utils/finalFormValidators/validateRegisterForm'
import { registerUser } from '../../ducks/auth/authActions'

const RegisterPage = ({ registerUser }) => {
  const onSubmit = (values, formApi) => {
    console.log('Register form =>', values)
    const { name, email, password } = values
    const newUser = { name, email, password }
    registerUser(newUser)

    formApi.reset()
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <Form
        validate={validateRegister}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="form">
            <Field name="name" component="input" type="text" label="Name">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Name" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="email" component="input" type="text" label="Email">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Email Address" />
                  <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
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

            <Field name="password2" component="input" type="password" label="Confirm Password">
              {({ input, meta }) => (
                <div className="form-group">
                  <input type="text" {...input} placeholder="Confirm Password" minLength="6" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <input type="submit" className="btn btn-primary" disabled={pristine || invalid} />
          </form>
        )}
      />

      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  )
}

export default connect(
  null,
  { registerUser }
)(RegisterPage)
