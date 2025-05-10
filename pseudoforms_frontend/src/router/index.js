// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import AllForms from '../views/AllForms.vue';
import AddForm from '../views/AddForm.vue';

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/all-forms', name: 'AllForms', component: AllForms },
  { path: '/add-form', name: 'AddForm', component: AddForm }  // Add the new route
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;