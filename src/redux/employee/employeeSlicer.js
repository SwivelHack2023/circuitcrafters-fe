import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
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

export const { loadEmployees } = counterSlice.actions

export default counterSlice.reducer
