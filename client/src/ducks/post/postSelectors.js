import { moduleName } from './postConstants'
import { createSelector } from 'reselect'

export const stateSelector = (state) => state[moduleName]

export const postsSelector = createSelector(
  stateSelector,
  (state) => {
    const posts = state.get('posts')
    return posts ? posts.toJS() : null
  }
)

export const postSelector = createSelector(
  stateSelector,
  (state) => {
    const post = state.get('post')
    return post ? post.toJS() : null
  }
)

export const isLoadingSelector = createSelector(stateSelector, state => state.get('isLoading'))