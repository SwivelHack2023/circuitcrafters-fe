import React from 'react'
import { CContainer, CHeader, CHeaderDivider, CHeaderNav, CHeaderToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import PropTypes from 'prop-types'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = (props) => {
  const { sidebarShow, setSidebarShow } = props

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => setSidebarShow(!sidebarShow)}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}
AppHeader.propTypes = {
  sidebarShow: PropTypes.bool.isRequired,
  setSidebarShow: PropTypes.func.isRequired,
  // Add PropTypes for other props as needed
}
export default AppHeader
