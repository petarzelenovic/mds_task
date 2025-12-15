<template>
  <UserTable
    v-if="!isLoading"
    :data="users"
    :columns="columns"
    @limitChange="updateLimitQuery"
  >
  </UserTable>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import UserTable from "./components/UserTable.vue";
import { useRoute, useRouter } from "vue-router";
import useQueryParams from "./composables/useQueryParams";

const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const users = ref([]);

const { limit, page } = useQueryParams();

async function fetchData() {
  isLoading.value = true;
  const response = await fetch(
    `/api/users?_page=${page.value}&_limit=${limit.value}`
  );
  users.value = await response.json();
  isLoading.value = false;
}

function updateLimitQuery(newLimit) {
  router.push({ path: "/", query: { _limit: newLimit } });
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

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
