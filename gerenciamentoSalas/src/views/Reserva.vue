<template>
  <div class="reserva-container">
    <h1>Minhas Reservas</h1>
    <div v-if="reservas.length === 0" class="empty-state">
      <p>Não há reservas no momento.</p>
    </div>
    <div v-else class="reservas-list">
      <div v-for="reserva in reservas" :key="reserva.id" class="reserva-card">
        <h3>{{ reserva.tipo }} {{ reserva.id }}</h3>
        <p>Início: {{ reserva.inicio }}</p>
        <p>Fim: {{ reserva.fim }}</p>
        <p>Status: {{ reserva.status }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const reservas = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/reservas');
    reservas.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar reservas:', error);
  }
});
</script>

<style scoped>
.reserva-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.reserva-container h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.empty-state {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.reservas-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.reserva-card {
  padding: 1.5rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.reserva-card h3 {
  margin-bottom: 0.5rem;
}

.reserva-card p {
  margin: 0.25rem 0;
}
</style>
