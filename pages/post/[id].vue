<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else-if="post">
    <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
    <p class="text-gray-600 mb-6">{{ formatDate(post.created_at) }}</p>
    <div v-html="post.content" class="prose"></div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post, pending, error } = await useLazyFetch(`/api/posts/${route.params.id}`)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>