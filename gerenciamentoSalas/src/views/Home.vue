<template>
  <div class="home-container">
    <aside class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/salas">Salas</router-link></li>
        <li><router-link to="/laboratorios">Laboratórios</router-link></li>
        <li><router-link to="/recursos-adicionais">Recursos Adicionais</router-link></li>
        <li><button @click="handleLogout">Sair</button></li>
      </ul>
    </aside>
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
export default {
  name: 'Home',
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
    handleLogout() {
      // Lógica para logout (redirecionar ou limpar dados de autenticação)
      console.log('Logout');
    },
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

.sidebar {
  width: 220px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  margin-top: 0;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 15px;
}

.sidebar a,
.sidebar button {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.sidebar a:hover,
.sidebar button:hover {
  background-color: #ddd;
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
