<template>
  <div class="home-container">
    <MenuSidebar />
    <main class="main-content">
      <h1>Bem-vindo à Página Inicial</h1>
      <button class="add-button" @click="handleAdd">Adicionar Sala/Lab</button>
      <div class="cards-container">
        <div v-for="item in items" :key="item.id" class="card" :class="{'indisponivel': item.status.includes('Reservado')}">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p class="status">
            Status: 
            <span :class="{'disponivel': item.status === 'Disponível', 'reservado': item.status.includes('Reservado')}">
              {{ item.status }}
            </span>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import MenuSidebar from '../components/MenuSidebar.vue';

export default {
  name: 'Home',
  components: {
    MenuSidebar,
  },
  data() {
    return {
      items: [
        { id: 1, name: 'Sala 01', description: 'Descrição da Sala 01', status: 'Disponível' },
        { id: 2, name: 'Sala 02', description: 'Descrição da Sala 02', status: 'Reservado(a) de 7:00 às 9:30' },
        { id: 3, name: 'Sala 03', description: 'Descrição da Sala 03', status: 'Disponível' },
        { id: 5, name: 'Lab 05', description: 'Descrição do Lab 05', status: 'Disponível' },
        { id: 6, name: 'Lab 06', description: 'Descrição do Lab 06', status: 'Reservado(a) de 10:00 às 12:00' },
        { id: 7, name: 'Lab 07', description: 'Descrição do Lab 07', status: 'Disponível' },
      ],
    };
  },
  methods: {
    handleAdd() {
      // Redirecionar para a página de adicionar sala/lab
      this.$router.push('/adicionar');
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  gap: 20px;
  margin: 20px;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.add-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card.indisponivel {
  background-color: #ffe5e5;
}

.card h3 {
  margin-top: 0;
  font-size: 1.5rem;
}

.status {
  margin-top: 10px;
  font-weight: bold;
}

.status .disponivel {
  color: #28a745;
}

.status .reservado {
  color: #dc3545;
}
</style>