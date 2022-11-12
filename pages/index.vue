<template>
  <div v-for="(list, index) in lists" :key="list.id">
    <p>{{ list.title }}</p>
  </div>
</template>

<script setup>
  const { data: lists } = await useFetch('/api/lists/635eefdde903f94a8e534db0');

  console.log(lists);
</script>
