import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const totalCount = ref(0);
export default function useQueryParams() {
  const route = useRoute();
  const page = computed(() => Number(route.query._page) || 1);
  const limit = computed(() => Number(route.query._limit) || 10);
  const q = computed(() => route.query.q || "");
  return { page, limit, totalCount, q };
}
