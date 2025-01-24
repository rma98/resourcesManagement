<template>
    <!-- Sidebar -->
    <nav class="sidebar" :class="{ active: sidebarVisible }" id="sidebar">
        <ul>
            <li v-if="isLoggedIn">
                <router-link to="/dashboard" @click="$emit('closeSidebar')">
                    <i class="fas fa-cogs fa-2x"></i> Dashboard
                </router-link>
            </li>
            <li v-if="isLoggedIn">
                <router-link to="/important-dates" @click="$emit('closeSidebar')">
                    <i class="fas fa-calendar-alt fa-2x"></i> Feriados e Eventos
                </router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link to="/" @click="$emit('closeSidebar')">
                    <i class="fas fa-home fa-2x"></i> Home
                </router-link>
            </li>
            <li v-if="!isLoggedIn" id="loginMenu">
                <router-link to="/login" @click="$emit('closeSidebar')">
                    <i class="fas fa-user-circle fa-2x"></i> Login
                </router-link>
            </li>
            <li v-if="!isLoggedIn" id="registerMenu" class="dropdown">
                <a href="#" @click.prevent="toggleDropdown">
                    <i class="fas fa-user-plus fa-2x"></i> Cadastre-se
                </a>
                <ul v-if="dropdownVisible" class="dropdown-menu">
                    <li>
                        <router-link to="/register-coordenador" @click="$emit('closeSidebar')">
                            <i class="fas fa-user-tie"></i> Coordenador
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/register-professor" @click="$emit('closeSidebar')">
                            <i class="fas fa-chalkboard-teacher"></i> Professor
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/register-aluno" @click="$emit('closeSidebar')">
                            <i class="fas fa-user-graduate"></i> Aluno
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <router-link to="/perguntas-frequentes" @click="$emit('closeSidebar')">
                    <i class="fas fa-question-circle fa-2x"></i> Perguntas Frequentes
                </router-link>
            </li>
            <li>
                <router-link to="/contato" @click="$emit('closeSidebar')">
                    <i class="fas fa-envelope fa-2x"></i> Contato
                </router-link>
            </li>
            <li>
                <router-link to="/sobre-equipe" @click="$emit('closeSidebar')">
                    <i class="fas fa-users fa-2x"></i> Sobre
                </router-link>
            </li>
            <!-- Renderiza o botão 'Sair' apenas se o usuário estiver logado -->
            <li v-if="isLoggedIn">
                <button @click="logoutAndClose" class="logout-button">
                    <i class="fas fa-sign-out-alt fa-2x"></i> Sair
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    props: {
        sidebarVisible: Boolean,
    },
    data() {
        return {
            dropdownVisible: false,
        };
    },
    computed: {
        // Computed property para verificar se o usuário está logado
        ...mapState({
            isLoggedIn: (state) => !!state.user.name, // Considera logado se o nome de usuário existir
            userRole: (state) => state.user.role,
        }),
    },
    methods: {
        ...mapActions(["logout"]),
        logoutAndClose() {
            this.logout(); // Executa o logout
            this.$emit("closeSidebar"); // Emite o evento para fechar a sidebar
        },
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
    },
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    position: fixed;
    right: -250px;
    top: 0;
    height: 100%;
    background-color: #388e3c;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    transition: right 0.3s;
    z-index: 100;
}

.sidebar.active {
    right: 0;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar ul li {
    padding: 15px;
    position: relative;
}

.sidebar ul li a {
    font-size: 1.3rem;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
}

.sidebar ul li a:hover {
    background-color: #4caf50;
}

.sidebar ul li a i {
    margin-right: 10px;
    color: white;
}

.dropdown-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #388e3c;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.dropdown-menu li {
    padding: 10px 15px;
}

.dropdown-menu li a {
    color: white;
    font-size: 1.2rem;
}

.dropdown-menu li a:hover {
    background-color: #4caf50;
}

.logout-button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
}
</style>