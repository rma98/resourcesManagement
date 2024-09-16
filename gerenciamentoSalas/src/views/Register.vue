<template>
  <div class="register-container">
    <h1 class="register-title">Cadastro</h1>
    <register-form />
  </div>
</template>

<script setup>
import RegisterForm from '../components/RegisterForm.vue';
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.register-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}
</style>
