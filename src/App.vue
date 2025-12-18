<template>
  <UserTable
    v-if="!isLoading"
    :data="completeData"
    :columns="columns"
    v-model:searchQuery="q"
    @limit-change="updateLimitQuery"
    @change-page="updatePageQuery"
    @search-filter="updateSearchQuery"
    @country-filter="updateCountryQuery"
    @role-filter="updateRoleQuery"
    @sort-change="updateSortQuery"
  >
  </UserTable>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import UserTable from "./components/UserTable.vue";
import { useRoute } from "vue-router";
import useQueryParams from "./composables/useQueryParams";

const route = useRoute();
const isLoading = ref(true);
const users = ref([]);
const countries = ref([]);
const roles = ref([]);
const completeData = ref([]);

const firstFetch = ref(true);

const {
  limit,
  page,
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
} = useQueryParams();

async function fetchData() {
  if (firstFetch.value) {
    fetchCountryData();
    fetchRolesData();
    firstFetch.value = false;
  }

  isLoading.value = true;

  // TODO: move to a separate function
  const params = new URLSearchParams({
    _page: page.value,
    _limit: limit.value,
  });

  if (q.value) params.append("q", q.value);
  if (countryId.value !== 0) params.append("country.id", countryId.value);
  if (roleName.value !== "default") params.append("role.name", roleName.value);
  if (sortKey.value) params.append("_sort", sortKey.value);
  if (sortOrder.value) params.append("_order", sortOrder.value);

  // TODO: cover a case when we get 0 users based on filters, add error handling..
  const response = await fetch(`/api/users?${params}`);
  totalCount.value = response.headers.get("X-Total-Count");
  users.value = await response.json();
  completeData.value = { users, roles, countries };
  isLoading.value = false;
}

async function fetchCountryData() {
  const response = await fetch(`/api/countries`);
  countries.value = await response.json();
}

async function fetchRolesData() {
  const response = await fetch(`/api/roles`);
  roles.value = await response.json();
}

const columns = computed(() => {
  if (!users.value.length) return [];
  return Object.keys(users.value[0]);
});

watch(
  () => route.query,
  () => {
    fetchData();
  }
);
</script>

<style scoped></style>
