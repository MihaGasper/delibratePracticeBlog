export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()
  
  if (to.path.startsWith('/admin') && !isLoggedIn.value) {
    return navigateTo('/login')
  }
})