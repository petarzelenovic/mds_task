<template>
  <UserTable
    v-if="!isLoading"
    :data="users"
    :columns="columns"
    v-model:searchQuery="q"
    @limit-change="updateLimitQuery"
    @change-page="updatePageQuery"
    @search-filter="updateSearchQuery"
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

const {
  limit,
  page,
  totalCount,
  q,
  updateLimitQuery,
  updatePageQuery,
  updateSearchQuery,
} = useQueryParams();

async function fetchData() {
  isLoading.value = true;
  const response = await fetch(
    `/api/users?_page=${page.value}&_limit=${limit.value}&q=${q.value}`
  );
  totalCount.value = response.headers.get("X-Total-Count");
  users.value = await response.json();
  isLoading.value = false;
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
