import axios from 'axios'
import { getUserSession, removeUserSessionWhenExpired } from '../user-func'

const ApiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  responseType: 'json'
})

const userSession = getUserSession()

ApiService.defaults.timeout = 30000
ApiService.defaults.headers.common['Authorization'] = userSession ? 'Bearer ' + userSession['token'] : ''
ApiService.defaults.headers.post['Content-Type'] = 'application/json'
ApiService.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      // removeUserSessionWhenExpired()
      return Promise.reject(error.response.data?.message)
    }
    return Promise.reject(error)
  }
)

export default ApiService