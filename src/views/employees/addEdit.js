import { cilArrowThickFromRight, cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCol, CFormInput, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAddEmployee } from 'src/hooks/useEmployees'

function AddEditEmployees() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'DEVELOPER',
    githubName: '',
    repository: '',
  })

  const { mutate: addEmployeeMutation } = useAddEmployee()

  const handleSubmit = () => {
    const updatedEmployee = {
      ...employee,
      repository: employee.repository.split(',').map((repo) => repo.trim()),
    }

    if (
      !updatedEmployee.name ||
      !updatedEmployee.email ||
      !updatedEmployee.password ||
      !updatedEmployee.githubName
    ) {
      toast.error('Please fill in all required fields. 😲')
      return
    }
    console.log(updatedEmployee)
    addEmployeeMutation(updatedEmployee)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }))
  }

  let params = useParams()
  console.log(params.id)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol xs>
                <div className="float-end mb-3">
                  <CButton color="secondary" href="/employees">
                    <CIcon icon={cilArrowThickFromRight} className="mx-2" />
                    Back to Employee
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs>
                <CFormInput
                  type="text"
                  name="name"
                  floatingClassName="mb-3"
                  floatingLabel="Name"
                  placeholder="Full Name"
                  value={employee.name}
                  onChange={handleInputChange}
                />
                <CFormInput
                  type="email"
                  name="email"
                  floatingClassName="mb-3"
                  floatingLabel="Email address"
                  placeholder="name@example.com"
                  value={employee.email}
                  onChange={handleInputChange}
                />
                <CFormInput
                  type="password"
                  name="password"
                  floatingClassName="mb-3"
                  floatingLabel="Password"
                  placeholder="Password"
                  value={employee.password}
                  onChange={handleInputChange}
                />
                <CFormInput
                  type="text"
                  name="githubName"
                  floatingClassName="mb-3"
                  floatingLabel="GitHub Name"
                  placeholder="chamikara-swivel"
                  value={employee.githubName}
                  onChange={handleInputChange}
                />
                <CFormInput
                  type="text"
                  name="repository"
                  floatingClassName="mb-3"
                  floatingLabel="Repositories"
                  placeholder="repo-one,repo-two"
                  value={employee.repository}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs>
                <div className="float-end mb-3">
                  <CButton color="success" onClick={handleSubmit}>
                    <CIcon icon={cilSave} className="mx-2" />
                    Save
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEditEmployees
