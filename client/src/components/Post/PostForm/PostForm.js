import React from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../../ducks/post/postActions'
import { Form, Field } from 'react-final-form'
import { validatePostForm } from '../../../utils/finalFormValidators/validatePostForm'

const PostForm = ({ createPost }) => {
  const onSubmit = (values, formApi) => {
    console.log(' Create post values => ', values)
    createPost(values)
    formApi.reset()
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <Form
        validate={validatePostForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="form my-1">
            <Field name="text" component="textarea" type="text" label="Create a post">
              {({ input, meta }) => (
                <div>
                  <textarea {...input} className="textarea" placeholder="Create a post" cols="30" rows="5" />
                  {meta.touched && meta.error && <span className="help is-danger">{meta.error}</span>}
                </div>
              )}
            </Field>

            <input type="submit" className="btn btn-dark my-1" value="Submit" disabled={pristine || invalid} />
          </form>
        )}
      />
    </div>
  )
}

export default connect(
  null,
  { createPost }
)(PostForm)
