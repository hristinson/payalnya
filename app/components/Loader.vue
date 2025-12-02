<template>
  <div v-if="visible" class="overlay-loader">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProjectsStore } from "~/stores/projects";
import { useProjectsAndTasksStore } from "~/stores/projectsTasksList";

const projectsStore = useProjectsStore();
const otherStore = useProjectsAndTasksStore();

const visible = computed(() => projectsStore.loading || otherStore.loading);
</script>

<style scoped>
.overlay-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
