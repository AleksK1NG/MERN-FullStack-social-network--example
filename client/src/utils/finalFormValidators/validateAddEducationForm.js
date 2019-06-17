export const validateAddEducationForm = (values) => {
  const errors = {};

  if (!values.school) {
    errors.school = 'School or Bootcamp is required !';
  }

  if (!values.degree) {
    errors.degree = 'Degree is required !';
  }

  if (!values.fieldofstudy) {
    errors.fieldofstudy = 'Field of study is required !';
  }
  return errors;
};
