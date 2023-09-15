import React from 'react'
import { Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import DefaultLayout from 'src/layout/DefaultLayout'
import { isAccessTokenExpired } from 'src/services/authService'

function PrivateRoutes() {
  const auth = isAccessTokenExpired()
  // return auth ? (
  return !auth ? (
    <Suspense fallback={<div> Loading </div>}>
      <DefaultLayout />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoutes
