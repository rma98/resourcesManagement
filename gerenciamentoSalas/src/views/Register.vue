<template>
  <div class="form-wrapper">
    <div class="form-container">
      <h2>Cadastro</h2>
      <RegisterForm @submit="handleSubmit" />
      <div v-if="message.success" class="success">{{ message.success }}</div>
      <div v-if="message.error" class="error">{{ message.error }}</div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import axios from "axios";

export default {
  components: {
    RegisterForm,
  },
  data() {
    return {
      message: {
        success: "",
        error: "",
      },
    };
  },
  methods: {
    async handleSubmit(userData) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/usuarios",
          {
            nome: userData.name,
            email: userData.email,
            senha: userData.password,
            tipo: userData.type.toUpperCase(), // Convertemos para uppercase, conforme o enum
          }
        );

        // Exibir mensagem de sucesso
        this.message.success = "Usuário cadastrado com sucesso!";
        this.message.error = ""; // Limpar qualquer mensagem de erro
        console.log("Cadastro realizado:", response.data);

        // Atrasar o redirecionamento para exibir a mensagem de sucesso
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000); // Atrasar por 2 segundos
      } catch (error) {
        if (error.response) {
          // Verifica se o erro é por email duplicado
          if (error.response.status === 400) {
            const errorMessage =
              error.response.data.message ||
              "O email já está em uso. Por favor, use outro.";
            this.message.error = errorMessage; // Mensagem específica para e-mail duplicado
          } else {
            // Exibir mensagem de erro genérica para outros erros
            this.message.error =
              "Erro ao cadastrar o usuário. Tente novamente.";
          }
        } else {
          // Mensagem genérica se não houver resposta do servidor
          this.message.error = "Erro ao cadastrar o usuário. Tente novamente.";
        }
        this.message.success = ""; // Limpar qualquer mensagem de sucesso
        console.error("Erro ao cadastrar o usuário:", error);
      }
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  height: 100vh; /* Altura total da janela */
  background: linear-gradient(135deg, #4caf50, #388e3c); /* Fundo gradiente */
}

.form-container {
  background-color: white;
  color: #333;
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.5s ease-out;
}

/* Animação de descer */
@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
