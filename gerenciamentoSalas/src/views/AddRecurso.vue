<template>
    <div class="view-container">
        <div class="login-container">
            <!-- Formulário -->
            <div class="form-wrapper">
                <form @submit.prevent="submitRecurso">
                    <div class="header">
                        <i class="fas fa-plus-circle"></i>
                        <h2>{{ formTitle }}</h2>
                    </div>

                    <label for="nome">Nome:</label>
                    <input type="text" v-model="recursoData.nome" required @input="validateField('nome')" />
                    <small v-if="errors.nome" class="error-message">{{ errors.nome }}</small>

                    <label for="descricao">Descrição:</label>
                    <textarea v-model="recursoData.descricao" required @input="validateField('descricao')"></textarea>
                    <small v-if="errors.descricao" class="error-message">{{ errors.descricao }}</small>

                    <label for="capacidade">Capacidade:</label>
                    <input type="number" v-model="recursoData.capacidade" required
                        @input="validateField('capacidade')" />
                    <small v-if="errors.capacidade" class="error-message">{{ errors.capacidade }}</small>

                    <!-- Removido o campo de Status -->
                    <!-- <label for="status">Status:</label>
            <select v-model="recursoData.status" required>
              <option v-for="(label, value) in getStatusOpts" :key="value" :value="value">
                {{ label }}
              </option>
            </select> -->

                    <label for="tipo">Tipo de Recurso:</label>
                    <select v-model="recursoData.tipoRecurso" required>
                        <option v-for="(label, value) in getTipoRecursoOpts" :key="value" :value="value">
                            {{ label }}
                        </option>
                    </select>

                    <label for="localizacao">Localização:</label>
                    <input type="text" v-model="recursoData.localizacao" required
                        @input="validateField('localizacao')" />
                    <small v-if="errors.localizacao" class="error-message">{{ errors.localizacao }}</small>

                    <button type="submit" :disabled="hasErrors || isSubmitting">{{ buttonText }}</button>

                    <!-- Mensagem de feedback abaixo do botão -->
                    <div v-if="message" :class="messageType === 'success' ? 'success-message' : 'error-message'">
                        {{ message }}
                    </div>
                </form>
            </div>

            <!-- Div do vídeo -->
            <div class="video-wrapper">
                <video autoplay loop muted>
                    <source src="../assets/video/Setup.mp4" type="video/mp4" />
                    Seu navegador não suporta o formato de vídeo.
                </video>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            recursoData: {
                nome: "",
                descricao: "",
                capacidade: 0,
                tipoRecurso: "SALA",
                localizacao: "",
                // Remover o campo de status aqui
            },
            errors: {
                nome: "",
                descricao: "",
                capacidade: "",
                localizacao: "",
            },
            message: "",
            messageType: "",
            isSubmitting: false, // Novo estado para controle de envio
        };
    },
    computed: {
        ...mapGetters(["getTipoRecursoOpts"]),
        formTitle() {
            return this.recursoData.tipoRecurso === "SALA"
                ? "Adicionar Sala"
                : "Adicionar Laboratório";
        },
        buttonText() {
            return this.recursoData.tipoRecurso === "SALA"
                ? "Adicionar Sala"
                : "Adicionar Laboratório";
        },
        hasErrors() {
            return Object.values(this.errors).some((error) => error !== "");
        },
    },
    methods: {
        validateField(field) {
            const value = this.recursoData[field];
            switch (field) {
                case "nome":
                    if (value.length < 3) {
                        this.errors.nome = "O nome deve ter pelo menos 3 caracteres.";
                    } else if (value.length > 50) {
                        this.errors.nome = "O nome deve ter no máximo 50 caracteres.";
                    } else if (!/^[a-zA-Z0-9áàãâäéèêëíìîïóòôöúùûüç\s]+$/.test(value)) {
                        this.errors.nome = "O nome deve conter apenas letras, números e espaços.";
                    } else {
                        this.errors.nome = "";
                    }
                    break;
                case "descricao":
                    if (value.length < 10) {
                        this.errors.descricao = "A descrição deve ter pelo menos 10 caracteres.";
                    } else if (value.length > 200) {
                        this.errors.descricao = "A descrição deve ter no máximo 200 caracteres.";
                    } else {
                        this.errors.descricao = "";
                    }
                    break;
                case "capacidade":
                    if (value < 1) {
                        this.errors.capacidade = "A capacidade deve ser pelo menos 1.";
                    } else if (value > 1000) {
                        this.errors.capacidade = "A capacidade deve ser no máximo 1000.";
                    } else {
                        this.errors.capacidade = "";
                    }
                    break;
                case "localizacao":
                    if (value.length < 3) {
                        this.errors.localizacao = "A localização deve ter pelo menos 3 caracteres.";
                    } else if (value.length > 100) {
                        this.errors.localizacao = "A localização deve ter no máximo 100 caracteres.";
                    } else {
                        this.errors.localizacao = "";
                    }
                    break;
            }
        },
        async submitRecurso() {
            // Validação dos campos
            this.validateField("nome");
            this.validateField("descricao");
            this.validateField("capacidade");
            this.validateField("localizacao");

            // Verifica se há erros de validação
            if (this.hasErrors) {
                this.showError("Por favor, corrija os erros antes de enviar.");
                return;
            }

            // Desabilita o botão e ativa o estado de envio
            this.isSubmitting = true;

            try {
                // Preparar o recurso com status "DISPONIVEL"
                const recursoDTO = {
                    ...this.recursoData,  // Dados do recurso
                    status: "DISPONIVEL",  // Definir o status como "DISPONIVEL" por padrão
                };

                try {
                    // Recuperar o token de autenticação do localStorage
                    const token = localStorage.getItem("token");
                    if (!token) {
                        throw new Error("Token de autenticação não encontrado.");
                    }
                    if (!token) {
                        throw new Error("Token de autenticação não encontrado.");
                    }

                    // Fazer a requisição POST com o token no cabeçalho
                    const response = await fetch("http://localhost:8080/api/recursos", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(recursoDTO),  // Envia o objeto recurso
                    });

                    // Processar a resposta do servidor
                    await this.handleResponse(response);
                } catch (error) {
                    // Exibe a mensagem de erro caso algo falhe
                    this.showError(error.message);
                } finally {
                    // Restaura o estado de envio
                    this.isSubmitting = false;
                }
            } catch (error) {
                this.showError(error.message);
            }
        },

        // Função para tratar a resposta da requisição
        async handleResponse(response) {
            if (!response.ok) {
                const errorMessage = await response.text();  // Pega a mensagem de erro caso tenha
                throw new Error(errorMessage || "Erro desconhecido ao processar a requisição.");
            }

            // Se tudo correr bem, mostre uma mensagem de sucesso
            const data = await response.json();
            this.showSuccess("Recurso criado com sucesso!");
            // Qualquer outra lógica pós sucesso, como redirecionamento ou atualização da UI
        },

        // Função para exibir mensagens de erro
        showError(message) {
            this.errorMessage = message;
            this.errorClass = "feedback-message error";
            setTimeout(() => {
                this.errorMessage = "";
            }, 3000);  // Oculta a mensagem após 3 segundos
        },

        // Função para exibir mensagens de sucesso
        showSuccess(message) {
            this.successMessage = message;
            this.successClass = "feedback-message success";
            setTimeout(() => {
                this.successMessage = "";
            }, 3000);  // Oculta a mensagem após 3 segundos
        },

        async handleResponse(response) {
            if (response.ok) {
                this.message = "Recurso adicionado com sucesso!";
                this.messageType = "success";
                this.resetForm();
                setTimeout(() => {
                    this.$router.push("/recursos");
                }, 2000);
            } else {
                const errorData = await response.json();
                this.showError(errorData.message || "Erro ao adicionar recurso.");
            }
        },
        resetForm() {
            this.recursoData = {
                nome: "",
                descricao: "",
                capacidade: 0,
                tipoRecurso: "SALA",
                localizacao: "",
            };
        },
        showError(message) {
            this.message = message;
            this.messageType = "error";
        },
    },
};
</script>

