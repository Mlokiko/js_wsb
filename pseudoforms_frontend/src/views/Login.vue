<template>
  <div>
    <Header />
    <h1>Logowanie</h1>
    <form @submit.prevent="login">
      <label for="email">Adres e-mail:</label>
      <input type="email" id="email" v-model="email" required />
      <br />
      <label for="password">Hasło:</label>
      <input type="password" id="password" v-model="password" required />
      <br />
      <button type="submit">Zaloguj się</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <label for="Register">Lub jeśli nie masz jeszcze konta:</label>
      <router-link to="/Register">
      <button class="Register-button">Zarejestruj się</button>
      </router-link>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default {
  name: 'Login',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      // Login.vue
axios.post('http://localhost:3000/users/login', {
  email: this.email,
  password: this.password
})

      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data)); // Zapisanie sesji
        this.$router.push('/'); // Przekierowanie na stronę główną
      }).then(response => {
    localStorage.setItem('user.name', response.data.name); // Zapisanie nazwy użytkownika
    this.$router.push('/'); // Przekierowanie na stronę główną
  })
  .catch(error => {
    this.errorMessage = 'Wystąpił błąd podczas logowania. Sprawdź swoje dane i spróbuj ponownie.';
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
  font-size: 2.5rem;
  color: #4f46e5;
  margin: 2rem 0;
}

form {
  max-width: 500px;
  width: 90%;
  margin: 0 auto;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  transition: border-color 0.3s ease;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

button {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button[type="submit"] {
  background-color: #4f46e5;
  color: white;
  border: none;
}

button[type="submit"]:hover {
  background-color: #4338ca;
}

.Register-button {
  background-color: white;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  margin-top: 1rem;
}

.Register-button:hover {
  background-color: #f5f3ff;
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
    padding: 2rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>