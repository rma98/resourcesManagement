<template>
  <div class="laboratorios-container">
    <h1>Laboratórios</h1>

    <!-- Usar o componente de formulário para adicionar ou editar um laboratório -->
    <LaboratorioForm :onSubmit="adicionarLaboratorio" />

    <!-- Listagem de laboratórios -->
    <div class="laboratorios-list">
      <div v-for="laboratorio in laboratorios" :key="laboratorio.id" class="laboratorio-card">
        <h2>{{ laboratorio.nome }}</h2>
        <p>{{ laboratorio.tipo }}</p>
        <p>{{ laboratorio.descricao }}</p>
        <p><strong>Status: </strong>{{ laboratorio.status }}</p>

        <!-- Botão de editar -->
        <button @click="iniciarEdicao(laboratorio)">Editar</button>

        <!-- Botão de remover -->
        <button @click="removerLaboratorio(laboratorio.id)" class="remover-btn">Remover</button>
      </div>
    </div>

    <!-- Se estiver editando um laboratório, mostrar o formulário de edição -->
    <div v-if="laboratorioEditando">
      <h2>Editando Laboratório</h2>
      <LaboratorioForm :onSubmit="editarLaboratorio" :laboratorioAtual="laboratorioEditando" />
    </div>
  </div>
</template>

<script>
import LaboratorioForm from '../components/LaboratorioForm.vue';

export default {
  components: {
    LaboratorioForm,
  },
  data() {
    return {
      laboratorios: [
        { id: 1, nome: 'Lab 101', tipo: 'Laboratório de Química', descricao: 'Equipado com reagentes químicos', status: 'Disponível' },
        { id: 2, nome: 'Lab 202', tipo: 'Laboratório de Física', descricao: 'Laboratório com equipamentos de física', status: 'Disponível' },
      ],
      laboratorioEditando: null,
    };
  },
  methods: {
    adicionarLaboratorio(novoLaboratorio) {
      const novoId = this.laboratorios.length + 1;
      this.laboratorios.push({
        id: novoId,
        status: 'Disponível',
        ...novoLaboratorio,
      });
    },

    iniciarEdicao(laboratorio) {
      this.laboratorioEditando = { ...laboratorio };
    },

    editarLaboratorio(laboratorioEditado) {
      const index = this.laboratorios.findIndex(laboratorio => laboratorio.id === laboratorioEditado.id);
      if (index !== -1) {
        this.laboratorios.splice(index, 1, laboratorioEditado);
      }
      this.laboratorioEditando = null;
    },

    removerLaboratorio(id) {
      this.laboratorios = this.laboratorios.filter(laboratorio => laboratorio.id !== id);
    }
  },
};
</script>

<style scoped>
.laboratorios-container {
    margin-bottom: 30px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.laboratorios-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.laboratorio-card {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
    width: 200px;
    background-color: #f9f9f9;
}

.laboratorio-card h2 {
    margin: 0 0 10px;
    font-size: 18px;
}

.laboratorio-card p {
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

.form-editar-laboratorio {
    margin-top: 30px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}
</style>
