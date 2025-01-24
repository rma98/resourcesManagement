<template>
    <div class="login-container">
        <div class="form-wrapper">
            <form @submit.prevent="handleSubmit" class="form">
                <!-- Cabeçalho -->
                <div class="header">
                    <i class="fas fa-sign-in-alt"></i>
                    <h2>Login</h2>
                </div>

                <!-- Campo: Email -->
                <div class="input-group">
                    <label for="email"><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="email" v-model="credentials.email" @input="validateForm"
                        placeholder="Digite seu email" required />
                    <p v-if="errors.email" class="error-message">
                        <i class="fas fa-exclamation-circle"></i> {{ errors.email }}
                    </p>
                </div>

                <!-- Campo: Senha -->
                <div class="input-group">
                    <label for="password"><i class="fas fa-lock"></i> Senha</label>
                    <div class="password-container">
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="credentials.senha"
                            @input="validateForm" placeholder="Digite sua senha" required />
                        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                    <p v-if="errors.senha" class="error-message">
                        <i class="fas fa-exclamation-circle"></i> {{ errors.senha }}
                    </p>
                </div>

                <!-- Link: Esqueceu sua senha -->
                <div class="forgot-password">
                    <router-link to="/esqueceu-senha" class="link">
                        Esqueceu sua senha?
                    </router-link>
                </div>

                <!-- Botão: Entrar -->
                <button type="submit" :disabled="isFormInvalid" class="btn">
                    Entrar
                </button>

                <!-- Mensagens de Feedback -->
                <div v-if="welcomeMessage" :class="welcomeClass" class="feedback-message">
                    <i :class="welcomeIconClass"></i>
                    {{ welcomeMessage }}
                </div>

                <!-- Link para Cadastro com Dropdown -->
                <p class="redirect-register">
                    Não possui uma conta?
                    <span @click="toggleDropdown" class="link dropdown-trigger">
                        Cadastre-se.
                    </span>
                <ul v-if="dropdownVisible" class="dropdown-menu">
                    <li>
                        <router-link to="/register-coordenador">
                            <i class="fas fa-user-tie"></i> Coordenador
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/register-professor">
                            <i class="fas fa-chalkboard-teacher"></i> Professor
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/register-aluno">
                            <i class="fas fa-user-graduate"></i> Aluno
                        </router-link>
                    </li>
                </ul>
                </p>
            </form>
        </div>

        <!-- Vídeo de fundo -->
        <div class="video-wrapper">
            <video autoplay loop muted>
                <source src="../assets/video/Setup.mp4" type="video/mp4" />
                Seu navegador não suporta o formato de vídeo.
            </video>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            credentials: {
                email: "",
                senha: "",
            },
            errors: {
                email: null,
                senha: null,
            },
            welcomeMessage: "",
            welcomeClass: "",
            welcomeIconClass: "",
            showPassword: false,
            dropdownVisible: false,
        };
    },
    computed: {
        isFormInvalid() {
            return !!this.errors.email || !!this.errors.senha || !this.credentials.email || !this.credentials.senha;
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        validateForm() {
            // Validações de Email
            if (!this.credentials.email.trim()) {
                this.errors.email = "O email é obrigatório.";
            } else if (!/\S+@\S+\.\S+/.test(this.credentials.email)) {
                this.errors.email = "O formato do email é inválido.";
            } else {
                this.errors.email = null;
            }

            // Validações de Senha
            if (!this.credentials.senha) {
                this.errors.senha = "A senha é obrigatória.";
            } else if (this.credentials.senha.length < 8) {
                this.errors.senha = "A senha deve ter pelo menos 8 caracteres.";
            } else if (!/[A-Za-z]/.test(this.credentials.senha) || !/\d/.test(this.credentials.senha)) {
                this.errors.senha = "A senha deve conter letras, números e caracteres especiais.";
            } else {
                this.errors.senha = null;
            }
        },
        async handleSubmit() {
            if (this.isFormInvalid) return;

            try {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.credentials),
                });

                if (!response.ok) {
                    throw new Error(
                        response.status === 401 || response.status === 403
                            ? "Email ou senha inválidos."
                            : "Erro ao realizar login."
                    );
                }

                const { token, id, nome, email, tipo } = await response.json();

                // Salvando o token no localStorage
                localStorage.setItem("token", token);

                // Disparando ação no Vuex e incluindo os novos campos do DTO
                this.$store.dispatch("login", {
                    id,
                    name: nome,
                    role: tipo,
                    email,
                    token,
                });

                this.showWelcomeMessage(`Bem-vindo(a), ${tipo} ${nome}!`, "success");
                setTimeout(() => this.$router.push("/dashboard"), 2000); // Redireciona após 2 segundos
            } catch (error) {
                this.showWelcomeMessage(error.message, "error");
            }
        },
        showWelcomeMessage(message, type) {
            this.welcomeMessage = message;
            this.welcomeClass = `feedback-message ${type}`;
            this.welcomeIconClass = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";

            setTimeout(() => {
                this.welcomeMessage = "";
            }, 3000);
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

.input-group input {
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.input-group input:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(0, 0, 20, 0.5);
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

/* Links */
.forgot-password {
    text-align: right;
    margin-bottom: 20px;
}

.forgot-password a {
    color: #007bff;
    text-decoration: none;
    font-size: 1.3rem;
}

.forgot-password a:hover {
    text-decoration: underline;
}

.redirect-register {
    font-size: 1rem;
    margin: 10px 0;
    position: relative;
    /* Adicionado para que o dropdown seja posicionado em relação a este elemento */
}

.redirect-register .link {
    color: #4caf50;
    cursor: pointer;
    text-decoration: underline;
}

.redirect-register .dropdown-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #388e3c;
    position: absolute;
    /* Mantém o dropdown como absoluto */
    top: 100%;
    /* Posiciona abaixo do botão */
    left: 0;
    /* Alinha à esquerda em relação ao trigger */
    width: 200px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    border-radius: 5px;
}

.dropdown-menu li {
    padding: 10px 15px;
}

.dropdown-menu li a {
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.dropdown-menu li a i {
    margin-right: 10px;
}

.dropdown-menu li a:hover {
    background-color: #4caf50;
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

/* Mensagem de boas-vindas */
.welcome-message {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-top: 20px;
    border-radius: 5px;
    font-size: 1.2rem;
    animation: slideDown 0.5s ease;
}

.welcome-message.success {
    color: #4caf50;
    background-color: #e8f5e9;
}

.welcome-message.error {
    color: #f44336;
    background-color: #ffebee;
}

.message-container i {
    margin-right: 10px;
}

.feedback-message {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.feedback-message.success {
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
}

.feedback-message.error {
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
}

.feedback-message i {
    font-size: 1.25rem;
}

/* Melhorias na Responsividade e Efeitos Visuais */
.input-group input:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(0, 0, 20, 0.5);
    transition: box-shadow 0.3s ease-in-out;
}

/* Efeitos ao passar o mouse sobre os campos de erro */
.error-message {
    color: #f44336;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
}

.error-message i {
    margin-right: 8px;
}

/* Animações para mensagens de boas-vindas */
.feedback-message {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: slideIn 0.5s forwards;
}

@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
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