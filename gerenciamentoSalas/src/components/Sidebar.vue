<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <!-- Sidebar -->
  <nav class="sidebar" :class="{ active: sidebarVisible }" id="sidebar">
    <ul>
      <li>
        <router-link to="/" @click="$emit('closeSidebar')"
          ><i class="fas fa-home fa-2x"></i> Home</router-link
        >
      </li>
      <!-- <li>
        <router-link to="/view-room" @click="$emit('closeSidebar')"
          ><i class="fas fa-door-open fa-2x"></i> Visualizar Salas</router-link
        >
      </li>
      <li>
        <router-link to="/view-lab" @click="$emit('closeSidebar')"
          ><i class="fas fa-flask fa-2x"></i> Visualizar
          Laboratórios</router-link
        >
      </li> -->
      <li v-if="isCoordinator">
        <router-link to="/add-recurso" @click="$emit('closeSidebar')"
          ><i class="fas fa-plus fa-2x"></i> Adicionar Recurso</router-link
        >
      </li>
      <li id="loginMenu">
        <router-link to="/login" @click="$emit('closeSidebar')"
          ><i class="fas fa-user-circle fa-2x"></i> Login</router-link
        >
      </li>
      <li id="registerMenu">
        <router-link to="/register" @click="$emit('closeSidebar')"
          ><i class="fas fa-user-plus fa-2x"></i> Cadastro</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link to="/perfil" @click="$emit('closeSidebar')"
          ><i class="fas fa-user fa-2x"></i> Perfil</router-link
        >
      </li>
      <!-- Renderiza o botão 'Sair' apenas se o usuário estiver logado -->
      <li v-if="isLoggedIn">
        <button @click="logoutAndClose" class="logout-button">
          <i class="fas fa-sign-out-alt fa-2x"></i> Sair
        </button>
      </li>
=======
  <nav>
    <ul>
      <li @click="handleMenuClick('home')">Home</li>
      <li @click="handleMenuClick('viewRooms')">Visualizar Salas</li>
      <li @click="handleMenuClick('viewLabs')">Visualizar Laboratórios</li>
>>>>>>> 6b4e234 (feat: atualiza componente Sidebar.vue)
=======
  <nav class="sidebar" :class="{ active: isActive }">
    <ul>
<<<<<<< HEAD
      <li @click="handleMenuClick('home')"><i class="fas fa-home"></i> Home</li>
      <li @click="handleMenuClick('viewRooms')"><i class="fas fa-door-open"></i> Visualizar Salas</li>
      <li @click="handleMenuClick('viewLabs')"><i class="fas fa-flask"></i> Visualizar Laboratórios</li>
      <li @click="logout"><i class="fas fa-sign-out-alt"></i> Sair</li>
>>>>>>> 2dab87f (feat: atualiza componente Sidebar.vue)
=======
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
>>>>>>> 1d8af65 (feat: atualiza componente Sidebar.vue)
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
<<<<<<< HEAD
<<<<<<< HEAD
  props: {
    sidebarVisible: Boolean,
  },
  computed: {
    // Computed property para verificar se o usuário está logado
    ...mapState({
      isLoggedIn: (state) => !!state.user.name, // Considera logado se o nome de usuário existir
    }),
    isCoordinator() {
      return (
        this.$store.state.user && this.$store.state.user.role === "COORDENADOR"
      );
    },
  },
  methods: {
    ...mapActions(["logout"]),
    logoutAndClose() {
      this.logout(); // Executa o logout
      this.$emit("closeSidebar"); // Emite o evento para fechar a sidebar
=======
  props: ["isLoggedIn"],
=======
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
>>>>>>> 2dab87f (feat: atualiza componente Sidebar.vue)
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
>>>>>>> 6b4e234 (feat: atualiza componente Sidebar.vue)
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
<<<<<<< HEAD
  background-color: #388e3c;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
=======
  background-color: #388e3c; /* Cor de fundo da sidebar */
>>>>>>> 1d8af65 (feat: atualiza componente Sidebar.vue)
  transition: right 0.3s;
  z-index: 100;
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
<<<<<<< HEAD
  font-size: 1.3rem;
  color: white;
=======
  color: white; /* Cor do texto dos links */
>>>>>>> 1d8af65 (feat: atualiza componente Sidebar.vue)
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
<<<<<<< HEAD
  color: white;
}

.logout-button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
=======
  color: white; /* Cor dos ícones */
>>>>>>> 1d8af65 (feat: atualiza componente Sidebar.vue)
}
</style>