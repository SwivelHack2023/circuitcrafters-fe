import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import PropTypes from 'prop-types'
// sidebar nav config
import { adminNav, developerNav } from '../routes/nav'
import { getRole } from 'src/services/authService'

const AppSidebar = (props) => {
  const { unfoldable, sidebarShow, setSidebarShow, setUnfoldable } = props
  const role = getRole()
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={() => {
        setSidebarShow(sidebarShow)
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={role === 'ADMIN' ? adminNav : developerNav} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          setUnfoldable(!unfoldable)
        }}
      />
    </CSidebar>
  )
}

AppSidebar.propTypes = {
  unfoldable: PropTypes.bool.isRequired,
  sidebarShow: PropTypes.bool.isRequired,
  setSidebarShow: PropTypes.func.isRequired,
  setUnfoldable: PropTypes.func.isRequired,
  // Add PropTypes for other props as needed
}

export default React.memo(AppSidebar)
