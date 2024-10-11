<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold">Blog App</span>
            </NuxtLink>
          </div>
          <div class="hidden md:flex items-center">
            <NuxtLink to="/" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</NuxtLink>
            <template v-if="!isLoggedIn">
              <NuxtLink to="/login" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/admin" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Admin</NuxtLink>
              <button @click="handleLogout" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
            </template>
          </div>
          <div class="flex items-center md:hidden">
            <button @click="toggleMenu" class="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-show="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink to="/" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">About</NuxtLink>
          <template v-if="!isLoggedIn">
            <NuxtLink to="/login" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Login</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/admin" class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Admin</NuxtLink>
            <button @click="handleLogout" class="text-gray-700 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Logout</button>
          </template>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const { isLoggedIn, logout } = useAuth()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = () => {
  if (confirm('Are you sure you want to log out?')) {
    logout()
    isMenuOpen.value = false
  }
}
</script>