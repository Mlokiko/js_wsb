<template>
  <div>
    <Header />
    <h1>Rejestracja</h1>
    <form @submit.prevent="register">
      <label for="name">Nazwa użytkownika:</label>
      <input type="text" id="name" v-model="name" required />
      <br />
      <label for="email">Adres e-mail:</label>
      <input type="email" id="email" v-model="email" required />
      <br />
      <label for="password">Hasło:</label>
      <input type="password" id="password" v-model="password" required />
      <br />
      <button type="submit">Zarejestruj się</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    register() {
      axios.put('http://localhost:3000/users/register', {
  name: this.name,
  email: this.email,
  password: this.password
})
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data)); // Zapisanie sesji
        this.$router.push('/'); // Przekierowanie na stronę główną
      })
      .then(response => {
    localStorage.setItem('user.name', response.data.name); // Zapisanie nazwy użytkownika
    this.$router.push('/'); // Przekierowanie na stronę główną
  })
      .catch(error => {
        this.errorMessage = 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.'; // Ustawienie komunikatu o błędzie
        console.error(error);
      });
    }
  }
}
</script>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #4f46e5;
  margin: 2rem 0;
}

form {
  max-width: 500px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

button[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #4338ca;
}

.error {
  color: #e53e3e;
  font-size: 0.875rem;
  margin: 1rem 0;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  form {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
}
</style>
