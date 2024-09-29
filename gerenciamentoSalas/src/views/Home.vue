<template>
  <div class="container">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :isActive="isSidebarActive" />
    <main>
      <CardList />
    </main>
    <!-- Chama o LoginPopup.vue -->
    <LoginPopup 
      :showPopup="showLoginPopup" 
      @close-popup="closePopup" 
      @redirect="redirectTo"
    />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import CardList from "../components/CardList.vue";
import Footer from "../components/Footer.vue";
import LoginPopup from "../components/LoginPopup.vue";

export default {
  components: {
    Header,
    Sidebar,
    CardList,
    Footer,
    LoginPopup, // Adiciona o componente LoginPopup
  },
  data() {
    return {
      isSidebarActive: false,
      showLoginPopup: false, // Controle de visibilidade do popup de login
      isLoggedIn: false, // Simula estado de login
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    },
    closePopup() {
      this.showLoginPopup = false; // Fecha o popup
    },
    redirectTo(page) {
      this.$router.push({ name: page }); // Redireciona para a página de login ou cadastro
    },
    handleCardClick(card) {
      if (!this.isLoggedIn) {
        this.showLoginPopup = true; // Abre o popup de login se o usuário não estiver logado
      } else {
        console.log(`Espaço reservado: ${card.name}`);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
  padding: 20px;
}
</style>
