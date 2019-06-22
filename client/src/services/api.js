import axios from 'axios'
/*
 * Api Service
 * */


const CURRENT_USER_PROFILE_URL = '/api/v1/profile/me'
const PROFILES_URL = '/api/v1/profile'
const USER_PROFILE_URL = '/api/v1/profile/user'
const PROFILE_URL = '/api/v1/profile/user'
const CREATE_PROFILE_URL = '/api/v1/profile'
const GITHUB_REPOS_API_URL = '/api/v1/profile/github'
const PROFILE_EXPERIENCE_URL = '/api/v1/profile/experience'
const PROFILE_EDUCATION_URL = '/api/v1/profile/education'

const USER_REGISTER_URL = '/api/v1/auth/register'
const USER_LOGIN_URL = '/api/v1/auth/login'
const LOAD_USER_URL = '/api/v1/auth/me'

// Axios Instance
const axiosInstance = axios.create({
  timeout: 3000
})

// Runs before every request
axiosInstance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('mern-dev') || ''

    if (token && token !== '') {
      config.headers['x-auth-token'] = token
    }
    return config
  },
  function(err) {
    return Promise.reject(err)
  }
)

class ApiService {
  registerUser(userData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axios.post(USER_REGISTER_URL, userData, config)
  }

  loginUser(userData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axios.post(USER_LOGIN_URL, userData, config)
  }

  loadUser() {
    return axiosInstance.get(LOAD_USER_URL)
  }

  getCurrentUserProfile() {
    return axiosInstance.get(CURRENT_USER_PROFILE_URL)
  }
  //
  // createAndUpdateUserProfile(profileData) {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //
  //   return axiosInstance.post(PROFILES_URL, profileData, config)
  // }

  createUserProfile(profileData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.post(PROFILES_URL, profileData, config)
  }

  updateUserProfile(profileData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.patch(PROFILES_URL, profileData, config)
  }

  addExperience(formData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.put(PROFILE_EXPERIENCE_URL, formData, config)
  }

  addEducation(formData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.put(PROFILE_EDUCATION_URL, formData, config)
  }

  deleteEducation(eduId) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.delete(`${PROFILE_EDUCATION_URL}/${eduId}`, config)
  }

  deleteExperience(expId) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.delete(`${PROFILE_EXPERIENCE_URL}/${expId}`, config)
  }

  deleteProfile() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.delete(PROFILE_URL, config)
  }

  getAllUsersProfiles() {
    return axios.get(PROFILES_URL)
  }

  getUserProfileById(profileId) {
    return axios.get(`${PROFILE_URL}/${profileId}`)
  }

  getGithubRepos(username) {
    return axios.get(`${GITHUB_REPOS_API_URL}/${username}`)
  }
}

export default new ApiService()
