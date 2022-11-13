<template>
  <div id="app-container">
    <Toolbar class="mb-4">
      <template #start>
        <Button label="Home" @click="handleHomeClick" icon="pi pi-home" />
      </template>
    </Toolbar>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };
</script>

<style>
  #app-container {
    max-width: 1200px;
    margin: auto;
  }

  a {
    text-decoration: none;
  }
</style>
