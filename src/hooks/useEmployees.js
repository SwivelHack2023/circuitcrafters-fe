import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import {
  addEmployee,
  fetchEmployees,
  editEmployee,
  deleteEmployee,
} from '../services/employeeService'
import { useNavigate } from 'react-router-dom'
import { loadEmployees } from 'src/redux/employee/employeeSlicer'
import { useDispatch } from 'react-redux'

export const useAddEmployee = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(addEmployee, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries('fetch-employees')
      toast.success('Employee added successfully 👌')
      navigate('/employees')
    },
    onError: async (error) => {
      toast.error('Failed to add employee 😲')
    },
  })
}

export const useFetchEmployees = () => {
  const dispatch = useDispatch()
  return useQuery('fetch-employees', fetchEmployees, {
    onSuccess: async (data) => {
      dispatch(loadEmployees(data))
    },
    onError: async (error) => {
      toast.error('Failed to fetch employees 😲')
    },
    staleTime: 10000, // 10 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useEditEmployee = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(editEmployee, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries('fetch-employees')
      toast.success('Employee edited successfully 👌')
      navigate('/employees')
    },
    onError: async (error) => {
      toast.error('Failed to edit employee 😲')
    },
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => deleteEmployee(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('fetch-employees')
      toast.success('Employee deleted successfully 👌')
    },
    onError: async (error) => {
      toast.error('Failed to delete employee 😲')
    },
  })
}
