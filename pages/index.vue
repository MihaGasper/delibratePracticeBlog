<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Blog Posts</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">
          <NuxtLink :to="`/post/${post.id}`" class="text-blue-600 hover:underline">
            {{ post.title }}
          </NuxtLink>
        </h2>
        <p class="text-gray-600">{{ post.excerpt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: posts, pending, error } = await useLazyFetch('/api/posts')
</script>