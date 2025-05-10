<template>
    <div>
      <Header />
      <section class="all-forms">
        <h2>All Forms</h2>
        <div v-if="loading">Loading forms...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="form-list">
          <div class="form-item" v-for="form in forms" :key="form.id">
            <h3>{{ form.title }}</h3>
            <p>Created on {{ formatDate(form.created_at) }}</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    name: 'AllForms',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        forms: [],
        loading: true,
        error: null
      };
    },
    methods: {
      async fetchForms() {
        try {
          const res = await fetch('http://localhost:3000/surveys');
          if (!res.ok) throw new Error('Failed to fetch forms');
          this.forms = await res.json();
        } catch (err) {
          this.error = err.message;
        } finally {
          this.loading = false;
        }
      },
      formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString();
      }
    },
    mounted() {
      this.fetchForms();
    }
  };
  </script>
  
  <style scoped>
  .all-forms {
    padding: 2rem;
  }
  
  .form-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .form-item {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  }
  </style>