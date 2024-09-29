<template>
  <div class="container">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :isActive="isSidebarActive" />
    <main>
      <CardList :spaces="spaces" @card-clicked="handleCardClick" />
    </main>
    <Footer />
    <LoginPopup :showPopup="showLoginPopup" @close-popup="closePopup" /> <!-- Passando a prop -->
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
    LoginPopup,
  },
  data() {
    return {
      isSidebarActive: false,
      showLoginPopup: false, // Controle de visibilidade do popup de login
      isLoggedIn: false, // Simula estado de login
      spaces: [
        { title: 'Sala 101', status: 'Disponível', description: 'Laboratório de Informática', isAvailable: true },
        { title: 'Sala 102', status: 'Indisponível', description: 'Sala de aula com 30 lugares', isAvailable: false }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    },
    closePopup() {
      this.showLoginPopup = false; // Fecha o popup
    },
    handleCardClick(card) {
      console.log("Card clicado: ", card); // Verifica se o clique no card está funcionando
      if (!this.isLoggedIn) {
        this.showLoginPopup = true; // Abre o popup de login se o usuário não estiver logado
      } else {
        console.log(`Espaço reservado: ${card.title}`);
      }
    },
    redirectTo(page) {
      this.$router.push({ name: page });
    }
  }
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
