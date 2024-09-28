<template>
  <div class="container">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :isActive="isSidebarActive" />
    <main>
      <CardList />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import CardList from "../components/CardList.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Sidebar,
    CardList,
    Footer, // Importa o componente Footer
  },
  data() {
    return {
      isSidebarActive: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
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
