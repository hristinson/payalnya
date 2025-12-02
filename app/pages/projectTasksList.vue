<template>
  <div v-if="loading">Завантаження...</div>
  <div v-if="message">{{ message }}</div>
  <back-button />

  <div v-if="!loading && projects.length > 0">
    <h2>Проекти та завдання</h2>

    <div v-for="project in projects" :key="project._id" class="project">
      <h3>{{ project.name }}</h3>

      <div v-if="project.tasks.length > 0">
        <h4>Завдання:</h4>
        <ul>
          <li v-for="task in project.tasks" :key="task.title">
            {{ task.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Немає завдань для цього проекту.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsAndTasks } from "../hooks/useProjectsAndTasks.js";
import BackButton from "../components/BackButton.vue";

const { loading, message, success, projects, fetchProjectsAndTasks } =
  useProjectsAndTasks();

fetchProjectsAndTasks();
</script>

<style scoped>
.project {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
}

h3 {
  color: #333;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 5px;
}
</style>
