import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2023 Taimurain.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by Circuit Crafters</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
