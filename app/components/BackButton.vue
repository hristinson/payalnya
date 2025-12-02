<template>
  <button @click="goBack" class="back-button">Назад</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.back-button {
  padding: 8px 12px;
  margin-bottom: 16px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: bold;
}

.back-button:hover {
  background-color: #e0e0e0;
}
</style>
