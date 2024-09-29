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
      <li @click="handleMenuClick('home')"><i class="fas fa-home"></i> Home</li>
      <li @click="handleMenuClick('viewRooms')"><i class="fas fa-door-open"></i> Visualizar Salas</li>
      <li @click="handleMenuClick('viewLabs')"><i class="fas fa-flask"></i> Visualizar Laboratórios</li>
      <li @click="logout"><i class="fas fa-sign-out-alt"></i> Sair</li>
>>>>>>> 2dab87f (feat: atualiza componente Sidebar.vue)
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
      default: false
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
>>>>>>> 2dab87f (feat: atualiza componente Sidebar.vue)
  methods: {
    handleMenuClick(option) {
      if (!this.isLoggedIn) {
        this.$emit("show-popup"); // Emite um evento para abrir o popup
      } else {
        switch (option) {
          case "home":
            this.$router.push("/"); // Redireciona para a página Home
            break;
          case "viewRooms":
            this.$router.push("/view-rooms"); // Altere para o caminho correto
            break;
          case "viewLabs":
            this.$router.push("/view-labs"); // Altere para o caminho correto
            break;
        }
      }
>>>>>>> 6b4e234 (feat: atualiza componente Sidebar.vue)
    },
    logout() {
      // Implemente a lógica para deslogar o usuário
      console.log("Usuário deslogado");
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
  background-color: #388e3c;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s;
  z-index: 100;
}

.sidebar.active {
  right: 0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 15px;
}

.sidebar ul li a {
  font-size: 1.3rem;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.sidebar ul li a:hover {
  background-color: #4caf50;
}

.sidebar ul li a i {
  margin-right: 10px;
  color: white;
}

.logout-button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
