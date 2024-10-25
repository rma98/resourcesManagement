<template>
  <div class="main-layout">
    <Header @toggleSidebar="toggleSidebar" />
    <Sidebar :sidebarVisible="sidebarVisible" @closeSidebar="toggleSidebar" />
    <main>
      <router-view></router-view>
      <!-- Aqui as páginas serão renderizadas -->
    </main>
<<<<<<< HEAD
    <Footer />
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
<<<<<<< HEAD
import Footer from '../components/Footer.vue';
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)

export default {
  components: {
    Header,
    Sidebar,
<<<<<<< HEAD
    Footer,
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)
  },
  data() {
    return {
      sidebarVisible: false, // Controle da visibilidade da Sidebar
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible; // Alterna a visibilidade da Sidebar
    },
    closeSidebar() {
      this.sidebarVisible = false; // Fecha a sidebar
    }
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  min-height: 100vh;
  /* Define o mínimo como altura total da tela */
}

main {
  flex-grow: 1;
  /* Faz com que o conteúdo principal ocupe o espaço disponível */
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)
}
</style>
