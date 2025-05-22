<template>
  <div>
    <Header />
    <form>
    <h1>Zarządzanie kontem</h1>
    <p>Witaj, {{ user.name }}!</p>
    <p>Twoje konto:</p>
    <ul>
      <li>Imię i nazwisko: {{ user.name }}</li>
      <li>Adres e-mail: {{ user.email }}</li>
    </ul>
    <button @click="logout">Wyloguj się</button>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'ManageAccount',
  components: {
      Header,
      Footer
    },
  data() {
    return {
      user: {}
    }
  },
  
  methods: {
    logout() {
      axios.post('/api/logout')
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    color: #4f46e5;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #3b3f54;
  }
</style>
