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
        @card-clicked="handleCardClick"
      />
    </div>
  </section>
</template>

<script>
import Card from './Card.vue';

export default {
  components: {
    Card
  },
  props: {
    spaces: Array // Recebe os espaços via props
  },
  methods: {
    handleCardClick(card) {
      this.$emit('card-clicked', card); // Propaga o evento para o componente pai
    }
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
