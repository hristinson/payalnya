import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Project } from "~/models";

export const useProjectsStore = defineStore("projects", () => {
  const loading = ref(false);
  const message = ref("");
  const success = ref(false);
  const projects = ref<Project[]>([]);

  const addProject = async (projectData: Project) => {
    if (!projectData.name.trim()) {
      message.value = "Назва проекту обовʼязкова";
      success.value = false;
      return null;
    }

    loading.value = true;
    message.value = "";

    try {
      const res = await axios.post("/.netlify/functions/projects", projectData);

      message.value = `Проект "${res.data.name}" успішно додано!`;
      success.value = true;
      projects.value.push(res.data);
      return res.data;
    } catch (err: any) {
      message.value = "Помилка при додаванні проекту: " + err.message;
      success.value = false;
      return null;
    } finally {
      loading.value = false;
      setTimeout(() => {
        message.value = "";
      }, 3000);
    }
  };

  const fetchProjects = async () => {
    loading.value = true;
    try {
      const res = await axios.get("/.netlify/functions/projects");
      projects.value = res.data;
      return res.data;
    } catch (err) {
      console.error("Не вдалося завантажити проекти:", err);
      message.value = "Не вдалося завантажити список проектів";
      success.value = false;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const deleteProject = async (id: string) => {
    if (
      !confirm(
        "Ви впевнені, що хочете видалити проект разом із усіма його завданнями?"
      )
    )
      return;

    loading.value = true;
    message.value = "";

    try {
      await axios.delete(`/.netlify/functions/projects/${id}`);

      message.value = "Проект та всі завдання видалено!";
      success.value = true;
      projects.value = projects.value.filter((p) => p.id !== id);
    } catch (err: any) {
      console.error(err);
      message.value = "Помилка при видаленні проекту: " + err.message;
      success.value = false;
    } finally {
      loading.value = false;
      projects.value = projects.value.filter((p) => p._id !== id);
      setTimeout(() => {
        message.value = "";
      }, 3000);
    }
  };

  return {
    loading,
    message,
    success,
    projects,
    addProject,
    fetchProjects,
    deleteProject,
  };
});
