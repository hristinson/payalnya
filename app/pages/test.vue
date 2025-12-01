<template>
  <div>
    <h1>Сторінка з глобальним fetch</h1>

    <button class="btn" :class="{ active: loading }" @click="fetchPosts">
      Завантажити пости
    </button>

    <div v-if="loading">Завантаження...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { posts, loading, error, fetchPosts } = usePosts();
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #999;
  border-radius: 6px;
  background: #f4f4f4;
  cursor: pointer;
  transition: 0.2s;
}

.btn:not(.active) {
  color: #555;
}

.btn.active {
  background: #4caf50;
  color: white;
  border-color: #3e8e41;
}
</style>
