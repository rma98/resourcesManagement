<template>
    <div class="reset-password-container">
        <form @submit.prevent="handleResetPassword">
            <div class="header">
                <i class="fas fa-key"></i>
                <h2>Redefinir sua senha</h2>
                <p>Digite sua nova senha abaixo.</p>
            </div>
            <div class="input-group">
                <label for="novaSenha"><i class="fas fa-lock"></i> Nova Senha</label>
                <div class="password-container">
                    <input :type="showNovaSenha ? 'text' : 'password'" id="novaSenha" v-model="novaSenha"
                        placeholder="Digite sua nova senha" required />
                    <button type="button" class="toggle-password" @click="toggleNovaSenhaVisibility">
                        <i :class="showNovaSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                </div>
            </div>
            <div class="input-group">
                <label for="confirmarSenha"><i class="fas fa-lock"></i> Confirmar Senha</label>
                <div class="password-container">
                    <input :type="showConfirmarSenha ? 'text' : 'password'" id="confirmarSenha" v-model="confirmarSenha"
                        placeholder="Confirme sua nova senha" required />
                    <button type="button" class="toggle-password" @click="toggleConfirmarSenhaVisibility">
                        <i :class="showConfirmarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                </div>
            </div>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <button type="submit" class="btn">Redefinir Senha</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: this.$route.query.token, // Pega o token da URL
            novaSenha: "",
            confirmarSenha: "",
            errorMessage: "",
            successMessage: "",
            showNovaSenha: false,
            showConfirmarSenha: false,
        };
    },
    methods: {
        toggleNovaSenhaVisibility() {
            this.showNovaSenha = !this.showNovaSenha;
        },
        toggleConfirmarSenhaVisibility() {
            this.showConfirmarSenha = !this.showConfirmarSenha;
        },
        async handleResetPassword() {
            if (this.novaSenha !== this.confirmarSenha) {
                this.errorMessage = "As senhas não coincidem.";
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/usuarios/redefinir-senha", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: this.token,
                        novaSenha: this.novaSenha,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Falha ao redefinir a senha. Tente novamente.");
                }

                this.successMessage = "Senha redefinida com sucesso!";
                this.novaSenha = "";
                this.confirmarSenha = "";
                setTimeout(() => {
                    this.successMessage = "";
                    this.$router.push("/login");
                }, 3000);
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
    },
};
</script>

<style scoped>
.reset-password-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    transform: scale(0.98);
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(0.9);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.header h2 {
    margin-bottom: 10px;
    font-size: 2rem;
    color: #333;
}

.header p {
    font-size: 1.1rem;
    color: #666;
}

.input-group {
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 1rem;
    color: #333;
}

.input-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    margin-top: 5px;
    box-sizing: border-box;
    transition: border 0.3s ease;
}

.input-group input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.password-container {
    position: relative;
    display: flex;
    align-items: center;
}

.password-container input {
    flex: 1;
}

.toggle-password {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
}

.btn {
    padding: 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    font-size: 1.4rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    width: 100%;
    box-sizing: border-box;
}

.btn:hover {
    background-color: #3d8b40;
    transform: translateY(-2px);
}

.btn:active {
    transform: translateY(2px);
}

.error-message,
.success-message {
    font-size: 1.2rem;
    margin-top: 10px;
    transition: opacity 0.5s ease;
}

.error-message {
    color: red;
}

.success-message {
    color: green;
}

@media (max-width: 500px) {
    .reset-password-container {
        padding: 15px;
    }

    .header h2 {
        font-size: 1.8rem;
    }

    .header p {
        font-size: 1rem;
    }

    .btn {
        font-size: 1.2rem;
    }
}
</style>