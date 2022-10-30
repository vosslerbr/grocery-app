<template>
  <div>
    <p>{{ posts.length }}</p>
    <p>{{ email }}</p>
  </div>
</template>

<script setup>
  const { data: posts } = await useFetch('/api/hello');

  const email = posts.value[0].email;

  console.log(posts);
</script>
