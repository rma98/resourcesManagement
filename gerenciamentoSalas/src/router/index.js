import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex'; // Importa o Vuex para verificar o login
import MainLayout from "../layouts/MainLayout.vue";
import Faq from '../views/Faq.vue';
import Contato from '../views/Contato.vue';
import SobreEquipe from '../views/SobreEquipe.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            
        ]
    },
    { path: '/contato', name: 'Contato', component: Contato },
    { path: '/perguntas-frequentes', name: 'Faq', component: Faq },
    { path: '/sobre-equipe', name: 'SobreEquipe', component: SobreEquipe },
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
