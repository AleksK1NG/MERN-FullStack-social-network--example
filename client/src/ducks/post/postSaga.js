// import { replace } from 'connected-react-router'
import { toast } from 'react-toastify'

import { takeEvery, call, put, all } from 'redux-saga/effects'
import { rejectError } from '../../utils/rejectErrorHelper'
import api from '../../services/api'

import {
  CREATE_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS, DELETE_POST_ERROR, DELETE_POST_REQUEST, DELETE_POST_SUCCESS,
  GET_POST_BY_ID_REQUEST,
  GET_POSTS_ERROR,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS
} from './postConstants'
import { GET_PROFILE_BY_ID_ERROR, GET_PROFILE_BY_ID_SUCCESS } from '../profile/profileConstants'
import { replace } from "connected-react-router"

/**
 * Sagas
 */

export function* getPostsSaga() {
  try {
    const { data } = yield call(api.getAllPosts)

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

export function* getPostByIdSaga({ payload }) {
  try {
    const { data } = yield call(api.getPostById, payload.postId)

    yield put({
      type: GET_PROFILE_BY_ID_SUCCESS,
      payload: { data }
    })
    debugger
  } catch (error) {
    console.log(error)
    yield put({
      type: GET_PROFILE_BY_ID_ERROR,
      payload: { error }
    })
    toast.error(rejectError(error))
  }
}

export function* createPostSaga({ payload }) {
  try {
    const { data } = yield call(api.createPost, payload.postData)

    yield put({
      type: CREATE_POST_SUCCESS,
      payload: { data }
    })
    debugger

    toast.success('Post created ! =D')
    // yield put(replace('/dashboard'))
  } catch (error) {
    console.log(error)
    yield put({
      type: CREATE_POST_ERROR,
      payload: { error }
    })
    toast.error(rejectError(error))
  }
}

export function* deletePostSaga({ payload }) {
  try {
    const { data } = yield call(api.deletePost, payload.postId)

    yield put({
      type: DELETE_POST_SUCCESS,
      payload: { data, postId: payload.postId }
    })
    debugger

    toast.success('Post Deleted ! =D')
    // yield put(replace('/dashboard'))
  } catch (error) {
    console.log(error)
    yield put({
      type: DELETE_POST_ERROR,
      payload: { error }
    })
    toast.error(rejectError(error))
  }
}



export function* saga() {
  yield all([
    takeEvery(GET_POSTS_REQUEST, getPostsSaga),
    takeEvery(GET_POST_BY_ID_REQUEST, getPostByIdSaga),
    takeEvery(CREATE_POST_REQUEST, createPostSaga),
    takeEvery(DELETE_POST_REQUEST, deletePostSaga),
  ])
}
