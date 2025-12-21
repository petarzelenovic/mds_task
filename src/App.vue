<template>
  <div v-if="isLoading">Loading...</div>
  <!-- add loading spinner -->
  <UserTable
    v-else
    :data="completeData"
    :columns="columns"
    v-model:searchQuery="q"
    @limit-change="updateLimitQuery"
    @change-page="updatePageQuery"
    @search-filter="updateSearchQuery"
    @country-filter="updateCountryQuery"
    @role-filter="updateRoleQuery"
    @sort-change="updateSortQuery"
    @delete-user="deleteUser"
  >
  </UserTable>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import UserTable from "./components/UserTable.vue";
import { useRoute } from "vue-router";
import useQueryParams from "./composables/useQueryParams";

const route = useRoute();
const isLoading = ref(true);
const users = ref([]);
const countries = ref([]);
const roles = ref([]);
const completeData = computed(() => ({
  users: users.value,
  roles: roles.value,
  countries: countries.value,
}));

const firstFetch = ref(true);

const {
  totalCount,
  q,
  updateLimitQuery,
  updatePageQuery,
  updateSearchQuery,
  updateCountryQuery,
  updateRoleQuery,
  updateSortQuery,
  buildQueryParams,
} = useQueryParams();

async function fetchData() {
  try {
    if (firstFetch.value) {
      await Promise.all([fetchCountryData(), fetchRolesData()]);
      firstFetch.value = false;
    }

    isLoading.value = true;

    const params = buildQueryParams();
    // TODO: cover a case when we get 0 users based on filters..
    const response = await fetch(`/api/users?${params}`);
    totalCount.value = response.headers.get("X-Total-Count");
    users.value = await response.json();
  } catch (err) {
    console.log(err);
    users.value = [];
  } finally {
    isLoading.value = false;
  }
}

async function fetchCountryData() {
  const response = await fetch(`/api/countries`);
  countries.value = await response.json();
}

async function fetchRolesData() {
  const response = await fetch(`/api/roles`);
  roles.value = await response.json();
}

async function deleteUser(user) {
  await fetch(`api/users/${user.id}`, {
    method: "DELETE",
  });
  await fetchData();
}

const columns = [
  "id",
  "firstName",
  "lastName",
  "email",
  "avatar",
  "country",
  "role",
];
watch(() => route.query, fetchData);
</script>

<style scoped></style>
