<template>
    <div class="container">
        <main>
            <!-- Mensagem de boas-vindas -->
            <div class="welcome-message">
                <h2>
                    <i class="fas fa-door-open icon"></i>
                    Bem-vindo ao Sistema de Gerenciamento de Salas e Laboratórios
                </h2>
                <p class="description">
                    Nosso sistema permite que você gerencie a reserva de salas e laboratórios de forma rápida e
                    eficiente.
                    Faça login para começar ou explore mais abaixo.
                </p>
            </div>

            <!-- Lista de recursos -->
            <div class="item-list">
                <div v-if="resources.length" class="card-carousel">
                    <div v-for="item in resources" :key="item.id" class="card" :class="getCardClasses(item.status)">
                        <div class="card-header">
                            <h4>{{ item.nome }}</h4>
                            <span class="status-icon">
                                <i :class="getStatusIconClass(item.status)" :title="item.status"></i>
                            </span>
                        </div>
                        <p><strong>Status:</strong> {{ item.status }}</p>
                        <p><strong>Descrição:</strong> {{ item.descricao }}</p>
                        <p><strong>Capacidade:</strong> {{ item.capacidade }}</p>
                        <p><strong>Localização:</strong> {{ item.localizacao }}</p>
                        <!-- Botão de reservar, desabilitado se não estiver logado -->
                        <button v-if="!isLoggedIn && item.status === 'DISPONIVEL'" disabled class="btn-reservar">
                            Faça login para reservar
                        </button>
                    </div>
                </div>
                <div v-else>
                    <p>Nenhum recurso disponível no momento.</p>
                </div>
            </div>

            <!-- Botões de ação -->
            <div class="button-container">
                <router-link to="/login" class="button primary">
                    <i class="fas fa-sign-in-alt icon"></i> Faça Login
                </router-link>
                <router-link to="/saiba-mais" class="button secondary">
                    <i class="fas fa-info-circle icon"></i> Saiba Mais
                </router-link>
            </div>
        </main>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            resources: [],
        };
    },
    computed: {
        ...mapState({
            isLoggedIn: (state) => !!state.user.name,
            userRole: (state) => state.user.role,
            userName: (state) => state.user.name,
        }),
    },
    created() {
        this.loadResources();
    },
    methods: {
        async loadResources() {
            try {
                const response = await fetch("http://localhost:8080/api/recursos");
                if (!response.ok) throw new Error("Erro ao carregar os recursos");
                const data = await response.json();
                this.resources = data.map((resource) => ({
                    ...resource,
                    status: resource.status || "PENDENTE",
                }));
            } catch (error) {
                console.error(error);
            }
        },
        getCardClasses(status) {
            return {
                "status-pendente": status === "PENDENTE",
                "status-reservado": status === "RESERVADO",
                "status-cancelada": status === "CANCELADA",
                "status-disponivel": status === "DISPONIVEL",
                "status-ocupado": status === "OCUPADO",
            };
        },
        getStatusIconClass(status) {
            switch (status) {
                case "PENDENTE":
                    return "fas fa-hourglass-half";
                case "RESERVADO":
                    return "fas fa-check-circle";
                case "CANCELADA":
                    return "fas fa-times-circle";
                case "DISPONIVEL":
                    return "fas fa-check-circle";
                case "OCUPADO":
                    return "fas fa-times-circle";
                default:
                    return "";
            }
        },
    },
};
</script>

<style scoped>
/* Container principal */
.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
}

main {
    padding: 20px;
}

/* Mensagem de boas-vindas */
.welcome-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    padding: 20px;
    background-color: #388e3c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: white;
    border-radius: 8px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.welcome-message:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.welcome-message h2 {
    font-size: 2rem;
    font-weight: 600;
    color: white;
    margin: 0 0 10px;
}

.description {
    font-size: 1.3rem;
    color: #f8f9fa;
    margin: 10px 0 0;
}

/* Ícone */
.icon {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 10px;
}

/* Cards com grid responsivo */
.card-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.card {
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

/* Estilização específica dos status */
.status-pendente {
    background-color: #ffeeba;
}

.status-reservado {
    background-color: #c3e6cb;
}

.status-cancelada {
    background-color: #f5c6cb;
}

.status-disponivel {
    background-color: #d4edda;
}

.status-ocupado {
    background-color: #f8d7da;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-icon {
    font-size: 1.5rem;
    color: inherit;
    margin-left: 10px;
}

/* Botão de reservar */
.btn-reservar {
    padding: 10px;
    border: none;
    background-color: #4caf50;
    color: white;
    font-size: 1rem;
    border-radius: 5px;
    cursor: not-allowed;
    opacity: 0.6;
}

/* Botões de ação */
.button-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}

.button {
    display: inline-flex;
    align-items: center;
    padding: 12px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

.button.primary {
    background-color: #4caf50;
}

.button.secondary {
    background-color: #6c757d;
}

.button.primary:hover {
    background-color: #4caf4fd5;
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.button.secondary:hover {
    background-color: #5a6268;
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.button:active {
    transform: scale(0.95);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.button .icon {
    margin-right: 8px;
    transition: transform 0.3s ease;
}

.button:hover .icon {
    transform: rotate(15deg);
}
</style>