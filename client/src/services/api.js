import axios from 'axios'
/*
 * Api Service
 * */

const USERS_URL = '/api/users'
const AUTH_URL = '/api/auth/'
const LOGIN_URL = '/api/auth/login'
const CURRENT_USER_PROFILE_URL = '/api/v1/profile/me'
const PROFILES_URL = '/api/profile'
const USER_PROFILE_URL = '/api/v1/profile/user'
const PROFILE_URL = '/api/v1/profile'
const GITHUB_REPOS_API_URL = '/api/profile/github'
const PROFILE_EXPERIENCE_URL = '/api/profile/experience'
const PROFILE_EDUCATION_URL = '/api/profile/education'

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

  createAndUpdateUserProfile(profileData) {
    debugger
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.post(PROFILES_URL, profileData, config)
  }

  createUserProfile(profileData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.post(PROFILE_URL, profileData, config)
  }

  updateUserProfile(profileData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosInstance.patch(PROFILE_URL, profileData, config)
  }

  addExperience(formData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axios.put(PROFILE_EXPERIENCE_URL, formData, config)
  }

  addEducation(formData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axios.put(PROFILE_EDUCATION_URL, formData, config)
  }
}

export default new ApiService()
