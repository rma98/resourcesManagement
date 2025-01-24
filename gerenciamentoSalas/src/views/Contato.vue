<template>
    <section id="feedback">
        <div class="container">
            <!-- Título e Descrição -->
            <div class="heading">
                <h2>Envie seu Feedback!</h2>
                <p>Queremos saber sua opinião para melhorar nosso sistema. Preencha o formulário abaixo:</p>
            </div>

            <!-- Formulário e Informações de Contato -->
            <div class="form-contact-wrapper">
                <!-- Formulário -->
                <div class="form-container">
                    <form @submit.prevent="enviarFeedback" class="form-horizontal">
                        <!-- Nome -->
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="nome" placeholder="Seu Nome" required />
                        </div>

                        <!-- E-mail -->
                        <div class="form-group">
                            <input type="email" class="form-control" v-model="email" placeholder="Seu E-mail"
                                required />
                            <p class="info-message">Certifique-se de informar um e-mail válido ao qual você tenha
                                acesso.</p>
                        </div>

                        <!-- Mensagem -->
                        <div class="form-group">
                            <textarea class="form-control" v-model="mensagem" rows="5" placeholder="Sua Mensagem"
                                required></textarea>
                        </div>

                        <!-- Botão Enviar -->
                        <button class="btn btn-primary" :disabled="!formValido || statusClass === 'info'" type="submit">
                            <i class="fa fa-paper-plane"></i>
                            Enviar Feedback
                        </button>
                    </form>

                    <!-- Mensagem de Sucesso ou Erro -->
                    <div :class="['status-message', statusClass, { vanish: mensagemStatus === '' }]">
                        {{ mensagemStatus }}
                    </div>
                </div>

                <!-- Informações de Contato -->
                <div class="contact-info">
                    <h3>Entre em Contato</h3>
                    <ul>
                        <li><i class="fa fa-envelope"></i> roomandlabmanagement@gmail.com</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: "Contato",
    data() {
        return {
            nome: "",
            email: "",
            mensagem: "",
            mensagemStatus: "",
            statusClass: "",
        };
    },
    computed: {
        formValido() {
            return this.nome !== "" && this.email !== "" && this.mensagem !== "";
        },
    },
    methods: {
        async enviarFeedback() {
            if (this.formValido) {
                this.mensagemStatus = "Enviando...";
                this.statusClass = "info";

                try {
                    const response = await axios.post('http://localhost:8080/api/feedback', {
                        nome: this.nome,
                        email: this.email,
                        mensagem: this.mensagem,
                    });

                    if (response.status === 201) {
                        this.mensagemStatus = "Feedback enviado com sucesso!";
                        this.statusClass = "success";
                        this.nome = "";
                        this.email = "";
                        this.mensagem = "";
                    }
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        this.mensagemStatus = `Erro: ${error.response.data.message}`;
                    } else {
                        this.mensagemStatus = "Erro ao enviar feedback. Tente novamente!";
                    }
                    this.statusClass = "error";
                } finally {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.mensagemStatus = "";
                        }, 3000);
                    });
                }
            } else {
                this.mensagemStatus = "Por favor, preencha todos os campos!";
                this.statusClass = "error";
            }
        },
    },
};
</script>

<style scoped>
/* Container Geral */
#feedback {
    width: 100%;
    height: auto;
    justify-content: center;
    background: linear-gradient(135deg, #388e3c 0%, #f9f9f9 60%, #ccc 100%);
    display: flex;
    justify-content: center;
    padding: 2rem;
}

#feedback .container {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2%;
    text-align: left;
    color: hsl(155, 41%, 65%);
    padding: 2rem;
}

/* Título e descrição */
.heading {
    text-align: center;
}

#feedback h2 {
    font-size: 2.5rem;
    color: hsl(155, 41%, 35%);
    margin-bottom: 1rem;
}

#feedback p {
    font-size: 1.7rem;
    color: #7f8c8d;
    margin-bottom: 2rem;
}

/* Formulário à esquerda */
.form-contact-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.form-container {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    padding: 1rem;
}

.form-control {
    width: 100%;
    padding: 1.2rem;
    border: 1px solid hsl(155, 41%, 65%);
    border-radius: 8px;
    font-size: 1.7rem;
    background-color: white;
}

.form-control:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button.btn {
    display: inline-block;
    background: hsl(155, 41%, 65%);
    color: white;
    border: none;
    padding: 1.2rem 2rem;
    font-size: 1.7rem;
    font-weight: bold;
    border-radius: 5%;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    margin-top: 1.5rem;
    width: 100%;
}

button.btn:hover {
    background: hsl(155, 41%, 50%);
    transform: scale(1.05);
}

/* Informações de Contato à direita */
.contact-info {
    width: 48%;
    text-align: left;
}

.contact-info h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #34495e;
}

.contact-info ul {
    list-style: none;
    padding: 0;
}

.contact-info ul li {
    margin-bottom: 0.8rem;
    font-size: 1.7rem;
    color: #7f8c8d;
}

.contact-info ul li i {
    color: hsl(155, 41%, 65%);
    margin-right: 0.5rem;
}

.info-message {
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
    margin-top: 5px;
}

.status-message {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    transition: opacity 1s ease-out;
    opacity: 1;
}

.status-message.vanish {
    opacity: 0;
}

.success {
    background-color: #4caf50;
    color: white;
}

.error {
    background-color: #f44336;
    color: white;
}

/* Adicionando algumas animações ao formulário e ao botão */
form {
    animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Responsividade */
@media (max-width: 768px) {
    #feedback .container {
        flex-direction: column;
        padding: 1rem;
    }

    .form-contact-wrapper {
        flex-direction: column;
    }

    .form-container,
    .contact-info {
        width: 100%;
    }

    #feedback h2 {
        font-size: 1.8rem;
    }

    .form-control {
        font-size: 1rem;
    }

    button.btn {
        font-size: 1rem;
        padding: 1rem 1.5rem;
    }
}

/* Estilo adicional para layout de desktop */
@media screen and (min-width: 1100px) {
    #feedback .container {
        width: 70%;
        margin-top: 5%;
    }

    .form-container {
        margin-bottom: 2rem;
    }

    .contact-info {
        margin-top: 10%;
    }
}
</style>