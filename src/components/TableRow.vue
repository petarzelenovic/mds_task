<template>
  <div class="row">
    <div
      class="cell"
      v-for="column in columns"
      :key="column"
    >
      <img
        v-if="column === 'avatar'"
        :src="avatarPath(rowData[column])"
        alt="avatar"
        class="avatar"
      />
      <span v-else-if="rowData[column]?.name">{{ rowData[column].name }}</span>
      <span v-else>{{ rowData[column] }}</span>
    </div>
  </div>
</template>

<script setup>

defineProps({
  rowData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  columns:{
    type: Array,
    required: false,
    default: ()=>[]
  }
});

function avatarPath(path){
  const defaultAvatar = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png';
  return path || defaultAvatar;
}
</script>

<style scoped>
</style>
