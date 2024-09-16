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
        <!-- Exemplos de cartões de sala e laboratório (vazios para agora) -->
        <div v-for="item in items" :key="item.id" class="card">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p>Status: {{ item.status }}</p>
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
        // Dados fictícios para as salas e laboratórios
        { id: 1, name: 'Sala 01', description: 'Descrição da Sala 01', status: 'Disponível' },
        { id: 2, name: 'Sala 02', description: 'Descrição da Sala 02', status: 'Reservado(a) de 7:00 às 9:30' },
        { id: 3, name: 'Sala 03', description: 'Descrição da Sala 03', status: 'Disponível' },
        // Adicione mais itens conforme necessário
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
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  margin-top: 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a,
.sidebar button {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
  border-radius: 4px;
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
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
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
  border-radius: 4px;
  padding: 15px;
  width: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-top: 0;
}
</style>
