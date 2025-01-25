<template>
    <div v-if="isLoggedIn" class="container">
        <main>
            <!-- Mensagem de boas-vindas -->
            <div class="welcome-message">
                <h2>
                    <i class="fas fa-user-circle icon"></i>
                    Bem-vindo(a), {{ userRole }} {{ userName }}!
                </h2>
            </div>

            <!-- Botões de navegação -->
            <div class="button-grid">
                <div v-if="isCoordinator">
                    <router-link to="/add-recurso" class="button">
                        <i class="fas fa-plus-circle icon"></i> Adicionar Recurso
                    </router-link>
                </div>

                <div v-if="isProfessor || isCoordinator || isAluno">
                    <router-link to="/recursos" class="button">
                        <i class="fas fa-calendar-check icon"></i> Reservar Recurso
                    </router-link>
                </div>

                <div v-if="isCoordinator">
                    <router-link to="/usuarios" class="button">
                        <i class="fas fa-user-check icon"></i> Ver Usuários
                    </router-link>
                </div>
            </div>

            <!-- Botão de Logout -->
            <div class="button-container">
                <router-link to="/login" class="button logout" @click="logout">
                    <i class="fas fa-sign-out-alt icon"></i> Sair
                </router-link>
            </div>
        </main>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            isLoggedIn: (state) => !!state.user.name,
            userRole: (state) => state.user.role,
            userName: (state) => state.user.name,
        }),
        isCoordinator() {
            return this.userRole === "COORDENADOR";
        },
        isProfessor() {
            return this.userRole === "PROFESSOR";
        },
        isAluno() {
            return this.userRole === "ALUNO";
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
/* Configuração básica da página */
.container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: Arial, sans-serif;
}

/* Área principal */
main {
    padding: 20px;
}

/* Mensagem de boas-vindas */
.welcome-message {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    padding: 15px 25px;
    background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    color: white;
    border-radius: 10px;
    animation: fade-in 0.8s ease-in-out;
}

.welcome-message h2 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
}

.icon {
    font-size: 2.5rem;
    margin-right: 10px;
    color: white;
}

/* Grid para os botões */
.button-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

/* Botões */
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 25px;
    background-color: #388e3c;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 500;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    min-width: 180px;
    text-align: center;
}

.button:hover {
    background-color: #2e7d32;
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Animações no ícone */
.button .icon {
    margin-right: 10px;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
}

.button:hover .icon {
    transform: rotate(20deg) scale(1.1);
}

/* Botão de Logout */
.logout {
    background-color: #e53935;
}

.logout:hover {
    background-color: #c62828;
}

/* Mensagem "Em breve" */
.coming-soon {
    font-size: 1rem;
    color: #777;
    text-align: center;
    font-style: italic;
}

/* Animações */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
