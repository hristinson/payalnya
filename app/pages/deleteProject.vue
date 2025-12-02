<template>
  <div class="project-list">
    <BackButton />

    <div
      v-for="project in store.projects"
      :key="project._id"
      class="project-item"
    >
      <span>{{ project.name }}</span>

      <button
        @click="() => project._id && store.deleteProject(project._id)"
        :disabled="store.loading"
      >
        {{ store.loading ? "Видаляємо..." : "Видалити" }}
      </button>
    </div>

    <p
      v-if="store.message"
      :class="{ success: store.success, error: !store.success }"
    >
      {{ store.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import BackButton from "~/components/BackButton.vue";
import { useProjectsStore } from "~/stores/projects";
import { onMounted } from "vue";

const store = useProjectsStore();

onMounted(() => {
  store.fetchProjects();
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
