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
            <Button
              label="New"
              icon="pi pi-plus"
              class="p-button-success"
              @click="handleNewItemClick" />
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

    <Dialog
      :visible="newItemStore.showNewItemModal"
      :style="{ width: '450px' }"
      header="Add New Item"
      :modal="true"
      class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="newItemStore.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': newItemStore.submitted && !newItemStore.name }" />
        <small class="p-error" v-if="newItemStore.submitted && !newItemStore.name">
          Name is required.
        </small>
      </div>
      <div class="field">
        <label for="category">Category</label>
        <Dropdown
          v-model="newItemStore.category"
          :options="categories || []"
          optionLabel="title"
          optionValue="id"
          :multiple="false"
          :class="{ 'p-invalid': newItemStore.submitted && !newItemStore.category }" />
        <small class="p-error" v-if="newItemStore.submitted && !newItemStore.category">
          Category is required.
        </small>
      </div>
      <div class="field">
        <label for="quantity">Quantity</label>
        <InputNumber
          inputId="horizontal"
          v-model="newItemStore.quantity"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          decrementButtonClass="p-button-danger"
          incrementButtonClass="p-button-success"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          mode="decimal"
          :min="1" />
        <small class="p-error" v-if="newItemStore.submitted && newItemStore.quantity < 1">
          Minimum quantity is 1.
        </small>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="handleCancel" />
        <Button label="Save" icon="pi pi-check" class="p-button-success" @click="handleSave" />
      </template>
    </Dialog>
  </div>
  <div v-else>
    <p>List not found</p>
  </div>
</template>

<script setup lang="ts">
  import { Category } from '.prisma/client';
  import { useRoute } from 'vue-router';
  import { List } from '~~/global';
  import dayjs from 'dayjs';
  import { useNewItemStore } from '~~/store/newItemStore';

  const newItemStore = useNewItemStore();

  const expandedRows = ref<Category[]>([]);

  const route = useRoute();
  const listId = route.params.id;

  // TODO hopefully this will work without the `as` cast in the future
  const { data: list, error, pending, refresh } = await useFetch<List>(`/api/list/${listId}`);
  const { data: categories, refresh: categoriesRefresh } = await useFetch<Category[]>(
    `/api/categories/${listId}`
  );

  console.log(list);

  const totalItems = computed(() => {
    if (!list.value) return 0;
    return list.value.categories.reduce((acc, category) => {
      return acc + category.items.length;
    }, 0);
  });

  const handleNewItemClick = () => {
    newItemStore.showNewItemModal = true;
  };

  const handleCancel = () => {
    newItemStore.showNewItemModal = false;
  };

  const handleSave = async () => {
    try {
      newItemStore.submitted = true;
      if (newItemStore.name && newItemStore.category) {
        await useFetch('/api/item', {
          method: 'POST',
          body: JSON.stringify({
            name: newItemStore.name,
            quantity: newItemStore.quantity,
            categoryId: newItemStore.category,
          }),
        });

        newItemStore.showNewItemModal = false;
        newItemStore.submitted = false;
        newItemStore.name = '';
        newItemStore.category = '';
        newItemStore.quantity = 1;

        refresh();
        categoriesRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>
