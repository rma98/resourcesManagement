<template>
  <section class="cards-section">
    <h2>Espaços Disponíveis</h2>
    <div class="cards-container">
      <Card
        v-for="(space, index) in spaces"
        :key="index"
        :title="space.title"
        :status="space.status"
        :description="space.description"
        :isAvailable="space.isAvailable"
      />
    </div>
  </section>
</template>

<script>
import Card from './Card.vue';

export default {
  components: { Card },
  data() {
    return {
      spaces: [
        { title: 'Sala 01', status: 'Disponível', description: 'Sala de aula para 40 alunos, equipada com projetor.', isAvailable: true },
        { title: 'Laboratório 01', status: 'Indisponível', description: 'Laboratório de Informática com 20 computadores.', isAvailable: false },
        { title: 'Sala 02', status: 'Disponível', description: 'Sala equipada para aulas multimídia com até 30 alunos.', isAvailable: true }
        // Adicione mais espaços conforme necessário
      ]
    };
  }
};
</script>

<style scoped>
.cards-section {
  margin-left: 260px; /* Espaço para a sidebar */
  padding: 20px;
}
.cards-section h2 {
  color: #000;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
