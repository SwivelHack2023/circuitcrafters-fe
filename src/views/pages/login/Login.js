import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'
import { isAccessTokenExpired } from 'src/services/authService'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'src/hooks/useLogin'

const Login = () => {
  const auth = isAccessTokenExpired()
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: 'admin@gmail.com', password: 'admin123' })
  const { mutate: loginMutation } = useLogin()

  useEffect(() => {
    // Check if the user is already authenticated (logged in)
    if (!auth) {
      // Redirect to the dashboard
      navigate('/dashboard')
    }
  }, [auth, navigate])

  const handleLogin = () => {
    // Basic email validation using regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailPattern.test(user.email)) {
      toast.error('Please enter a valid email address. 😲')
      return
    }

    // Password validation (you can customize this as needed)
    if (user.password.length < 4) {
      toast.error('Password must be at least 4 characters long. 😲')
      return
    }

    loginMutation(user)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="user@email.com"
                        autoComplete="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton color="primary" className="px-4 float-end" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Taimurain</h2>
                    <br />
                    <p>
                      Taimurain is a powerful tool designed to streamline and centralize performance
                      metrics for software engineers in one convenient location. This app seamlessly
                      integrates with popular platforms such as GitHub, Jira, and Sorna Cloud to
                      provide a comprehensive view of engineer performance.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
