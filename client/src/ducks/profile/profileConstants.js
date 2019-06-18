/**
 * Constants
 * */
import { appName } from '../../config';

export const moduleName = 'profile';
const prefix = `${appName}/${moduleName}`;

export const GET_CURRENT_PROFILE_REQUEST = `${prefix}/GET_CURRENT_PROFILE_REQUEST`;
export const GET_CURRENT_PROFILE_SUCCESS = `${prefix}/GET_CURRENT_PROFILE_SUCCESS`;
export const GET_CURRENT_PROFILE_ERROR = `${prefix}/GET_CURRENT_PROFILE_ERROR`;

export const GET_PROFILE_BY_ID_REQUEST = `${prefix}/GET_PROFILE_BY_ID_REQUEST`;
export const GET_PROFILE_BY_ID_SUCCESS = `${prefix}/GET_PROFILE_BY_ID_SUCCESS`;
export const GET_PROFILE_BY_ID_ERROR = `${prefix}/GET_PROFILE_BY_ID_ERROR`;

export const GET_PROFILES_REQUEST = `${prefix}/GET_PROFILES_REQUEST`;
export const GET_PROFILES_SUCCESS = `${prefix}/GET_PROFILES_SUCCESS`;
export const GET_PROFILES_ERROR = `${prefix}/GET_PROFILES_ERROR`;

export const UPDATE_PROFILE_REQUEST = `${prefix}/UPDATE_PROFILE_REQUEST`;
export const UPDATE_PROFILE_SUCCESS = `${prefix}/UPDATE_PROFILE_SUCCESS`;
export const UPDATE_PROFILE_ERROR = `${prefix}/UPDATE_PROFILE_ERROR`;

export const CLEAR_PROFILE_SUCCESS = `${prefix}/CLEAR_PROFILE_SUCCESS`;

export const GET_REPOS_REQUEST = `${prefix}/GET_REPOS_REQUEST`;
export const GET_REPOS_SUCCESS = `${prefix}/GET_REPOS_SUCCESS`;
export const GET_REPOS_ERROR = `${prefix}/GET_REPOS_ERROR`;

export const CREATE_PROFILE_REQUEST = `${prefix}/CREATE_PROFILE_REQUEST`;
export const CREATE_PROFILE_SUCCESS = `${prefix}/CREATE_PROFILE_SUCCESS`;
export const CREATE_PROFILE_ERROR = `${prefix}/CREATE_PROFILE_ERROR`;

export const ADD_EDUCATION_REQUEST = `${prefix}/ADD_EDUCATION_REQUEST`;
export const ADD_EDUCATION_SUCCESS = `${prefix}/ADD_EDUCATION_SUCCESS`;
export const ADD_EDUCATION_ERROR = `${prefix}/ADD_EDUCATION_ERROR`;

export const ADD_EXPERIENCE_REQUEST = `${prefix}/ADD_EXPERIENCE_REQUEST`;
export const ADD_EXPERIENCE_SUCCESS = `${prefix}/ADD_EXPERIENCE_SUCCESS`;
export const ADD_EXPERIENCE_ERROR = `${prefix}/ADD_EXPERIENCE_ERROR`;