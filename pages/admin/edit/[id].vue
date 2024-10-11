<template>
  <div v-if="post">
    <h1 class="text-3xl font-bold mb-6">Edit Post</h1>
    <form @submit.prevent="updatePost">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input v-model="post.title" type="text" id="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-4">
        <label for="excerpt" class="block text-gray-700 text-sm font-bold mb-2">Excerpt</label>
        <textarea v-model="post.excerpt" id="excerpt" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3" required></textarea>
      </div>
      <div class="mb-6">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea v-model="post.content" id="content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10" required></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update Post
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.id}`)

const updatePost = async () => {
  try {
    await $fetch(`/api/posts/${route.params.id}`, {
      method: 'PUT',
      body: post.value,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    navigateTo('/admin')
  } catch (error) {
    console.error('Failed to update post:', error)
    alert('Failed to update post. Please try again.')
  }
}
</script>