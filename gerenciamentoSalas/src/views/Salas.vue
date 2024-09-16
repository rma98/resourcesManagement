<template>
  <div class="salas-container">
    <h1>Salas</h1>

    <!-- Usar o componente de formulário para adicionar ou editar uma sala -->
    <SalaForm :onSubmit="adicionarSala" />

    <!-- Listagem de salas -->
    <div class="salas-list">
      <div v-for="sala in salas" :key="sala.id" class="sala-card">
        <h2>{{ sala.nome }}</h2>
        <p>{{ sala.tipo }}</p>
        <p>{{ sala.descricao }}</p>
        <p><strong>Status: </strong>{{ sala.status }}</p>

        <!-- Botão de editar -->
        <button @click="iniciarEdicao(sala)">Editar</button>

        <!-- Botão de remover -->
        <button @click="removerSala(sala.id)" class="remover-btn">Remover</button>
      </div>
    </div>

    <!-- Se estiver editando uma sala, mostrar o formulário de edição -->
    <div v-if="salaEditando">
      <h2>Editando Sala</h2>
      <SalaForm :onSubmit="editarSala" :salaAtual="salaEditando" />
    </div>
  </div>
</template>

<script>
import SalaForm from '../components/SalaForm.vue';

export default {
  components: {
    SalaForm,
  },
  data() {
    return {
      salas: [
        { id: 1, nome: 'Sala 101', tipo: 'Sala de Aula', descricao: 'Sala de aula ampla', status: 'Disponível' },
        { id: 2, nome: 'Laboratório 202', tipo: 'Laboratório', descricao: 'Lab com equipamentos de informática', status: 'Disponível' },
      ],
      salaEditando: null,
    };
  },
  methods: {
    adicionarSala(novaSala) {
      const novoId = this.salas.length + 1;
      this.salas.push({
        id: novoId,
        status: 'Disponível',
        ...novaSala,
      });
    },

    iniciarEdicao(sala) {
      this.salaEditando = { ...sala };
    },

    editarSala(salaEditada) {
      const index = this.salas.findIndex(sala => sala.id === salaEditada.id);
      if (index !== -1) {
        this.salas.splice(index, 1, salaEditada);
      }
      this.salaEditando = null;
    },

    removerSala(id) {
      this.salas = this.salas.filter(sala => sala.id !== id);
    }
  },
};
</script>

<style scoped>
.salas-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.salas-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.sala-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  width: 200px;
  background-color: #f9f9f9;
}

.sala-card h2 {
  margin: 0 0 10px;
  font-size: 18px;
}

.sala-card p {
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

.form-editar-sala {
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
