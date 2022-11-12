<template>
  <div v-if="error">
    {{ error.message }}
  </div>
  <div v-else-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else-if="list">
    <h2>List Page</h2>
    <p>{{ $route.params.id }}</p>
    <p>{{ list.title }}</p>
    <p>{{ list.created_date }}</p>
    <p v-for="category in list.categories" :key="category.id">
      {{ category.title }}
    </p>
  </div>
  <div v-else>
    <p>List not found</p>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const listId = route.params.id;

  const { data: list, error, pending } = await useFetch(`/api/list/${listId}`);

  console.log(list);
</script>
