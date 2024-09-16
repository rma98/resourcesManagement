<template>
  <div class="login-page">
    <h1>Login</h1>
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue';
</script>

<style scoped>
/* Estilos específicos para o componente Login.vue */
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
}

h1 {
  font-size: 2rem;
  color: #333;
}
</style>
