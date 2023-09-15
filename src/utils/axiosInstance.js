import axios from 'axios'
import { getAccessToken, isAccessTokenExpired, refreshAccessToken } from '../services/authService'

const apiUrl = 'http://35.154.198.74:5000/taimurain/api/v1'

const axiosInstance = axios.create({
  baseURL: apiUrl,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = getAccessToken()

    if (accessToken) {
      const isTokenExpired = isAccessTokenExpired()

      if (isTokenExpired) {
        // Refresh access token
        try {
          const response = await refreshAccessToken()
          accessToken = response.accessToken
        } catch (error) {
          // Handle error while refreshing access token
          console.error(error)
        }
      }
      config.headers['AccessToken'] = `${accessToken}`
    }

    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  },
)

export default axiosInstance
