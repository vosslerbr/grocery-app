import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import Chip from 'primevue/chip';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('Toast', Toast);
  nuxtApp.vueApp.component('DataTable', DataTable);
  nuxtApp.vueApp.component('Column', Column);
  nuxtApp.vueApp.component('Toolbar', Toolbar);
  nuxtApp.vueApp.component('Chip', Chip);
  nuxtApp.vueApp.component('Card', Card);
  nuxtApp.vueApp.component('Dialog', Dialog);
  nuxtApp.vueApp.component('InputNumber', InputNumber);
  nuxtApp.vueApp.component('AutoComplete', AutoComplete);
  nuxtApp.vueApp.component('Dropdown', Dropdown);
});
