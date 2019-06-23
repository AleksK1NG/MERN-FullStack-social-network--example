export const validatePostForm = (values) => {
  const errors = {}

  if (!values.text) {
    errors.text = 'Text is required !'
  }

  console.log('Login validate => ', errors)

  return errors
}
