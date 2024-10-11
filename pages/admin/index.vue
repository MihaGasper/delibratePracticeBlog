<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
    <NuxtLink to="/admin/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
      Create New Post
    </NuxtLink>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="mb-4 p-4 border rounded">
        <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
        <div class="flex space-x-2">
          <NuxtLink :to="`/admin/edit/${post.id}`" class="text-blue-600 hover:underline">Edit</NuxtLink>
          <button @click="deletePost(post.id)" class="text-red-600 hover:underline">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: posts, pending, error, refresh } = await useLazyFetch('/api/posts', {
  headers: {
    'Authorization': `Bearer ${useCookie('token').value}`
  }
})

const deletePost = async (id) => {
  try {
    await $fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${useCookie('token').value}`
      }
    })
    refresh()
  } catch (err) {
    console.error('Failed to delete post:', err)
    alert('Failed to delete post. Please try again.')
  }
}
</script>