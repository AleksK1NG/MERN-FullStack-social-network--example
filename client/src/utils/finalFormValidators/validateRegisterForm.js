import { emailIsValid } from './validationHelpers';

export const validateRegister = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required !';
  }

  if (!values.name) {
    errors.name = 'Name is required !';
  }

  if (values.name && values.name.trim().length < 6) {
    errors.name = 'Name length must be greater then 6 characters';
  }

  if (!values.password) {
    errors.password = 'Password is required !';
  }
  if (!values.password2) {
    errors.password2 = 'Password Confirmation is required !';
  }

  if (values.password && values.password.trim().length < 6) {
    errors.password = 'Password length must be greater then 6 characters';
  }

  if (values.password2 && values.password2.trim().length < 6) {
    errors.password2 = 'Password length must be greater then 6 characters';
  }

  if (values.password2 && values.password2.trim() !== values.password.trim()) {
    errors.password2 = 'Password and password confirmation must be equal';
  }

  if (values.email && !emailIsValid(values.email)) {
    errors.email = 'Invalid email !';
  }

  // if (values.avatar && !checkURL(values.avatar)) {
  //   errors.avatar = 'Invalid avatar URL !';
  // }

  // if (values.avatar && !is_url(values.avatar)) {
  //   errors.avatar = 'Invalid avatar URL !';
  // }

  return errors;
};
