import { ref } from 'vue'

export const useAuth = () => {
  const isLoggedIn = ref(false)
  const tokenCookie = useCookie('token')

  const checkAuthStatus = () => {
    isLoggedIn.value = !!tokenCookie.value
  }

  const login = (token) => {
    tokenCookie.value = token
    isLoggedIn.value = true
  }

  const logout = () => {
    tokenCookie.value = null
    isLoggedIn.value = false
    navigateTo('/')
  }

  // Check auth status on initial load
  if (process.client) {
    checkAuthStatus()
  }

  return {
    isLoggedIn,
    login,
    logout,
    checkAuthStatus
  }
}