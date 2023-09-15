import React from 'react'

const Dashboard = React.lazy(() => import('../views/dashboard'))
const EngineerManagers = React.lazy(() => import('../views/engineerManagers'))
const Employees = React.lazy(() => import('../views/employees'))
const AddEditEmployees = React.lazy(() => import('../views/employees/addEdit'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/engineer-managers', name: 'Engineer Managers', element: EngineerManagers },
  { path: '/employees', name: 'Employees', element: Employees },
  { path: '/employees/add', name: 'Add', element: AddEditEmployees },
  { path: '/employees/edit/:id', name: 'Edit', element: AddEditEmployees },
]

export default routes
