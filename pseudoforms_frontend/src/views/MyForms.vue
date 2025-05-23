<template>
  <div>
    <Header />
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
      userId: null,
      createdForms: [],
      answeredForms: [],
    };
  },
  async created() {
    this.user.name = localStorage.getItem('this.user.name');
    if (!this.user.name) {
      console.warn('Brak userId — przekierowanie na stronę główną');
      this.$router.push('/');
      return;
    }

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
      }
    } catch (err) {
      console.error('Błąd przy pobieraniu formularzy:', err);
    }
  }
};
</script>

<style scoped>
.my-forms {
  padding: 2rem;
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
}
</style>
