import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex'; // Importa o Vuex para verificar o login

import MainLayout from "../layouts/MainLayout.vue";
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', name: 'Home', component: Home, },
            { path: '/register', name: 'Register', component: Register },
            { path: '/login', name: 'Login', component: Login },
        ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Guard de Navegação Global
router.beforeEach((to, from, next) => {
    const store = useStore(); // Acessa a store do Vuex para verificar o login

    // Verifica se a rota requer autenticação
    if (to.meta.requiresAuth && !store.state.user.name) {
        // Redireciona para o login se o usuário não estiver logado
        next({ name: 'Login' });
    } else {
        next(); // Permite a navegação
    }
});

export default router;
