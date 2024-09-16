<template>
  <form @submit.prevent="submitLaboratorio" class="form-adicionar-laboratorio">
    <div class="form-group">
      <label for="nome">Nome do Laboratório:</label>
      <input v-model="laboratorio.nome" id="nome" type="text" required />
    </div>
    <div class="form-group">
      <label for="tipo">Tipo:</label>
      <input v-model="laboratorio.tipo" id="tipo" type="text" required />
    </div>
    <div class="form-group">
      <label for="descricao">Descrição:</label>
      <input v-model="laboratorio.descricao" id="descricao" type="text" required />
    </div>
    <button type="submit">{{ laboratorioAtual ? 'Salvar Alterações' : 'Adicionar Laboratório' }}</button>
  </form>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    laboratorioAtual: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      laboratorio: this.laboratorioAtual
        ? { ...this.laboratorioAtual }
        : { nome: '', tipo: '', descricao: '' },
    };
  },
  watch: {
    laboratorioAtual(newLaboratorio) {
      if (newLaboratorio) {
        this.laboratorio = { ...newLaboratorio };
      }
    },
  },
  methods: {
    submitLaboratorio() {
      this.onSubmit(this.laboratorio);
      this.laboratorio = { nome: '', tipo: '', descricao: '' };
    },
  },
};
</script>

<style scoped>
.form-adicionar-laboratorio {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
