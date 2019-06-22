/**
 * Constants
 * */
import { appName } from '../../config'

export const moduleName = 'post'
const prefix = `${appName}/${moduleName}`

export const GET_POSTS_REQUEST = `${prefix}/GET_POSTS_REQUEST`
export const GET_POSTS_SUCCESS = `${prefix}/GET_POSTS_SUCCESS`
export const GET_POSTS_ERROR = `${prefix}/GET_POSTS_ERROR`
