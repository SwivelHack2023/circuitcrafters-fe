import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employee/employeeSlicer'
import jiraReducer from './jira/jiraSlicer'
import sonarReducer from './sonar/sonarSlicer'

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    jira: jiraReducer,
    sonar: sonarReducer,
  },
})

export default store
