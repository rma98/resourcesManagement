<template>
    <div v-if="visible" class="modal-reserva">
        <div class="modal-content">
            <!-- Cabeçalho do modal -->
            <div class="modal-header">
                <h2 class="modal-title">Fazer Reserva</h2>
                <button class="close-button" @click="$emit('close')">&times;</button>
            </div>

            <!-- Corpo do modal -->
            <div class="modal-body">
                <div class="resource-details">
                    <h3>{{ resourceName }}</h3>
                    <p><strong>Descrição:</strong> {{ resourceDescription }}</p>
                </div>

                <form @submit.prevent="submitReservation"> <!-- Modificação aqui -->
                    <!-- Data e Hora de Início -->
                    <div class="form-group">
                        <label for="start-date">Data e Hora de Início:</label>
                        <input type="datetime-local" id="start-date" v-model="startDate" class="modal-input" required />
                        <!-- Exibindo a data formatada -->
                        <div>{{ formatDateToBrazilian(startDate) }}</div>
                    </div>

                    <!-- Data e Hora Final -->
                    <div class="form-group">
                        <label for="end-date">Data e Hora Final:</label>
                        <input type="datetime-local" id="end-date" v-model="endDate" class="modal-input" required />
                        <!-- Exibindo a data formatada -->
                        <div>{{ formatDateToBrazilian(endDate) }}</div>
                    </div>

                    <!-- Checkbox para recurso adicional -->
                    <div class="form-group">
                        <label>
                            <input type="checkbox" v-model="includeAdditionalResource" />
                            Adicionar recurso adicional (Ex.: Datashow)
                        </label>
                    </div>

                    <!-- Campo para descrição do recurso adicional -->
                    <div v-if="includeAdditionalResource" class="form-group">
                        <label for="additional-resource">Recurso Adicional:</label>
                        <input type="text" id="additional-resource" v-model="additionalResource" class="modal-input"
                            placeholder="Descrição do recurso" />
                    </div>

                    <!-- Rodapé do modal com botões -->
                    <div class="modal-footer">
                        <button type="button" class="btn-cancelar" @click="$emit('close')">Cancelar</button>
                        <button type="submit" class="btn-confirmar" :disabled="isSubmitting">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";  // Usando mapState para acessar diretamente o Vuex

export default {
    props: {
        visible: Boolean,
        resourceId: Number,
        resourceName: String,
        resourceDescription: String,
    },
    data() {
        return {
            startDate: "",
            endDate: "",
            includeAdditionalResource: false,
            additionalResource: "",
            isSubmitting: false,
            message: "",
            messageType: "",
        };
    },
    computed: {
        ...mapState({
            usuarioId: (state) => state.user.id, // Pega o ID do usuário diretamente do Vuex
        }),
    },
    methods: {
        async submitReservation() {
            if (this.isSubmitting) return; // Prevenir múltiplos envios
            this.isSubmitting = true;

            // Validar os campos obrigatórios
            if (!this.resourceId || !this.startDate || !this.endDate) {
                alert("Todos os campos são obrigatórios!");
                this.isSubmitting = false;
                return;
            }

            const reservaData = {
                dataInicio: this.startDate,
                dataFim: this.endDate,
                recursoAdicional: this.includeAdditionalResource ? this.additionalResource : null,
                usuarioId: this.usuarioId,
                recursoId: this.resourceId,
            };

            try {
                // Recupera o token do localStorage
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
                    this.isSubmitting = false;
                    return;
                }

                // Envia a requisição com o cabeçalho Authorization
                const response = await fetch("http://localhost:8080/api/reservas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Adiciona o token no cabeçalho Authorization
                    },
                    body: JSON.stringify(reservaData),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error("Erro na resposta do backend:", error);
                    alert("Erro ao criar a reserva: " + (error.message || "Erro desconhecido."));
                } else {
                    const data = await response.json();
                    console.log("Reserva criada com sucesso:", data);
                    alert("Reserva criada com sucesso! Você receberá um e-mail com os detalhes da sua reserva.");
                    this.$emit("reserve-created", data); // Notificar o componente pai
                    this.$emit("close"); // Fechar o modal
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Erro ao criar reserva. Verifique sua conexão e tente novamente.");
            } finally {
                this.isSubmitting = false;
            }
        },

        handleResponse(response) {
            // A resposta agora é o objeto retornado pelo fetch
            this.message = "Reserva criada com sucesso!";
            this.messageType = "success";
            this.resetForm();
            this.$emit("close");
            this.$emit("reserve-created", response);
        },

        resetForm() {
            this.startDate = "";
            this.endDate = "";
            this.includeAdditionalResource = false;
            this.additionalResource = "";
        },

        showError(message) {
            this.message = message;
            this.messageType = "error";
        },

        formatDateToBrazilian(date) {
            if (!date) return "";

            const d = new Date(date);

            // Garantir que a hora, minuto e segundo estão corretos
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            const hours = String(d.getHours()).padStart(2, "0");
            const minutes = String(d.getMinutes()).padStart(2, "0");

            return `${day}/${month}/${year} ${hours}:${minutes}`; // Formato dd/mm/yyyy HH:mm
        },

        formatDateToInputFormat(date) {
            if (!date) return "";
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            const hours = String(d.getHours()).padStart(2, "0");
            const minutes = String(d.getMinutes()).padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`; // Formato necessário para o input datetime-local
        },
    },
};
</script>

<style scoped>
/* Estilo geral para o modal */
.modal-reserva {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    padding: 20px;
}

/* Contêiner do conteúdo do modal */
.modal-content {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
}

/* Animação para suavizar a entrada */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Cabeçalho do modal */
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
}

.close-button {
    font-size: 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #999;
    transition: color 0.3s ease;
}

.close-button:hover {
    color: #333;
}

/* Corpo do modal */
.modal-body {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
}

/* Input para informações adicionais */
.modal-input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
}

.modal-input:focus {
    outline: none;
    border-color: #4caf50;
    background-color: #e8f5e9;
}

/* Botões de ação no modal */
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.btn-cancelar {
    background-color: #f44336;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.btn-cancelar:hover {
    background-color: #d32f2f;
}

.btn-confirmar {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.btn-confirmar:hover {
    background-color: #45a049;
}

.resource-details {
    margin-bottom: 1rem;
}

.resource-details h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: bold;
}

.resource-details p {
    margin-top: 0.25rem;
    font-size: 1rem;
}
</style>