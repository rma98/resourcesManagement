<template>
  <div class="container">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :isActive="isSidebarActive" />
    <main>
      <CardList />
    </main>
    <footer>
      <p>Rodapé com links para redes sociais.</p>
    </footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import CardList from '../components/CardList.vue';

export default {
  components: {
    Header,
    Sidebar,
    CardList
  },
  data() {
    return {
      isSidebarActive: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* Faz com que os elementos fiquem um abaixo do outro */
  min-height: 100vh; /* Garante que a altura da página ocupe a tela inteira */
}
main {
  flex: 1; /* Ocupar o espaço restante */
}
footer {
  text-align: center;
  padding: 10px;
  background-color: #4caf50;
  color: white;
}
</style>
