<template>
  <div>
    <NuxtLink v-for="list in lists" :key="list.id" :to="`list/${list.id}`">
      {{ list.title }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  const { data: lists } = await useFetch('/api/lists/635eefdde903f94a8e534db0');
</script>
