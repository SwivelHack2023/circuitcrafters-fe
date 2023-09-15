import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employee/employeeSlicer'

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
})

export default store
