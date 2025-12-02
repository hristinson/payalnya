import { ref } from "vue";
import axios from "axios";
import type { Project, Task } from "~/models";

export function useProjectsAndTasks() {
  const loading = ref(false);
  const message = ref("");
  const success = ref(false);
  const projects = ref<(Project & { tasks: Task[] })[]>([]);

  const fetchProjectsAndTasks = async () => {
    loading.value = true;
    message.value = "";
    try {
      const [projectsRes, tasksRes] = await Promise.all([
        axios.get("/.netlify/functions/projects"),
        axios.get("/.netlify/functions/tasks"),
      ]);

      const tasks = tasksRes.data;

      const projectsWithTasks = projectsRes.data.map((project: Project) => {
        return {
          ...project,
          tasks: tasks.filter((task: Task) => task.projectId === project._id),
        };
      });

      projects.value = projectsWithTasks;
      success.value = true;
    } catch (err: any) {
      console.error("Помилка при завантаженні проектів та завдань:", err);
      message.value = "Не вдалося завантажити проекти та завдання";
      success.value = false;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    message,
    success,
    projects,
    fetchProjectsAndTasks,
  };
}
