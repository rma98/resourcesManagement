<!-- src/components/MenuSidebar.vue -->
<template>
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
</template>

<script>
export default {
  name: 'MenuSidebar',
  methods: {
    handleLogout() {
      // Lógica para logout (redirecionar ou limpar dados de autenticação)
      console.log('Logout');
    },
  },
};
</script>

<style scoped>
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
</style>
