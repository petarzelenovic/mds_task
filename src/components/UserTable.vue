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
  </div>
</template>

<script setup>
import TableRow from "./TableRow.vue";
import useQueryParams from "../composables/useQueryParams";

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

const { limit } = useQueryParams();

const emit = defineEmits(["limitChange"]);

function handleLimitChange(event) {
  emit("limitChange", event.target.value);
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
