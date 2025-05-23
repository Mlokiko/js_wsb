<template>
  <div>
    <Header />
<<<<<<< HEAD
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
=======
    <section class="my-forms" v-if="userId">
      <h2>Moje formularze</h2>

      <div>
        <h3>Utworzone przeze mnie</h3>
        <div v-if="createdForms.length === 0">Brak utworzonych formularzy.</div>
        <ul>
          <li v-for="form in createdForms" :key="form.id">
            <router-link :to="`/fill-form/${form.id}`">{{ form.title }}</router-link>
          </li>
        </ul>
      </div>

      <div>
        <h3>Na które odpowiedziałem</h3>
        <div v-if="answeredForms.length === 0">Brak odpowiedzi.</div>
        <ul>
          <li v-for="form in answeredForms" :key="form.id">
            <router-link :to="`/fill-form/${form.id}`">{{ form.title }}</router-link>
          </li>
        </ul>
>>>>>>> e2f0a3ccf8f105aa565166e6822fdab31d8661a5
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
<<<<<<< HEAD
      userName: null,
      createdForms: []
    };
  },
  async created() {
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (!user || !user.name) {
      console.warn('Brak user.name — przekierowanie na stronę główną');
=======
      userId: null,
      createdForms: [],
      answeredForms: [],
    };
  },
  async created() {
    this.user.name = localStorage.getItem('this.user.name');
    if (!this.user.name) {
      console.warn('Brak userId — przekierowanie na stronę główną');
>>>>>>> e2f0a3ccf8f105aa565166e6822fdab31d8661a5
      this.$router.push('/');
      return;
    }

<<<<<<< HEAD
    this.userName = user.name;

    try {
      const res = await fetch(`http://localhost:3000/users/${this.userName}/forms`);
      if (res.ok) {
        this.createdForms = await res.json();
=======
    try {
      const [createdRes, answeredRes] = await Promise.all([
        fetch(`http://localhost:3000/users/${this.userId}/forms`),
        fetch(`http://localhost:3000/users/${this.userId}/responses`)
      ]);

      if (createdRes.ok) {
        this.createdForms = await createdRes.json();
      }
      if (answeredRes.ok) {
        this.answeredForms = await answeredRes.json();
>>>>>>> e2f0a3ccf8f105aa565166e6822fdab31d8661a5
      }
    } catch (err) {
      console.error('Błąd przy pobieraniu formularzy:', err);
    }
<<<<<<< HEAD
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    }
=======
>>>>>>> e2f0a3ccf8f105aa565166e6822fdab31d8661a5
  }
};
</script>

<style scoped>
.my-forms {
  padding: 2rem;
<<<<<<< HEAD
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
=======
  max-width: 700px;
  margin: 0 auto;
}

.my-forms h2 {
  margin-bottom: 1.5rem;
}

.my-forms h3 {
  margin-top: 2rem;
}

ul {
  padding-left: 1rem;
  list-style-type: disc;
}

li {
  margin-bottom: 0.5rem;
>>>>>>> e2f0a3ccf8f105aa565166e6822fdab31d8661a5
}
</style>
