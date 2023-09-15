import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'jira',
  initialState: {
    tasks: [],
    employeeTasks: [],
    bugCount: 0,
    storyCount: 0,
    estimatedTimeSum: 0,
    progressTimeSum: 0,
    totalTimeSum: 0,
    percentSum: 0,
    bugPercentage: 0,
    storyPercentage: 0,
  },
  reducers: {
    loadTasks: (state, action) => {
      state.tasks = action.payload
      // Initialize counters and sums
      let bugCount = 0
      let storyCount = 0
      let estimatedTimeSum = 0
      let progressTimeSum = 0
      let totalTimeSum = 0
      let percentSum = 0

      // Iterate over the tasks
      action.payload.forEach((item) => {
        if (item.issueName === 'Bug') {
          bugCount++
        } else if (item.issueName === 'Story') {
          storyCount++
        }

        // Convert strings to numbers for calculations
        const estimatedTime = parseInt(item.estimatedTime)
        const progressTime = parseInt(item.progressTime)
        const totalTime = parseInt(item.totalTime)
        const percent = parseInt(item.percent)

        estimatedTimeSum += estimatedTime
        progressTimeSum += progressTime
        totalTimeSum += totalTime
        percentSum += percent
      })

      // Calculate averages and update state
      state.bugCount = bugCount
      state.storyCount = storyCount
      state.estimatedTimeSum = estimatedTimeSum / action.payload.length
      state.progressTimeSum = progressTimeSum / action.payload.length
      state.totalTimeSum = totalTimeSum / action.payload.length
      state.percentSum = percentSum / action.payload.length
      // Calculate bug and story percentages
      state.bugPercentage = (bugCount / (bugCount + storyCount)) * 100
      state.storyPercentage = (storyCount / (bugCount + storyCount)) * 100

      // Format the percentages to have exactly two decimal places
      state.bugPercentage = state.bugPercentage.toFixed(2)
      state.storyPercentage = state.storyPercentage.toFixed(2)
    },
    loadEmployeeTasks: (state, action) => {
      state.employeeTasks = action.payload
    },
  },
})

export const { loadTasks, loadEmployeeTasks } = counterSlice.actions

export default counterSlice.reducer
