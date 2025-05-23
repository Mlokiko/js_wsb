<template>
  <div>
    <Header />
    <section class="my-forms" v-if="userName">
      <h2>Moje formularze</h2>
      <div v-if="createdForms.length === 0">Brak utworzonych formularzy.</div>

      <div class="form-list">
        <div class="form-item" v-for="form in createdForms" :key="form.id">
          <h3>{{ form.title }}</h3>
          <p>Autor: Ty</p>
          <p>Stworzono dnia {{ formatDate(form.created_at) }}</p>
          <router-link :to="`/form-details/${form.id}`">
            <button>Szczegóły</button>
          </router-link>
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
  name: 'MyForms',
  components: { Header, Footer },
  data() {
    return {
      userName: null,
      createdForms: []
    };
  },
  async created() {
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (!user || !user.name) {
      console.warn('Brak user.name — przekierowanie na stronę główną');
      this.$router.push('/');
      return;
    }

    this.userName = user.name;

    try {
      const res = await fetch(`http://localhost:3000/users/${this.userName}/forms`);
      if (res.ok) {
        this.createdForms = await res.json();
      }
    } catch (err) {
      console.error('Błąd przy pobieraniu formularzy:', err);
    }
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.my-forms {
  padding: 2rem;
}

.form-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.form-item {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.form-item h3 {
  margin: 0 0 0.5rem;
}

button {
  margin-top: 0.5rem;
}
</style>
