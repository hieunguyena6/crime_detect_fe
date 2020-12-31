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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data && (response.data.error_code === 401 || response.data.error_code === 403)) {
      removeUserSessionWhenExpired()
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default ApiService