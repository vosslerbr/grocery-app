<template>
  <div v-if="error">
    {{ error.message }}
  </div>
  <div v-else-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else-if="list">
    <DataTable
      :value="list.categories"
      v-model:expandedRows="expandedRows"
      dataKey="id"
      class="mb-4 mt-4">
      <template #header>
        <div class="flex justify-content-between align-items-center">
          <h2 class="m-0">{{ list.title }}</h2>
          <div>
            <Button label="New" icon="pi pi-plus" class="p-button-success" />
          </div>
        </div>
      </template>
      <Column :expander="true" headerStyle="width: 3rem" />
      <Column field="title" header="Category" sortable></Column>
      <Column header="Number of Items" sortable sort-field="items">
        <template #body="slotProps">
          <span>{{ slotProps.data.items.length }}</span>
        </template>
      </Column>

      <template #expansion="slotProps">
        <DataTable :value="slotProps.data.items" responsiveLayout="scroll">
          <Column field="name" sortable></Column>
          <Column field="quantity" sortable></Column>
        </DataTable>
      </template>

      <template #footer> {{ totalItems }} Items </template>
    </DataTable>
    <Chip
      icon="pi pi-calendar"
      :label="`Created: ${dayjs(list.created_date).format('MM/DD/YYYY')}`"></Chip>
    <Chip
      icon="pi pi-file-edit"
      :label="`Last Modified: ${dayjs(list.modified_date).format('MM/DD/YYYY')}`"></Chip>
  </div>
  <div v-else>
    <p>List not found</p>
  </div>
</template>

<script setup lang="ts">
  import { Category } from '.prisma/client';
  import { useRoute, useRouter } from 'vue-router';
  import { List } from '~~/global';
  import dayjs from 'dayjs';

  const expandedRows = ref<Category[]>([]);

  const route = useRoute();
  const router = useRouter();
  const listId = route.params.id;

  // TODO hopefully this will work without the `as` cast in the future
  const { data: list, error, pending } = await useFetch<List>(`/api/list/${listId}`);

  console.log(list);

  const totalItems = computed(() => {
    if (!list.value) return 0;
    return list.value.categories.reduce((acc, category) => {
      return acc + category.items.length;
    }, 0);
  });
</script>
