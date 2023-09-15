import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilGroup, cilSpeedometer /*cilUser*/ } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

export const adminNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Engineer Managers',
  //   to: '/engineer-managers',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Employees',
    to: '/employees',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
]

export const developerNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
]
