<template>
  <form @submit.prevent="submitRecurso" class="form-adicionar-recurso">
    <div class="form-group">
      <label for="nome">Nome do Recurso:</label>
      <input v-model="recurso.nome" id="nome" type="text" required />
    </div>
    <div class="form-group">
      <label for="descricao">Descrição:</label>
      <input v-model="recurso.descricao" id="descricao" type="text" required />
    </div>
    <div class="form-group">
      <label for="quantidade">Quantidade:</label>
      <input v-model="recurso.quantidade" id="quantidade" type="number" required min="1" />
    </div>
    <button type="submit">{{ recursoAtual ? 'Salvar Alterações' : 'Adicionar Recurso' }}</button>
  </form>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    recursoAtual: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      recurso: this.recursoAtual
        ? { ...this.recursoAtual }
        : { nome: '', descricao: '', quantidade: null },
    };
  },
  watch: {
    recursoAtual(newRecurso) {
      if (newRecurso) {
        this.recurso = { ...newRecurso };
      }
    },
  },
  methods: {
    submitRecurso() {
      // Chama a função de envio passada pelo componente pai
      this.onSubmit(this.recurso);
      // Limpa o formulário
      this.recurso = { nome: '', descricao: '', quantidade: null };
    },
  },
};
</script>

<style scoped>
/* Estilização do formulário */
.form-adicionar-recurso {
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

input[type="text"],
input[type="number"] {
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
