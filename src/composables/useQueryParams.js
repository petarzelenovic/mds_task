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

  function updateCountryQuery(value) {
    router.push({ path: "/", query: { ...route.query, "country.id": value } });
  }

  function updateRoleQuery(value) {
    router.push({ path: "/", query: { ...route.query, "role.name": value } });
  }

  function updateSortQuery(value) {
    router.push({
      path: "/",
      query: { ...route.query, _sort: value.sort, _order: value.order },
    });
  }

  const route = useRoute();
  const page = computed(() => Number(route.query._page) || 1);
  const limit = computed(() => Number(route.query._limit) || 10);
  const q = computed(() => route.query.q || "");
  const countryId = computed(() => route.query["country.id"] || 0);
  const roleName = computed(() => route.query["role.name"] || "default");
  const sortKey = computed(() => route.query._sort || "");
  const sortOrder = computed(() => route.query._order || "");

  return {
    page,
    limit,
    totalCount,
    q,
    countryId,
    roleName,
    sortKey,
    sortOrder,
    updateLimitQuery,
    updatePageQuery,
    updateSearchQuery,
    updateCountryQuery,
    updateRoleQuery,
    updateSortQuery,
  };
}
