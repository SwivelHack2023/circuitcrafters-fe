import axios from '../utils/axiosInstance'

export const fetchMatrix = async () => {
  try {
    const response = await axios.get('sonar/repo/matrix')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch employees')
  }
}

export const fetchEmployeeMatrix = async (email) => {
  try {
    if (email) {
      const response = await axios.get(`sonar/repo/matrix/${email}`)
      return response.data
    }
  } catch (error) {
    throw new Error('Failed to fetch employees')
  }
}
