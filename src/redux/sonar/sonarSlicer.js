import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'sonar',
  initialState: {
    matrix: [],
    employeeMatrix: [],
  },
  reducers: {
    loadSonar: (state, action) => {
      state.matrix = action.payload
    },
    loadEmployeeSonar: (state, action) => {
      state.employeeMatrix = action.payload
    },
  },
})

export const { loadSonar, loadEmployeeSonar } = counterSlice.actions

export default counterSlice.reducer
