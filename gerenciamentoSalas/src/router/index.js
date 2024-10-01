import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'; // Importe o componente Login
import Register from '../views/Register.vue';

const routes = [
    { 
        path: '/login', // Define a rota para o componente de login
        name: 'Login', 
        component: Login 
    },
    { 
        path: '/register',
        name: 'Register', 
        component: Register 
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
