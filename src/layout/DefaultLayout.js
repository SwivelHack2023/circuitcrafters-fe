import React, { useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const [sidebarShow, setSidebarShow] = useState(true)
  const [unfoldable, setUnfoldable] = useState(false)
  return (
    <div>
      <AppSidebar
        unfoldable={unfoldable}
        sidebarShow={sidebarShow}
        setSidebarShow={setSidebarShow}
        setUnfoldable={setUnfoldable}
      />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
