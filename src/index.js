import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <App />
    </QueryClientProvider>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
