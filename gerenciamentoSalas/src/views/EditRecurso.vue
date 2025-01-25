<template>
    <div class="form-container">
        <div class="content-wrapper">
            <!-- Div do vídeo -->
            <div class="video-wrapper">
                <video autoplay loop muted>
                    <source src="../assets/video/Setup.mp4" type="video/mp4" />
                    Seu navegador não suporta o formato de vídeo.
                </video>
            </div>

            <!-- Formulário -->
            <div class="form-wrapper">
                <!-- Exibe uma mensagem de carregamento enquanto os dados do recurso são carregados -->
                <div v-if="loading" class="loading-indicator">
                    <i class="fas fa-spinner fa-spin"></i> Carregando...
                </div>

                <!-- Verifica se o recurso foi carregado antes de renderizar o formulário -->
                <form v-else @submit.prevent="submitEditRecurso">
                    <div class="header">
                        <i class="fas fa-edit"></i>
                        <h2>{{ formTitle }}</h2>
                    </div>

                    <!-- Campo de Nome do Recurso -->
                    <label for="editRecursoName">Nome do Recurso:</label>
                    <input v-model="recurso.nome" id="editRecursoName" required aria-label="Nome do Recurso" />

                    <!-- Campo de Descrição -->
                    <label for="editRecursoDescription">Descrição:</label>
                    <textarea v-model="recurso.descricao" id="editRecursoDescription" required
                        aria-label="Descrição do Recurso"></textarea>

                    <!-- Campo de Capacidade -->
                    <label for="editRecursoCapacity">Capacidade:</label>
                    <input v-model.number="recurso.capacidade" type="number" id="editRecursoCapacity" required
                        aria-label="Capacidade do Recurso" />

                    <!-- Campo de Localização -->
                    <label for="editRecursoLocation">Localização:</label>
                    <input v-model="recurso.localizacao" id="editRecursoLocation" required
                        aria-label="Localização do Recurso" />

                    <!-- Botão para Salvar -->
                    <button type="submit">Salvar Alterações</button>
                </form>

                <!-- Exibe a mensagem de sucesso ou erro com base no tipo -->
                <div v-if="message" :class="messageType === 'success' ? 'success-message' : 'error-message'">
                    {{ message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recurso: {
                nome: "",
                descricao: "",
                capacidade: null,
                localizacao: "",
                tipoRecurso: "",
            },
            recursoTipo: "",
            loading: true,
            message: "",
            messageType: "",
        };
    },
    computed: {
        formTitle() {
            if (this.recurso.nome) {
                return `Editar: ${this.recurso.nome}`;
            }
            return this.recurso.tipoRecurso === "SALA"
                ? "Editar Sala"
                : this.recurso.tipoRecurso === "LABORATORIO"
                    ? "Editar Laboratório"
                    : "Editar Recurso";
        },

        recursoId() {
            return this.$route.params.id;
        },
        recursoData() {
            return this.$store.state.resources.find(
                (resource) => resource.id === parseInt(this.recursoId)
            );
        },
    },
    watch: {
        recursoData(newData) {
            if (newData) {
                this.recurso = { ...newData };
                this.recursoTipo = newData.tipoRecurso === 'SALA' ? 'Sala' : 'Laboratório';
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchRecurso();
    },
    methods: {
        async fetchRecurso() {
            this.loading = true;
            await this.$store.dispatch("fetchRecursos");
        },

        async submitEditRecurso() {
            try {
                const recursoId = this.recurso.id;
                // Remover o campo de status do objeto a ser enviado
                const { status, ...recursoToUpdate } = this.recurso;

                try {
                    // Recuperar o token de autenticação do localStorage
                    const token = localStorage.getItem("token");
                    if (!token) {
                        throw new Error("Token de autenticação não encontrado.");
                    }

                    // Enviar a requisição PUT para editar o recurso
                    const response = await fetch(`http://localhost:8080/api/recursos/${recursoId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,  // Adicionando o token ao cabeçalho
                        },
                        body: JSON.stringify(recursoToUpdate),  // Enviar os dados do recurso sem o status
                    });

                    if (!response.ok) {
                        // Se a resposta não for bem-sucedida, vamos tentar capturar o erro específico
                        const errorText = await response.text(); // Recupera a mensagem de erro do backend
                        throw new Error(errorText || "Erro ao salvar as alterações do recurso.");
                    }

                    // Se a resposta for bem-sucedida, atualize o estado
                    this.$store.commit('updateResource', this.recurso);
                    this.showSuccessMessage(`${this.recurso.nome} atualizado com sucesso!`);

                } catch (error) {
                    // Se houver um erro, exiba a mensagem de erro
                    this.showError(error.message);
                }
            } catch (error) {
                // Captura qualquer erro que ocorra fora da requisição, como falha na obtenção do token
                this.showError(error.message);
            }
        },

        showSuccessMessage(message) {
            this.message = message;
            this.messageType = "success";
            setTimeout(() => {
                this.$router.push(`/recursos`);
            }, 2000);
        },

        showError(message) {
            this.message = message;
            this.messageType = "error";
        },
    },
};
</script>

<style scoped>
/* Estilos gerais */
.content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    flex-wrap: wrap;
}

/* Estilos do vídeo */
.video-wrapper {
    flex: 1 1 45%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.video-wrapper video {
    width: 65%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
}

/* Estilos do formulário */
.form-wrapper {
    flex: 1 1 45%;
    max-width: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Estilos do cabeçalho do formulário */
.form-wrapper .header {
    text-align: center;
    margin-bottom: 20px;
}

.form-wrapper .header i {
    font-size: 2.5rem;
    color: #4caf50;
}

.form-wrapper .header h2 {
    font-size: 2rem;
    color: #4caf50;
}

/* Estilos dos campos de entrada */
input,
textarea,
select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
}

label {
    font-size: 1.7rem;
    color: #333;
}

/* Estilos do botão */
button {
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    font-size: 1.7rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #4caf4fd5;
}

/* Estilos das mensagens de feedback */
.success-message,
.error-message {
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
}

.success-message {
    background-color: #e8f5e9;
    color: #4caf50;
}

.error-message {
    background-color: #ffebee;
    color: #f44336;
}

/* Indicador de carregamento */
.loading-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Responsividade */
@media (max-width: 768px) {

    .video-wrapper,
    .form-wrapper {
        flex: 1 1 100%;
        max-width: 100%;
    }
}
</style>