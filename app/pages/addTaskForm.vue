<template>
  <BackButton />
  <form @submit.prevent="submitForm" class="add-task-form">
    <div>
      <label for="project">Проект *</label>
      <select id="project" v-model="form.projectId" required>
        <option value="" disabled>Оберіть проект</option>
        <option
          v-for="project in projects"
          :key="project._id"
          :value="project._id"
        >
          {{ project.name }}
        </option>
      </select>
    </div>

    <div>
      <label for="name">Назва завдання *</label>
      <input
        type="text"
        id="name"
        v-model="form.title"
        required
        placeholder="Введіть назву завдання"
      />
    </div>

    <div>
      <label for="assignee">Виконавець</label>
      <input
        type="text"
        id="assignee"
        v-model="form.assignee"
        placeholder="Введіть імʼя виконавця"
      />
    </div>

    <div>
      <label for="status">Статус *</label>
      <select id="status" v-model="form.status" required>
        <option value="todo">To do</option>
        <option value="inprogress">In progress</option>
        <option value="done">Done</option>
      </select>
    </div>

    <div>
      <label for="dueDate">Термін виконання *</label>
      <input
        type="date"
        id="dueDate"
        v-model="form.dueDate"
        :min="minDate"
        required
      />
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? "Додаємо..." : "Додати завдання" }}
    </button>

    <p v-if="message" :class="{ success: success, error: !success }">
      {{ message }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import type { Project, Task } from "~/models";
import { useTasks } from "../hooks/useTasks";
import BackButton from "~/components/BackButton.vue";
import { useProjects } from "~/hooks/useProjects";

const { loading, message, success, addTask } = useTasks();
const { fetchProjects } = useProjects();

const form = reactive<Task>({
  projectId: "",
  title: "",
  assignee: "",
  status: "todo",
  dueDate: "",
});

const projects = ref<Project[]>([]);
const minDate = computed(() => new Date().toISOString().split("T")[0]);

onMounted(async () => {
  projects.value = await fetchProjects();
});

const submitForm = async () => {
  const result = await addTask(form);
  if (result) {
    form.projectId = "";
    form.title = "";
    form.assignee = "";
    form.status = "todo";
    form.dueDate = "";
  }
};
</script>

<style scoped>
.add-task-form {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  cursor: pointer;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
