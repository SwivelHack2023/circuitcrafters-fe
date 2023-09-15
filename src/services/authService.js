import axios from 'axios'

const apiUrl = 'http://35.154.198.74:5000/taimurain/api/v1'

export async function fetchAccessToken() {
  try {
    const response = await axios.post(`${apiUrl}/auth`)
    // Save the access token and refresh token in local storage
    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    return response.data.accessToken
  } catch (error) {
    // Handle login error
    console.error(error)
    throw new Error('Failed to fetch access token')
  }
}

export function getAccessToken() {
  // Retrieve the access token from local storage
  return localStorage.getItem('accessToken')
}

export function getRole() {
  // Retrieve the access token from local storage
  return localStorage.getItem('role')
}

export function isAccessTokenExpired() {
  const accessToken = getAccessToken()
  if (!accessToken) {
    return true // Access token does not exist, consider it expired
  }

  const tokenParts = accessToken.split('.')
  if (tokenParts.length !== 3) {
    return true // Invalid access token format, consider it expired
  }

  const payload = JSON.parse(atob(tokenParts[1]))
  const expirationTime = payload.exp * 1000 // Convert expiration time to milliseconds
  const currentTime = Date.now()

  return currentTime > expirationTime
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) {
    // If refresh token does not exist, clear the access token as well
    logout()
    // Refresh token not found, handle the error
    throw new Error('Refresh token not found')
  }

  try {
    const response = await axios.post(`${apiUrl}/auth/refresh-token`, {
      refreshToken,
    })
    const { accessToken } = response.data

    // Save the new access token in local storage
    localStorage.setItem('accessToken', accessToken)

    return { accessToken }
  } catch (error) {
    // If refresh token expired, clear both tokens
    logout()
    // Handle refresh token error
    throw new Error('Failed to refresh access token')
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${apiUrl}/user/login`, {
      email,
      password,
    })

    // Save the access token and refresh token in local storage
    localStorage.setItem('accessToken', response.data.token)
    localStorage.setItem('refreshToken', response.data.token)
    localStorage.setItem('role', response.data.userType)
    localStorage.setItem('name', response.data.name)
    localStorage.setItem('email', response.data.email)
    return response.data.accessToken
  } catch (error) {
    // Handle login error
    console.error(error)
    throw new Error('Login failed. Please check your credentials.')
  }
}

export function logout() {
  // Remove the access token and refresh token from local storage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('role')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
}
