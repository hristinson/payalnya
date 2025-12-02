import { ref } from "vue";
import axios from "axios";
import type { Task } from "~/models";

export function useTasks() {
  const loading = ref(false);
  const message = ref("");
  const success = ref(false);

  const addTask = async (taskData: Task) => {
    if (!taskData.projectId) {
      message.value = "Будь ласка, оберіть проект";
      success.value = false;
      return null;
    }
    if (!taskData.title?.trim()) {
      message.value = "Назва завдання обовʼязкова";
      success.value = false;
      return null;
    }

    loading.value = true;
    message.value = "";

    try {
      const res = await axios.post("/.netlify/functions/tasks", taskData);
      message.value = `Завдання "${res.data.title}" успішно додано!`;
      success.value = true;
      return res.data;
    } catch (err: any) {
      console.error(err);
      message.value = "Помилка при додаванні завдання: " + err.message;
      success.value = false;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    message,
    success,
    addTask,
  };
}
