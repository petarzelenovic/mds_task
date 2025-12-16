<template>
  <div v-if="showHeader" class="row header">
    <div class="cell" v-for="column in columns" :key="column">
      {{ column }}
    </div>
  </div>
  <TableRow
    v-for="user in data"
    :key="user.id"
    :row-data="user"
    :columns="columns"
  />

  <div class="row footer">
    <span>View</span>
    <select name="limit" id="limit" @change="handleLimitChange" :value="limit">
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
  </div>
</template>

<script setup>
import TableRow from "./TableRow.vue";
import useQueryParams from "../composables/useQueryParams";
import { computed } from "vue";

defineProps({
  data: {
    type: Array,
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

const { limit, totalCount, page } = useQueryParams();
const numberOfPages = computed(() => totalCount.value / limit.value);
const emit = defineEmits(["limitChange", "changePage"]);

function handleLimitChange(event) {
  emit("limitChange", event.target.value);
}

function handlePreviousPage() {
  emit("changePage", "previous");
}

function handleNextPage() {
  emit("changePage", "next");
}
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
