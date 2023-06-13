import { AuthProvider } from 'react-admin'
import axios from 'axios'

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: username,
        password,
        role: 'admin',
        chiefKey: import.meta.env.VITE_CHIEF_ADMIN_PASSWORD,
      })

      localStorage.setItem('token', result.data.token)
    } catch (error) {
      console.error(error)
      throw new Error('Network error')
    }
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No token')
    }

    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Network error')
    }
  },
  getPermissions: () => {
    return Promise.resolve()
  },
  checkError(): Promise<void> {
    return Promise.resolve(undefined)
  },
  logout() {
    localStorage.removeItem('token')
    return Promise.resolve()
  },
}

export default authProvider
