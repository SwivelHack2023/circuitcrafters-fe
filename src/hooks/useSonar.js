import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loadEmployeeSonar, loadSonar } from 'src/redux/sonar/sonarSlicer'
import { fetchEmployeeMatrix, fetchMatrix } from 'src/services/sonarService'

export const useFetchMatrix = () => {
  const dispatch = useDispatch()
  return useQuery('fetch-matrix', fetchMatrix, {
    onSuccess: async (data) => {
      dispatch(loadSonar(data))
    },
    onError: async (error) => {
      toast.error('Failed to fetch employees 😲')
    },
    staleTime: 10000, // 10 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

export const useFetchEmployeeMatrix = (email) => {
  const dispatch = useDispatch()
  return useQuery(
    'fetch-employee-matrix',
    () => {
      fetchEmployeeMatrix(email)
    },
    {
      onSuccess: async (data) => {
        dispatch(loadSonar(data))
      },
      onError: async (error) => {
        toast.error('Failed to fetch employees 😲')
      },
      staleTime: 10000, // 10 seconds
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  )
}
