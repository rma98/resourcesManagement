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

        <!-- Botão de editar -->
        <button @click="iniciarEdicao(recurso)">Editar</button>

        <!-- Botão de remover -->
        <button @click="removerRecurso(recurso.id)" class="remover-btn">Remover</button>
      </div>
    </div>

    <!-- Se estiver editando um recurso, mostrar o formulário de edição -->
    <div v-if="recursoEditando">
      <h2>Editando Recurso</h2>
      <RecursoAdicionalForm :onSubmit="editarRecurso" :recursoAtual="recursoEditando" />
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
      recursoEditando: null, // Armazena o recurso que está sendo editado
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

    iniciarEdicao(recurso) {
      this.recursoEditando = { ...recurso }; // Clona o recurso para edição
    },

    editarRecurso(recursoEditado) {
      // Encontrar o índice do recurso que está sendo editado
      const index = this.recursos.findIndex(recurso => recurso.id === recursoEditado.id);
      // Atualizar o recurso com as novas informações
      if (index !== -1) {
        this.recursos.splice(index, 1, recursoEditado); // Atualiza o recurso na lista
      }
      this.recursoEditando = null; // Limpa o estado de edição
    },

    removerRecurso(id) {
      // Filtra a lista para remover o recurso
      this.recursos = this.recursos.filter(recurso => recurso.id !== id);
    }
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
  position: relative;
}

.recurso-card h2 {
  margin: 0 0 10px;
  font-size: 18px;
}

.recurso-card p {
  margin: 0 0 5px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

.remover-btn {
  background-color: #dc3545;
}

.remover-btn:hover {
  background-color: #c82333;
}

.form-editar-recurso {
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
