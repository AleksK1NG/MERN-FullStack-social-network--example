import { all } from 'redux-saga/effects';
import { saga as authSaga } from '../ducks/auth/authSaga';
import { saga as profileSaga } from '../ducks/profile/profileSaga';

export default function* rootSaga() {
  yield all([authSaga(), profileSaga()]);
}
