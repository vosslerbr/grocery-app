<template>
  <div>
    <NuxtLink v-for="list in lists" :key="list.id" :to="`list/${list.id}`">
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #title>{{ list.title }}</template>

        <template #content>
          <p>Categories: {{ list.categories.length }}</p>
          <p>Items: {{ countItems(list.categories) }}</p>
        </template>

        <template #footer>
          <span class="p-text-secondary"
            >Last Modified: {{ dayjs(list.modified_date).format('MM/DD/YYYY') }}
          </span>
        </template>
      </Card>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { Category } from '~~/global';

  const { data: lists } = await useFetch('/api/lists/635eefdde903f94a8e534db0');

  // TODO add a total items count to the list
  const countItems = (categories: Category[]) => {
    return categories.reduce((acc, category) => {
      return acc + category.items.length;
    }, 0);
  };
</script>
