import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loadEmployeeTasks, loadTasks } from 'src/redux/jira/jiraSlicer'
import { fetchEmployeeTasks, fetchTasks } from 'src/services/jiraService'

export const useFetchTasks = () => {
  const dispatch = useDispatch()
  return useQuery('fetch-tasks', fetchTasks, {
    onSuccess: async (data) => {
      dispatch(loadTasks(data))
    },
    onError: async (error) => {
      toast.error('Failed to fetch employees 😲')
    },
    staleTime: 10000, // 10 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useFetchEmployeeTasks = (email) => {
  const dispatch = useDispatch()
  return useQuery('fetch-employee-tasks', fetchEmployeeTasks(email), {
    onSuccess: async (data) => {
      dispatch(loadTasks(data))
    },
    onError: async (error) => {
      toast.error('Failed to fetch employees 😲')
    },
    staleTime: 10000, // 10 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}
