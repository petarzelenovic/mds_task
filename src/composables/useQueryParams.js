import { computed } from "vue";
import { useRoute } from "vue-router";

export default function useQueryParams() {
  const route = useRoute();
  const page = computed(() => Number(route.query._page) || 1);
  const limit = computed(() => Number(route.query._limit) || 10);

  return { page, limit };
}
