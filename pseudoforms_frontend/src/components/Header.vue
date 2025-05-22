<template>
  <header>
    <router-link to="/" class="logo">FormHub</router-link>
    <nav class="nav-links">
    <router-link to="/login">
      <a href="/Login.vue">Logowanie/Rejestracja</a>
    </router-link>
    <router-link to="/manage-account">
      <a href="#">Dane konta</a>
    </router-link>
    </nav>
  </header>
</template>

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

.nav-links a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}
</style>