<template>
  <div class="recurso-adicional-container">
    <h1>Recursos Adicionais</h1>

    <!-- Usar o componente de formulário para adicionar recursos -->
    <RecursoAdicionalForm :onSubmit="adicionarRecurso" />

    <!-- Listagem de recursos -->
    <div class="recursos-list">
      <div v-for="recurso in recursos" :key="recurso.id" class="recurso-card">
        <h2>{{ recurso.nome }}</h2>
        <p>{{ recurso.descricao }}</p>
        <p><strong>Quantidade disponível: </strong>{{ recurso.quantidade }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecursoAdicionalForm from '../components/RecursoAdicionalForm.vue'; // Importando o componente

export default {
  components: {
    RecursoAdicionalForm,
  },
  data() {
    return {
      recursos: [
        { id: 1, nome: 'Data Show', descricao: 'Projetor para apresentações', quantidade: 10 },
        { id: 2, nome: 'Computador', descricao: 'Computador para aulas interativas', quantidade: 5 },
        { id: 3, nome: 'Caixa de Som', descricao: 'Sistema de som para eventos', quantidade: 8 },
      ],
    };
  },
  methods: {
    adicionarRecurso(novoRecurso) {
      const novoId = this.recursos.length + 1;
      this.recursos.push({
        id: novoId,
        ...novoRecurso,
      });
    },
  },
};
</script>

<style scoped>
/* Estilos da página */
.recurso-adicional-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.recursos-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.recurso-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  width: 200px;
  background-color: #f9f9f9;
}

.recurso-card h2 {
  margin: 0 0 10px;
  font-size: 18px;
}

.recurso-card p {
  margin: 0 0 5px;
}
</style>
