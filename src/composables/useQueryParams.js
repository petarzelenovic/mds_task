import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const totalCount = ref(0);
export default function useQueryParams() {
  const router = useRouter();
  function updateLimitQuery(newLimit) {
    router.push({ path: "/", query: { ...route.query, _limit: newLimit } });
  }

  function updatePageQuery(event) {
    let newPage = page.value;
    if (event === "next") {
      newPage = page.value + 1;
    } else {
      newPage = page.value - 1;
    }
    router.push({ path: "/", query: { ...route.query, _page: newPage } });
  }

  function updateSearchQuery(value) {
    router.push({ path: "/", query: { ...route.query, q: value } });
  }

  const route = useRoute();
  const page = computed(() => Number(route.query._page) || 1);
  const limit = computed(() => Number(route.query._limit) || 10);
  const q = computed(() => route.query.q || "");

  return {
    page,
    limit,
    totalCount,
    q,
    updateLimitQuery,
    updatePageQuery,
    updateSearchQuery,
  };
}
