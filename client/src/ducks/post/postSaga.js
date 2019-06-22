// import { replace } from 'connected-react-router'
import { toast } from 'react-toastify'

import { takeEvery, call, put, all } from 'redux-saga/effects'
import { rejectError } from '../../utils/rejectErrorHelper'
import api from '../../services/api'

import { GET_POSTS_ERROR, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from './postConstants'

/**
 * Sagas
 */

export function* getPostsSaga() {
  try {
    const { data } = yield call(api.registerUser)

    yield put({
      type: GET_POSTS_SUCCESS,
      payload: { data }
    })
    debugger
  } catch (error) {
    console.log(error)
    yield put({
      type: GET_POSTS_ERROR,
      payload: { error }
    })
    toast.error(rejectError(error))
  }
}

export function* saga() {
  yield all([takeEvery(GET_POSTS_REQUEST, getPostsSaga)])
}
