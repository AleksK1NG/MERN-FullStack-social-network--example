import { fromJS } from 'immutable'
import {
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  GET_POST_BY_ID_ERROR,
  GET_POST_BY_ID_SUCCESS,
  GET_POSTS_ERROR,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS
} from './postConstants'
import { GET_PROFILE_BY_ID_ERROR } from '../profile/profileConstants'

/**
 * Reducer
 * */
export const ReducerRecord = fromJS({
  posts: null,
  post: null,
  error: null,
  isLoading: true
})

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action

  switch (type) {
    case GET_POSTS_REQUEST:
      return state.set('isLoading', true)

    case GET_POSTS_SUCCESS:
      return state
        .set('posts', fromJS(payload.data))
        .set('isLoading', false)
        .set('error', null)

    case GET_POST_BY_ID_SUCCESS:
      return state
        .set('post', fromJS(payload.data))
        .set('isLoading', false)
        .set('error', null)

    case CREATE_POST_SUCCESS:
      return state
        .update('posts', (posts) => posts.unshift(fromJS(payload.data)))
        .set('isLoading', false)
        .set('error', null)

    case DELETE_POST_SUCCESS:
      return state
        .update('posts', (posts) => posts.filter((p) => p.get('_id') !== payload.postId))
        .set('isLoading', false)
        .set('error', null)

    case GET_POST_BY_ID_ERROR:
    case GET_POSTS_ERROR:
    case CREATE_POST_ERROR:
    case DELETE_POST_ERROR:
      return state.set('error', payload.error).set('isLoading', false)

    default:
      return state
  }
}