<style scoped>
/* Layout Principal */
.login-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    background: linear-gradient(135deg, #4caf50 0%, #f9f9f9 60%, #ccc 100%);
}

/* Formulário */
.form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.form-wrapper form {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Header */
.header {
    text-align: center;
    margin-bottom: 20px;
}

.header i {
    font-size: 2.5rem;
    color: #4caf50;
}

.header h2 {
    font-size: 2rem;
    color: #4caf50;
}

/* Inputs */
input,
textarea,
select {
    width: 100%;
    padding: 12px;
    margin-bottom: 0.3rem;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

label {
    font-size: 1.3rem;
    color: #333;
    font-weight: bold;
}

/* Botão */
button {
    width: 100%;
    padding: 12px;
    font-size: 1.7rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
}

button:hover {
    background-color: #4caf4fd5;
}

/* Mensagens */
.success-message {
    color: #4caf50;
    background-color: #e8f5e9;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
}

.error-message {
    color: #f44336;
    background-color: #ffebee;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
}

/* Vídeo */
.video-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.video-wrapper video {
    width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
}

/* Responsividade */
@media (max-width: 768px) {
    .login-container {
        grid-template-columns: 1fr;
    }

    .video-wrapper {
        display: none;
        /* Esconde o vídeo em telas menores */
    }
}

@media (max-width: 480px) {
    .form-wrapper form {
        padding: 20px;
    }

    .video-wrapper {
        display: none;
        /* Esconde o vídeo em telas muito pequenas */
    }
}
</style>