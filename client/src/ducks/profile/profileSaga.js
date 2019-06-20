// import { replace } from 'connected-react-router';
import { toast } from 'react-toastify';

import { takeEvery, call, put, all } from 'redux-saga/effects';
import { rejectError } from '../../utils/rejectErrorHelper';
import api from '../../services/api';

import {
  ADD_EDUCATION_ERROR,
  ADD_EDUCATION_REQUEST,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE_ERROR,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  CREATE_PROFILE_ERROR,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_CURRENT_PROFILE_ERROR,
  GET_CURRENT_PROFILE_REQUEST,
  GET_CURRENT_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS
} from './profileConstants';

/**
 * Sagas
 */

export function* getCurrentUserProfileSaga() {
  try {
    const { data } = yield call(api.getCurrentUserProfile);

    yield put({
      type: GET_CURRENT_PROFILE_SUCCESS,
      payload: { data }
    });


  } catch (error) {
    console.error(error);
    yield put({
      type: GET_CURRENT_PROFILE_ERROR,
      payload: { error }
    });
  }
}

export function* createUserProfileSaga(action) {
  const {
    payload: { profileData }
  } = action;


  try {
    const { data } = yield call(api.createUserProfile, profileData);

    yield put({
      type: CREATE_PROFILE_SUCCESS,
      payload: { data }
    });

    toast.success('Success ! =D');
  } catch (error) {
    console.log(error);
    yield put({
      type: CREATE_PROFILE_ERROR,
      payload: { error }
    });
    toast.error(rejectError(error));
  }
}

export function* updateUserProfileSaga(action) {
  const {
    payload: { profileData }
  } = action;
  debugger;
  try {
    const { data } = yield call(api.createAndUpdateUserProfile, profileData);
    debugger;
    yield put({
      type: UPDATE_PROFILE_SUCCESS,
      payload: { data }
    });
    toast.success('Success ! =D');
  } catch (error) {
    console.log(error);
    yield put({
      type: UPDATE_PROFILE_ERROR,
      payload: { error }
    });
    toast.error(rejectError(error));
  }
}

export function* addEducationSaga(action) {
  const {
    payload: { eduData }
  } = action;
  debugger;
  try {
    const { data } = yield call(api.addEducation, eduData);
    debugger;
    yield put({
      type: ADD_EDUCATION_SUCCESS,
      payload: { data }
    });
    toast.success('Success ! =D');
  } catch (error) {
    console.log(error);
    yield put({
      type: ADD_EDUCATION_ERROR,
      payload: { error }
    });
    toast.error(rejectError(error));
  }
}

export function* addExperienceSaga(action) {
  const {
    payload: { expData }
  } = action;
  debugger;
  try {
    const { data } = yield call(api.addExperience, expData);
    debugger;
    yield put({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: { data }
    });
    toast.success('Success ! =D');
  } catch (error) {
    console.log(error);
    yield put({
      type: ADD_EXPERIENCE_ERROR,
      payload: { error }
    });
    toast.error(rejectError(error));
  }
}

export function* saga() {
  yield all([
    takeEvery(GET_CURRENT_PROFILE_REQUEST, getCurrentUserProfileSaga),
    takeEvery(CREATE_PROFILE_REQUEST, createUserProfileSaga),
    takeEvery(UPDATE_PROFILE_REQUEST, updateUserProfileSaga),
    takeEvery(ADD_EDUCATION_REQUEST, addEducationSaga),
    takeEvery(ADD_EXPERIENCE_REQUEST, addExperienceSaga)
  ]);
}
