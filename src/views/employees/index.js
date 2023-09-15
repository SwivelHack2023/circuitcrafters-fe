import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilExternalLink, cilPencil, cilPeople, cilPlus, cilTrash, cilUser } from '@coreui/icons'
import { useFetchEmployees } from 'src/hooks/useEmployees'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Employees = () => {
  const { isLoading } = useFetchEmployees()
  const { employees } = useSelector((state) => state.employee)
  const handleDelete = () => {}
  const navigate = useNavigate()
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol xs>
                <div className="float-end mb-3">
                  <CButton color="secondary" href="/employees/add">
                    <CIcon icon={cilPlus} className="mr-2" /> Add Employee
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs>
                {isLoading ? (
                  <></>
                ) : (
                  <CTable align="middle" className="mb-4 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell>User</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">User Type</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Github Name</CTableHeaderCell>
                        <CTableHeaderCell>Activity</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {employees.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CIcon icon={cilUser} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.name}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.userType.toLowerCase()}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.email}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item.githubName}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="warning" className="mx-2">
                              <CIcon size="lg" icon={cilPencil} />
                            </CButton>
                            <CButton color="danger" onClick={handleDelete(item)}>
                              <CIcon size="lg" icon={cilTrash} />
                            </CButton>
                            {item.userType !== 'ADMIN' && (
                              <CButton
                                color="primary"
                                className="mx-2"
                                onClick={() => {
                                  navigate(`/employees/view/${item.id}`)
                                }}
                              >
                                <CIcon size="lg" icon={cilExternalLink} />
                              </CButton>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                )}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Employees
