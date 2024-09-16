import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue'; // Importe o componente Login
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import Adicionar from '../views/Adicionar.vue';
import RecursoAdicional from '../views/RecursoAdicional.vue';
import Salas from '../views/Salas.vue';
import Laboratorios from '../views/Laboratorios.vue';
import Reserva from '../views/Reserva.vue';

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
    { 
        path: '/adicionar', 
        name: 'Adicionar', 
        component: Adicionar 
    },
    { 
        path: '/recursos-adicionais', 
        name: 'RecursoAdicional', 
        component: RecursoAdicional 
    },
    {
        path: '/salas',
        name: 'Salas',
        component: Salas
    },
    {
        path: '/laboratorios',
        name: 'Laboratorios',
        component: Laboratorios
    },
    {
        path: '/reserva',
        name: 'Reserva',
        component: Reserva
    },
    {
        path: '/',
        name: 'Home',
        component: Home, // Defina a rota para Home.vue
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
