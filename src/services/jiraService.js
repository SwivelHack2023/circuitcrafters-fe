import axios from '../utils/axiosInstance'

export const fetchTasks = async () => {
  try {
    const response = await axios.get('jira/user')
    return response.data.data.issues
  } catch (error) {
    throw new Error('Failed to fetch tasks')
  }
}

export const fetchEmployeeTasks = async (email) => {
  try {
    const response = await axios.get(`jira/user/${email}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch tasks for employee')
  }
}
