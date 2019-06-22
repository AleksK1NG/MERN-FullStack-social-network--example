import { fromJS } from 'immutable'
import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from './postConstants'

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

    default:
      return state
  }
}
