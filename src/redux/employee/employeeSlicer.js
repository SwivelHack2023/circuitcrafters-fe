import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
  },
  reducers: {
    loadEmployees: (state, action) => {
      state.employees = action.payload
    },
  },
})

export const { loadEmployees } = employeeSlice.actions

export default employeeSlice.reducer
