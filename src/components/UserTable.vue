<template>
  <div class="table">
    <div v-if="showHeader" class="row header">
      <div
        class="cell"
        v-for="column in columns"
        :key="column"
        @click="handleSort(column)"
      >
        {{ column }} ▲ ▼
      </div>
    </div>
    <TableRow
      v-for="user in data.users"
      :key="user.id"
      :row-data="user"
      :columns="columns"
      @delete-user="handleDeleteUser"
    />
    <!-- extract footer, header to separate components... -->

    <div class="row footer">
      <span>View</span>
      <select
        name="limit"
        id="limit"
        @change="handleLimitChange"
        :value="limit"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>

      <div class="pagination">
        <button :disabled="page <= 1" @click="handlePreviousPage"><</button>
        <span> {{ page }}</span>
        <button :disabled="page === numberOfPages" @click="handleNextPage">
          >
        </button>
      </div>

      <div class="search">
        <input
          type="text"
          class="searchBar"
          v-model="searchQuery"
          @input="handleSearchDebounced"
        />
        <select
          name="country"
          id="country"
          @change="handleCountryChange"
          :value="countryId"
        >
          <option :value="0">--Please choose a country--</option>
          <option
            v-for="country in data.countries"
            :value="country.id"
            :key="country.id"
          >
            {{ country.name || "Missing country name" }}
          </option>
        </select>

        <select
          name="role"
          id="role"
          @change="handleRoleChange"
          :value="roleName"
        >
          <option :value="'default'">--Please choose a role--</option>
          <option v-for="role in data.roles" :value="role.name" :key="role.id">
            {{ role.name || "Missing role name" }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import TableRow from "./TableRow.vue";
import useQueryParams from "../composables/useQueryParams";
import { computed, ref } from "vue";
import { debounceFn } from "../utils/debouceFn";

defineProps({
  data: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  showHeader: {
    required: false,
    default: true,
  },
});

const emit = defineEmits([
  "limitChange",
  "changePage",
  "searchFilter",
  "countryFilter",
  "roleFilter",
  "sortChange",
  "deleteUser",
]);

const searchQuery = defineModel("searchQuery");
const { limit, totalCount, page, countryId, roleName, sortKey, sortOrder } =
  useQueryParams();
const sortKeyLocal = ref(sortKey.value);
const sortOrderLocal = ref(sortOrder.value);
const numberOfPages = computed(() => Math.ceil(totalCount.value / limit.value));

function handleLimitChange(event) {
  emit("limitChange", event.target.value);
}

function handlePreviousPage() {
  emit("changePage", "previous");
}

function handleNextPage() {
  emit("changePage", "next");
}

function handleSearchInput(event) {
  emit("searchFilter", event.target.value);
}

function handleCountryChange(event) {
  emit("countryFilter", event.target.value);
}

function handleRoleChange(event) {
  emit("roleFilter", event.target.value);
}

function handleDeleteUser(data) {
  emit("deleteUser", data);
}

function handleSort(column) {
  if (sortKeyLocal.value === column) {
    sortOrderLocal.value = sortOrderLocal.value === "asc" ? "desc" : "asc";
  } else {
    sortKeyLocal.value = column;
    sortOrderLocal.value = "asc";
  }

  emit("sortChange", {
    sort: sortKeyLocal.value,
    order: sortOrderLocal.value,
  });
}

const handleSearchDebounced = debounceFn(handleSearchInput, 500);
</script>

<style scoped>
.header {
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid #555;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.footer {
  display: flex;
  align-items: center;
  height: 50px;
}
</style>
