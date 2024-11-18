<template>
  <div class="main-layout">
    <Header @toggleSidebar="toggleSidebar" />
    <Sidebar :sidebarVisible="sidebarVisible" @closeSidebar="toggleSidebar" />
    <main>
      <router-view></router-view>
      <!-- Aqui as páginas serão renderizadas -->
    </main>
<<<<<<< HEAD
<<<<<<< HEAD
    <Footer />
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)
=======
    <Footer />
>>>>>>> e1d2f6c (feat: update MainLayout.vue)
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
<<<<<<< HEAD
<<<<<<< HEAD
import Footer from '../components/Footer.vue';
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)
=======
import Footer from '../components/Footer.vue';
>>>>>>> e1d2f6c (feat: update MainLayout.vue)

export default {
  components: {
    Header,
    Sidebar,
<<<<<<< HEAD
<<<<<<< HEAD
    Footer,
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)
=======
    Footer,
>>>>>>> e1d2f6c (feat: update MainLayout.vue)
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
<<<<<<< HEAD
=======
>>>>>>> f119fd6 (feat: Update component MainLayout.vue)
  min-height: 100vh;
  /* Define o mínimo como altura total da tela */
}

main {
  flex-grow: 1;
  /* Faz com que o conteúdo principal ocupe o espaço disponível */
<<<<<<< HEAD
=======
>>>>>>> bb3adb8 (feat: add MainLayout.vue)
=======
>>>>>>> f119fd6 (feat: Update component MainLayout.vue)
}
</style>
