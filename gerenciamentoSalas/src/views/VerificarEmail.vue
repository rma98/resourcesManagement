<template>
    <div class="verify-container">
        <div v-if="loading">Verificando o token...</div>
        <div v-else>
            <h1 v-if="success">E-mail verificado com sucesso! 🎉</h1>
            <h1 v-else>Token inválido ou expirado. 😞</h1>
            <router-link to="/login" class="btn">Ir para Login</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: true,
            success: false,
        };
    },
    async mounted() {
        const token = this.$route.query.token; // Obtém o token da URL
        try {
            const response = await axios.get(`http://localhost:8080/api/verificar-email?token=${token}`);
            if (response.status === 200) {
                this.success = true;
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error("Token inválido ou expirado.");
            } else {
                console.error("Erro inesperado:", error);
            }
        } finally {
            this.loading = false;
        }
    },
};
</script>

<style>
.verify-container {
    text-align: center;
    margin-top: 50px;
}

.btn {
    margin-top: 20px;
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.btn:hover {
    background-color: #0056b3;
}
</style>