<template>
  <div class="adicionar-container">
    <h1>Adicionar Sala/Laboratório</h1>
    <form @submit.prevent="adicionarRecurso">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" v-model="nome" id="nome" required />
      </div>

      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <select v-model="tipo" id="tipo" required>
          <option value="sala">Sala</option>
          <option value="laboratorio">Laboratório</option>
        </select>
      </div>

      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <textarea v-model="descricao" id="descricao" required></textarea>
      </div>

      <button type="submit">Adicionar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      tipo: 'sala', // Valor padrão
      descricao: '',
      status: 'disponível', // Status automático
    };
  },
  methods: {
    adicionarRecurso() {
      // Lógica para salvar o novo recurso (sala ou laboratório)
      const novoRecurso = {
        nome: this.nome,
        tipo: this.tipo,
        descricao: this.descricao,
        status: this.status,
      };

      // Aqui você deve adicionar a lógica de armazenamento (pode ser via API, Vuex, ou localStorage)
      console.log('Recurso adicionado:', novoRecurso);

      // Limpar o formulário após a submissão
      this.nome = '';
      this.tipo = 'sala';
      this.descricao = '';
    },
  },
};
</script>

<style scoped>
.adicionar-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
