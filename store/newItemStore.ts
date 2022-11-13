import { Category } from '~~/global';

export const useNewItemStore = defineStore({
  id: 'new-item-store',
  state: () => {
    return {
      showNewItemModal: false,
      submitted: false,
      name: '',
      quantity: 1,
      category: '',
      categories: [] as Category[],
    };
  },
  actions: {},
  getters: {},
});
