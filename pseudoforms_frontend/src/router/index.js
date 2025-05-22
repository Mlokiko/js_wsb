// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import AllForms from '../views/AllForms.vue';
import AddForm from '../views/AddForm.vue';
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ManageAccount from '../views/ManageAccount.vue'

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/all-forms', name: 'AllForms', component: AllForms },
  { path: '/add-form', name: 'AddForm', component: AddForm },  // Add the new route
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/manage-account', name: 'ManageAccount', component: ManageAccount }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;