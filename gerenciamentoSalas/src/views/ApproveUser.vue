<template>
    <div class="approve-user-container">
        <form @submit.prevent="approveUser">
            <div class="header">
                <i class="fas fa-user-check"></i>
                <h2>Aprovar Usuário</h2>
                <p v-if="!approved">Clique no botão abaixo para aprovar o cadastro do usuário.</p>
                <p v-if="approved" class="success-message">Usuário aprovado com sucesso!</p>
            </div>

            <div v-if="!approved" class="action-group">
                <button type="submit" class="btn" :disabled="isSubmitting">
                    Aprovar Usuário
                </button>
            </div>

            <p v-if="error" class="error-message">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'; // Usando mapState para acessar diretamente o Vuex

export default {
    data() {
        return {
            approved: false,
            isSubmitting: false,
            error: null,
            id: null, // Adicionando a variável para armazenar o ID do usuário
        };
    },
    computed: {
        ...mapState({
            usuarioId: (state) => state.user.id, // Pega o ID do usuário diretamente do Vuex
        }),
    },
    methods: {
        async approveUser() {
            this.isSubmitting = true;

            // Verificar se o 'id' foi obtido corretamente
            if (!this.id) {
                this.error = "ID do usuário não encontrado.";
                this.isSubmitting = false;
                return;
            }

            try {
                // Aqui, estamos utilizando o 'id' obtido da URL
                const response = await fetch(`http://localhost:8080/api/auth/approve/${this.id}`);

                if (response.ok) {
                    this.approved = true;  // Marca o usuário como aprovado
                    this.error = null;     // Limpa erros
                } else {
                    const errorData = await response.json();
                    this.error = errorData.message || "Erro ao aprovar o usuário.";
                }
            } catch (err) {
                this.error = "Erro ao se conectar com o servidor.";
            } finally {
                this.isSubmitting = false; // Resetar estado de submissão
            }
        },
    },
    created() {
        // Recuperando o ID da URL (parâmetro de rota)
        const userId = this.$route.params.id;  // Pegando o ID diretamente da URL
        if (userId) {
            this.id = userId;  // Atribui o ID obtido da URL
        } else {
            this.error = "ID do usuário não encontrado na URL.";  // Caso o ID não seja encontrado
        }
    },
};
</script>

<style>
.approve-user-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.header h2 {
    margin-bottom: 10px;
    font-size: 1.8rem;
}

.header p {
    font-size: 1.2rem;
    margin-top: 5px;
    color: #555;
}

.action-group {
    margin: 20px 0;
}

.btn {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    font-size: 1.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

.btn:hover {
    background-color: #3d8b40;
}

.error-message {
    color: red;
    font-size: 1.2rem;
    margin-top: 10px;
}

.success-message {
    color: green;
    font-size: 1.2rem;
    margin-top: 10px;
}
</style>