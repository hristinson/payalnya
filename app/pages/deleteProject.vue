<template>
  <div class="project-list">
    <BackButton />
    <div v-for="project in projects" :key="project.id" class="project-item">
      <span>{{ project.name }}</span>
      <button
        @click="() => project._id && deleteProject(project._id)"
        :disabled="loading"
      >
        {{ loading ? "Видаляємо..." : "Видалити" }}
      </button>
    </div>

    <p v-if="message" :class="{ success: success, error: !success }">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Project } from "~/models";
import BackButton from "../components/BackButton.vue";
import { useProjects } from "~/hooks/useProjects";

const projects = ref<Project[]>([]);
const loading = ref(false);
const message = ref("");
const success = ref(false);
const { fetchProjects, deleteProject } = useProjects();

onMounted(async () => {
  projects.value = await fetchProjects();
});
</script>

<style scoped>
.project-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 6px 12px;
  cursor: pointer;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
