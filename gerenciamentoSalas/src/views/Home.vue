<template>
  <div class="container">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :isActive="isSidebarActive" />
    <main>
      <CardList :spaces="spaces" @card-clicked="handleCardClick" />
    </main>
    <Footer />
    <LoginPopup v-if="showLoginPopup" @close-popup="closePopup" />
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
      spaces: [ // Exemplo de dados de espaços
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
      if (!this.isLoggedIn) {
        this.showLoginPopup = true; // Abre o popup de login se o usuário não estiver logado
      } else {
        console.log(`Espaço reservado: ${card.title}`);
      }
    },
    redirectTo(page) {
      this.$router.push({ name: page }); // Redireciona para a página de login ou cadastro
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
