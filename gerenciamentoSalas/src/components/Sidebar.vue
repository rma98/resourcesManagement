<template>
  <nav class="sidebar" :class="{ active: isActive }">
    <ul>
      <li @click="handleMenuClick('home')">
        <a href="#"><i class="fas fa-home"></i> Home</a>
      </li>
      <li @click="handleMenuClick('viewRooms')">
        <a href="#"><i class="fas fa-door-open"></i> Visualizar Salas</a>
      </li>
      <li @click="handleMenuClick('viewLabs')">
        <a href="#"><i class="fas fa-flask"></i> Visualizar Laboratórios</a>
      </li>
      <li v-if="isLoggedIn" @click="logout">
        <a href="#"><i class="fas fa-sign-out-alt"></i> Sair</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleMenuClick(option) {
      switch (option) {
        case 'home':
          // Permanece na página atual, não faz nada
          this.closeSidebar(); // Fecha o menu
          break;
        case 'viewRooms':
        case 'viewLabs':
          if (!this.isLoggedIn) {
            this.$emit('show-popup'); // Emite um evento para abrir o popup
          } else {
            const route = option === 'viewRooms' ? '/view-rooms' : '/view-labs';
            this.$router.push(route); // Redireciona para a página correspondente
          }
          this.closeSidebar(); // Fecha o menu após a seleção
          break;
        default:
          break;
      }
    },
    closeSidebar() {
      // Chama o método para fechar a sidebar
      this.$emit('close-sidebar'); // Emite um evento para o componente pai tratar o fechamento
    },
    logout() {
      // Adicione a lógica para logout aqui
      this.$emit('logout'); // Emite um evento para o componente pai tratar o logout
      this.closeSidebar(); // Fecha o menu após logout
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  position: fixed;
  right: -250px;
  top: 0;
  height: 100%;
  background-color: #388e3c; /* Cor de fundo da sidebar */
  transition: right 0.3s;
  z-index: 100;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
}

.sidebar.active {
  right: 0; /* Quando ativa, move para a direita */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 15px;
}

.sidebar ul li a {
  color: white; /* Cor do texto dos links */
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.sidebar ul li a:hover {
  background-color: #4caf50; /* Cor ao passar o mouse */
}

.sidebar ul li a i {
  margin-right: 10px;
  color: white; /* Cor dos ícones */
}
</style>