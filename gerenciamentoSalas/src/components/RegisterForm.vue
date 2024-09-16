<template>
  <form class="register-form" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">Nome</label>
      <input type="text" id="name" v-model="formData.name" required />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email" required />
    </div>
    <div class="form-group">
      <label for="password">Senha</label>
      <input type="password" id="password" v-model="formData.password" required />
    </div>
    <div class="form-group">
      <label for="type">Tipo de Usuário</label>
      <select id="type" v-model="formData.type" required>
        <option value="professor">Professor</option>
        <option value="coordenador">Coordenador</option>
      </select>
    </div>
    <button type="submit">Cadastrar</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  password: '',
  type: 'professor', // valor padrão
});

const submitForm = () => {
  console.log('Formulário enviado:', formData);
  // Aqui você pode adicionar a lógica de envio para o backend
};
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

input, select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
