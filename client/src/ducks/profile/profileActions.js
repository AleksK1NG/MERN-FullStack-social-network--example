/**
 * Action Creators
 * */
import {
  ADD_EDUCATION_REQUEST,
  ADD_EXPERIENCE_REQUEST,
  CREATE_PROFILE_REQUEST,
  GET_CURRENT_PROFILE_REQUEST,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILES_REQUEST,
  GET_REPOS_REQUEST,
  UPDATE_PROFILE_REQUEST
} from './profileConstants';

export const getProfiles = () => {
  return {
    type: GET_PROFILES_REQUEST
  };
};

export const getProfileById = (profileId) => {
  return {
    type: GET_PROFILE_BY_ID_REQUEST,
    payload: { profileId }
  };
};

export const getCurrentProfile = () => {
  return {
    type: GET_CURRENT_PROFILE_REQUEST
  };
};

export const updateUserProfile = (profileData) => {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: { profileData }
  };
};

export const getRepos = (githubId) => {
  return {
    type: GET_REPOS_REQUEST,
    payload: { githubId }
  };
};

export const createUserProfile = (profileData) => {
  return {
    type: CREATE_PROFILE_REQUEST,
    payload: { profileData }
  };
};

export const addEducation = (eduData) => {
  return {
    type: ADD_EDUCATION_REQUEST,
    payload: { eduData }
  };
};

export const addExperience = (expData) => {
  return {
    type: ADD_EXPERIENCE_REQUEST,
    payload: { expData }
  };
};