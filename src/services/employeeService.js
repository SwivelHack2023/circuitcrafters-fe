import axios from '../utils/axiosInstance'

export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post('user', employeeData)
    return response.data
  } catch (error) {
    throw new Error('Failed to add employee.')
  }
}

export const fetchEmployees = async () => {
  try {
    const response = await axios.get('user/list')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch employees')
  }
}

export const editEmployee = async (employeeData) => {
  try {
    const response = await axios.post('employee', employeeData)
    return response.data
  } catch (error) {
    throw new Error('Failed to add employee')
  }
}

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`employee/${id}`)
  } catch (error) {
    throw new Error(`Failed to delete employee with id ${id}`)
  }
}
