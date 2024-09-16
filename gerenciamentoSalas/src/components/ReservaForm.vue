<template>
  <div class="reserva-form-container">
    <h2>Reservar Sala ou Laboratório</h2>
    <form @submit.prevent="submitReserva" class="reserva-form">
      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <select v-model="tipo" id="tipo" class="form-control">
          <option value="sala">Sala</option>
          <option value="laboratorio">Laboratório</option>
        </select>
      </div>
      <div class="form-group">
        <label for="id">ID:</label>
        <input v-model="id" type="number" id="id" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="inicio">Início:</label>
        <input v-model="inicio" type="datetime-local" id="inicio" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="fim">Fim:</label>
        <input v-model="fim" type="datetime-local" id="fim" class="form-control" required />
      </div>
      <button type="submit" class="btn-submit">Reservar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const tipo = ref('sala');
const id = ref(null);
const inicio = ref('');
const fim = ref('');

const submitReserva = async () => {
  try {
    await axios.post('/api/reservas', {
      tipo: tipo.value,
      id: id.value,
      inicio: inicio.value,
      fim: fim.value
    });
    alert('Reserva criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
  }
};
</script>

<style scoped>
.reserva-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.reserva-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.btn-submit:hover {
  background-color: #45a049;
}
</style>
