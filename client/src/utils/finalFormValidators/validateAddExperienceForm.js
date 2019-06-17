export const validateAddExperienceForm = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is required !';
  }

  if (!values.company) {
    errors.company = 'Company is required !';
  }

  return errors;
};
