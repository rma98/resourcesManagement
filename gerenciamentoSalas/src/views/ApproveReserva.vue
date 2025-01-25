<template>
    <div class="approve-reserva-container">
        <div class="header">
            <i class="fas fa-check-circle"></i>
            <h2>Aprovação de Reserva</h2>
            <p>Escolha uma das opções abaixo para aprovar ou rejeitar a reserva.</p>
        </div>

        <div class="button-group">
            <!-- Botões de Aprovação e Rejeição -->
            <button @click="aprovarReserva" class="btn aprovacao-btn" :disabled="isSubmitting">
                Aprovar
            </button>
            <button @click="rejeitarReserva" class="btn rejeicao-btn" :disabled="isSubmitting">
                Rejeitar
            </button>
        </div>

        <!-- Mensagens de Sucesso ou Erro -->
        <p v-if="successMessage || errorMessage" :class="{
            'success-message': messageType === 'success',
            'error-message': messageType === 'error',
            'warning-message': messageType === 'warning'
        }">
            {{ successMessage || errorMessage }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'ApproveReserva',
    data() {
        return {
            reservaId: null, // ID da reserva obtido da URL
            isSubmitting: false, // Estado de submissão
            actionCompleted: false, // Indica se uma ação foi concluída
            successMessage: '', // Mensagem de sucesso
            errorMessage: '', // Mensagem de erro
            messageType: '' // Tipo da mensagem (success, error, warning)
        };
    },
    methods: {
        async aprovarReserva() {
            await this.handleReservaAction(true); // Aprovar reserva
        },
        async rejeitarReserva() {
            await this.handleReservaAction(false); // Rejeitar reserva
        },
        async handleReservaAction(aprovado) {
            this.isSubmitting = true; // Desativa os botões enquanto a requisição está em andamento

            if (!this.reservaId) {
                this.errorMessage = "ID da reserva não encontrado.";
                this.messageType = 'error';
                this.isSubmitting = false;
                return;
            }

            try {
                // Recuperar o token de autenticação do localStorage
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }
                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }

                const url = `http://localhost:8080/api/reservas/approveReserva/${this.reservaId}?aprovado=${aprovado}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const status = aprovado ? 'aprovada' : 'rejeitada';
                    this.successMessage = `Reserva ${status} com sucesso!`;
                    this.messageType = aprovado ? 'success' : 'warning'; // Define a cor baseada na ação
                    this.errorMessage = '';
                    this.actionCompleted = true; // Indica que a ação foi concluída
                } else {
                    this.successMessage = '';
                    this.errorMessage = `Erro ao ${aprovado ? 'aprovar' : 'rejeitar'} a reserva.`;
                    this.messageType = 'error';
                }
            } catch (error) {
                this.successMessage = '';
                this.errorMessage = 'Erro inesperado. Por favor, tente novamente.';
                this.messageType = 'error';
            } finally {
                this.isSubmitting = false; // Reativa os botões após a requisição
            }
        }
    },
    created() {
        const reservaId = this.$route.params.id;
        if (reservaId) {
            this.reservaId = reservaId;
        } else {
            this.errorMessage = "ID da reserva não encontrado na URL.";
            this.messageType = 'error';
        }
    }
};
</script>

<style scoped>
.approve-reserva-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.header {
    margin-bottom: 20px;
}

.header h2 {
    margin-bottom: 10px;
}

.button-group {
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    border: none;
    font-size: 1.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
    margin: 10px 0;
}

.aprovacao-btn {
    background-color: #4caf50;
    color: #fff;
}

.rejeicao-btn {
    background-color: #f44336;
    color: #fff;
}

.aprovacao-btn:hover {
    background-color: #45a049;
}

.rejeicao-btn:hover {
    background-color: #e53935;
}

.success-message {
    color: green;
    font-size: 1.2rem;
}

.warning-message {
    color: orange;
    font-size: 1.2rem;
}

.error-message {
    color: red;
    font-size: 1.2rem;
}
</style>