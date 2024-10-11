<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Create New Post</h1>
    <form @submit.prevent="createPost">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input v-model="title" type="text" id="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-4">
        <label for="excerpt" class="block text-gray-700 text-sm font-bold mb-2">Excerpt</label>
        <textarea v-model="excerpt" id="excerpt" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3" required></textarea>
      </div>
      <div class="mb-6">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea v-model="content" id="content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10" required></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create Post
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const title = ref('')
const excerpt = ref('')
const content = ref('')

const createPost = async () => {
  try {
    await $fetch('/api/posts', {
      method: 'POST',
      body: { title: title.value, excerpt: excerpt.value, content: content.value },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    navigateTo('/admin')
  } catch (error) {
    console.error('Failed to create post:', error)
    alert('Failed to create post. Please try again.')
  }
}
</script>