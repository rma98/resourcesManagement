<template>
  <form @submit.prevent="submitSala" class="form-adicionar-sala">
    <div class="form-group">
      <label for="nome">Nome da Sala:</label>
      <input v-model="sala.nome" id="nome" type="text" required />
    </div>
    <div class="form-group">
      <label for="tipo">Tipo:</label>
      <input v-model="sala.tipo" id="tipo" type="text" required />
    </div>
    <div class="form-group">
      <label for="descricao">Descrição:</label>
      <input v-model="sala.descricao" id="descricao" type="text" required />
    </div>
    <button type="submit">{{ salaAtual ? 'Salvar Alterações' : 'Adicionar Sala' }}</button>
  </form>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    salaAtual: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      sala: this.salaAtual
        ? { ...this.salaAtual }
        : { nome: '', tipo: '', descricao: '' },
    };
  },
  watch: {
    salaAtual(newSala) {
      if (newSala) {
        this.sala = { ...newSala };
      }
    },
  },
  methods: {
    submitSala() {
      this.onSubmit(this.sala);
      this.sala = { nome: '', tipo: '', descricao: '' };
    },
  },
};
</script>

<style scoped>
.form-adicionar-sala {
  margin-bottom: 30px;
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
