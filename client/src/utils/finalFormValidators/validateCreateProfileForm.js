import { emailIsValid } from './validationHelpers';

export const validateCreateProfileForm = (values) => {
  const errors = {};

  if (!values.status) {
    errors.status = 'Status is required !';
  }

  if (!values.skills) {
    errors.skills = 'Skills is required !';
  }

  // if (values.email && !emailIsValid(values.email)) {
  //   errors.email = 'Invalid email !';
  // }

  // if (values.avatar && !checkURL(values.avatar)) {
  //   errors.avatar = 'Invalid avatar URL !';
  // }

  // if (values.avatar && !is_url(values.avatar)) {
  //   errors.avatar = 'Invalid avatar URL !';
  // }

  return errors;
};
