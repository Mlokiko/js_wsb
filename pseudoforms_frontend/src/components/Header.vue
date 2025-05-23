<template>
  <header>
    <router-link to="/" class="logo">FormHub</router-link>
    <nav class="nav-links">
      <router-link v-if="!isLoggedIn" to="/login">Logowanie/Rejestracja</router-link>
      <router-link v-if="isLoggedIn" to="/my-forms">Moje formularze</router-link>
      <router-link v-if="isLoggedIn" to="/manage-account">Dane konta</router-link>
      <a v-if="isLoggedIn" @click.prevent="logout" href="#">Wyloguj</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('user'); // Sprawdzenie, czy użytkownik jest zalogowany
  },
  methods: {
    logout() {
      localStorage.removeItem('user'); // Usunięcie sesji
      localStorage.removeItem('userId'); // (jeśli używasz userId też!)
      this.isLoggedIn = false;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
header {
  background-color: #4f46e5;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a,
.nav-links .router-link-active {
  color: white;
  text-decoration: none;
}
</style>
