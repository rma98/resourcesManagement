<template>
  <header>
    <h1>
      <i class="fas fa-cog"></i>
      Gerenciamento de Salas e Laboratórios
    </h1>
    <div class="menu-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  }
};
</script>

<style scoped>
/* Adicione estilos para o cabeçalho aqui */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
}
header h1 {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin: 0;
}
header h1 i {
  margin-right: 10px;
}
.menu-toggle {
  cursor: pointer;
}
</style>
