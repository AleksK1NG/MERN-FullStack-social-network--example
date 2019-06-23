import React from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { addCommentToPost } from '../../../ducks/post/postActions'
import { validatePostForm } from '../../../utils/finalFormValidators/validatePostForm'

const CommentForm = ({ addCommentToPost }) => {
  const onSubmit = (values, formApi) => {
    console.log(' Create comment values => ', values)
    // addCommentToPost(values)
    // formApi.reset()
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>

      <Form
        validate={validatePostForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className="form my-1">
            <Field name="text" component="textarea" type="text" label="Comment on this post">
              {({ input, meta }) => (
                <div>
                  <textarea {...input} className="textarea" placeholder="Comment on this post" cols="30" rows="5" />
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
  { addCommentToPost }
)(CommentForm)
