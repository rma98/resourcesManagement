<template>
    <div class="usuarios-list">
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Buscar usuário..." v-model="searchQuery" />
        </div>

        <div v-if="loading" class="loading-spinner">Carregando usuários...</div>
        <div v-else-if="users.length" class="card-carousel">
            <div v-for="user in filteredUsers" :key="user.id" class="card" @click="viewUserDetails(user)">
                <div class="card-header">
                    <h4>{{ user.nome }}</h4>
                    <span class="user-type">Tipo: {{ user.tipo }}</span>
                </div>
                <p><strong>E-mail:</strong> {{ user.email }}</p>
            </div>
        </div>
        <div v-else class="no-results">
            Nenhum usuário encontrado no momento.
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            users: [],
            selectedUser: null,
            searchQuery: "",
            loading: false,
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter((user) =>
                user.nome.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    created() {
        this.loadUsers();
    },
    methods: {
        async loadUsers() {
            this.loading = true;
            try {
                // Recupera o token do localStorage
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
                    this.loading = false;
                    return;
                }

                // Faz a requisição com o cabeçalho Authorization
                const response = await fetch("http://localhost:8080/api/usuarios", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Adiciona o token no cabeçalho Authorization
                    },
                });

                if (!response.ok) throw new Error("Erro ao carregar os usuários");
                const data = await response.json();
                this.users = data;
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            } finally {
                this.loading = false;
            }
        },
        viewUserDetails(user) {
            this.selectedUser = user;
        },
        clearSelection() {
            this.selectedUser = null;
        },
    },
};
</script>

<style scoped>
.usuarios-list {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.search-container {
    margin-bottom: 20px;
}

.search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    transition: border-color 0.3s ease-in-out;
}

.search-input:focus {
    border-color: #007bff;
    background-color: #f0f8ff;
    /* Leve azul para foco */
    outline: none;
    transition: border-color 0.3s ease, background-color 0.3s ease;
}

.card-carousel {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

.card {
    background: linear-gradient(135deg, #388e3c 0%, #f9f9f9 60%, #ccc 100%);
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    flex: 1 1 calc(30% - 20px);
    max-width: 300px;
    text-align: center;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #4caf50 0%, #e0e0e0 60%, #b0b0b0 100%);
}


.user-type {
    font-size: 1em;
    color: #555;
    display: block;
    margin-top: 5px;
}

.no-results {
    text-align: center;
    font-size: 1.2em;
    color: #777;
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card {
    animation: fadeInUp 0.5s ease-in-out;
}

@media (max-width: 600px) {
    .card {
        flex: 1 1 100%;
        max-width: 100%;
    }
}
</style>
