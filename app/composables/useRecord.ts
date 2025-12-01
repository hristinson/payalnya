import { ref } from "vue";

interface Post {
  id: number;
  title: string;
  body: string;
}

const posts = ref<Post[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const usePosts = () => {
  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );

      posts.value = data;
    } catch (err: any) {
      error.value = err.message || "Помилка при завантаженні постів";
    } finally {
      loading.value = false;
    }
  };

  return { posts, loading, error, fetchPosts };
};
