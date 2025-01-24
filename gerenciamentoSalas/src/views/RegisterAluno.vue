<template>
    <div class="login-container">
        <div class="form-wrapper">
            <form @submit.prevent="handleSubmit">
                <div class="header">
                    <i class="fas fa-user-plus"></i>
                    <h2>Cadastro</h2>
                </div>
                <div class="input-group">
                    <label for="name"><i class="fas fa-user"></i> Nome Completo</label>
                    <input type="text" v-model="formData.nome" @input="validateNome"
                        placeholder="Digite seu nome completo" required />
                    <p v-if="errors.nome" class="error-message">{{ errors.nome }}</p>
                </div>
                <div class="input-group">
                    <label for="email"><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" v-model="formData.email" @input="validateEmail" placeholder="Digite seu email"
                        required />
                    <p class="info-message">Certifique-se de informar um e-mail válido ao qual você tenha acesso.</p>
                    <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                </div>
                <div class="input-group">
                    <label for="password"><i class="fas fa-lock"></i> Senha</label>
                    <div class="password-container">
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.senha"
                            @input="validateSenha" placeholder="Digite sua senha" required />
                        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                    <p v-if="errors.senha" class="error-message">{{ errors.senha }}</p>
                </div>
                <div class="input-group">
                    <label for="type"><i class="fas fa-user-tag"></i> Tipo</label>
                    <select v-model="formData.tipo" @change="validateTipo" required disabled>
                        <option value="ALUNO">Aluno</option>
                    </select>
                    <p v-if="errors.tipo" class="error-message">{{ errors.tipo }}</p>
                </div>
                <button :disabled="isFormInvalid || isSubmitting" type="submit" class="btn">
                    <span v-if="isSubmitting">Cadastrando...</span>
                    <span v-else>Cadastrar</span>
                </button>

                <!-- Mensagem de feedback -->
                <p v-if="message" :class="{ 'success-message': success, 'error-message': !success }">
                    {{ message }}
                </p>

                <!-- Link para página de login -->
                <p class="redirect-login">
                    Já possui uma conta?
                    <router-link to="/login" class="link">Acesse.</router-link>
                </p>
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
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            formData: {
                nome: "",
                email: "",
                senha: "",
                tipo: "ALUNO",
            },
            errors: {
                nome: null,
                email: null,
                senha: null,
                tipo: null,
            },
            message: "",
            success: false,
            isSubmitting: false,
            showPassword: false,
        };
    },
    computed: {
        isFormInvalid() {
            return (
                this.errors.nome ||
                this.errors.email ||
                this.errors.senha ||
                this.errors.tipo
            );
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        validateNome() {
            const nome = this.formData.nome.trim();
            if (!nome) {
                this.errors.nome = "O nome completo é obrigatório.";
            } else if (nome.split(" ").length < 2) {
                this.errors.nome = "Informe pelo menos nome e sobrenome.";
            } else {
                this.errors.nome = null;
            }
        },
        async validateEmail() {
            const email = this.formData.email.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                this.errors.email = "O email é obrigatório.";
            } else if (!emailRegex.test(email)) {
                this.errors.email = "O formato do email é inválido.";
            } else {
                this.errors.email = null;
            }
        },
        validateSenha() {
            const senha = this.formData.senha;
            const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!senha) {
                this.errors.senha = "A senha é obrigatória.";
            } else if (!senhaRegex.test(senha)) {
                this.errors.senha =
                    "A senha deve ter no mínimo 8 caracteres, incluindo uma letra, um número e um caractere especial.";
            } else {
                this.errors.senha = null;
            }
        },
        validateTipo() {
            const tipo = this.formData.tipo;
            if (!tipo) {
                this.errors.tipo = "O tipo é obrigatório.";
            } else {
                this.errors.tipo = null;
            }
        },
        async handleSubmit() {
            this.validateNome();
            await this.validateEmail();
            this.validateSenha();
            this.validateTipo();

            if (this.isFormInvalid) return;

            this.isSubmitting = true;

            try {
                const response = await axios.post("http://localhost:8080/api/auth/register", this.formData);

                if (response.status === 201) {
                    this.success = true;
                    this.message = "Usuário cadastrado com sucesso! Aguarde a aprovação do administrador para acessar o sistema.";
                    setTimeout(() => {
                        this.message = "";
                    }, 5000);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    if (error.response.data.message) {
                        this.message = error.response.data.message; // Erro vindo da API
                    } else if (error.response.data.errors) {
                        this.message = error.response.data.errors.join(", "); // Se o backend enviar múltiplos erros
                    }
                } else {
                    this.message = "Erro ao cadastrar o usuário. Tente novamente.";
                }
                this.success = false;
                console.error(error);
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>

<style scoped>
/* Base */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

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
.input-group {
    margin-bottom: 20px;
}

.input-group label {
    font-size: 1.7rem;
    color: #333;
}

.input-group input,
.input-group select {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.input-group input:focus,
.input-group select:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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

/* Botão */
.btn {
    width: 100%;
    padding: 12px;
    font-size: 1.7rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #4caf4fd5;
}

/* Adicionar um efeito visual para o botão enquanto ele está desabilitado */
.btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.btn span {
    transition: opacity 0.3s;
}

.btn[disabled] span {
    opacity: 0;
}

/* Links */
.redirect-login {
    text-align: center;
    font-size: 1.3rem;
}

.redirect-login .link {
    color: #007bff;
    font-weight: bold;
}

.redirect-login .link:hover {
    text-decoration: underline;
}

/* Mensagem de feedback */
.success-message {
    color: #4caf50;
    background-color: #e8f5e9;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
}

.info-message {
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
    margin-top: 5px;
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
        height: 40vh;
    }
}

@media (max-width: 480px) {
    .form-wrapper form {
        padding: 20px;
    }

    .video-wrapper {
        height: 30vh;
    }
}
</style>