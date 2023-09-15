import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

export const useLogin = () => {
  const navigate = useNavigate()
  return useMutation(login, {
    onSuccess: async (data) => {
      toast.success('Successfully Login 👌')
      navigate('/dashboard')
    },
    onError: async (error) => {
      toast.error('Login failed. Please check your credentials.')
    },
  })
}
