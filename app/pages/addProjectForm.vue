<template>
  <BackButton />

  <form @submit.prevent="submitForm" class="add-project-form">
    <div>
      <label for="name">Назва проекту *</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        placeholder="Введіть назву проекту"
      />
    </div>

    <div>
      <label for="description">Опис проекту</label>
      <textarea
        id="description"
        v-model="form.description"
        placeholder="Введіть опис"
      ></textarea>
    </div>

    <div>
      <label for="status">Статус</label>
      <select id="status" v-model="form.status">
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
    </div>

    <button type="submit" :disabled="store.loading">
      {{ store.loading ? "Додаємо..." : "Додати проект" }}
    </button>

    <p
      v-if="store.message"
      :class="{ success: store.success, error: !store.success }"
    >
      {{ store.message }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BackButton from "~/components/BackButton.vue";
import { useProjectsStore } from "~/stores/projects";

const store = useProjectsStore();

const form = reactive({
  id: "",
  name: "",
  description: "",
  status: "active",
});

const submitForm = async () => {
  await store.addProject({ ...form });
};
</script>

<style scoped>
.add-project-form {
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
