import { createStore } from 'vuex';
import router from '../router';
import recurso from './modules/recurso';

export default createStore({
    modules: {
        recurso,
    },
    state: {
        user: {
            id: localStorage.getItem('userId') || null,
            name: localStorage.getItem('userName') || '',
            role: localStorage.getItem('userType') || '',
            email: localStorage.getItem('userEmail') || '',
        },
        resources: [], // Lista de recursos
    },
    mutations: {
        setUser(state, { id, name, role, email }) {
            state.user.id = id;
            state.user.name = name;
            state.user.role = role;
            state.user.email = email;
            localStorage.setItem("userId", id);
            localStorage.setItem('userName', name);
            localStorage.setItem('userType', role);
            localStorage.setItem('userEmail', email);
        },
        clearUser(state) {
            state.user.id = null;
            state.user.name = '';
            state.user.role = '';
            state.user.email = '';
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            localStorage.removeItem('userEmail');
        },
        setResources(state, resources) {
            state.resources = resources;
        },
        addResource(state, recurso) {
            // Garantir que o status seja "DISPONIVEL" por padrão
            recurso.status = recurso.status || "DISPONIVEL"; // Garantindo que status seja "DISPONIVEL"
            state.resources.push(recurso);
        },
        updateResources(state, resources) {
            state.resources = resources;
        },
        deleteResource(state, id) {
            state.resources = state.resources.filter(resource => resource.id !== id);
        },
    },
    actions: {
        login({ commit }, user) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('clearUser');
            router.push('/');
        },
        async fetchRecursos({ commit }) {
            try {
                const response = await fetch('http://localhost:8080/api/recursos');
                if (!response.ok) {
                    throw new Error('Erro ao buscar recursos');
                }
                const data = await response.json();
                commit('setResources', data);
            } catch (error) {
                console.error('Erro ao buscar recursos:', error);
            }
        },
        async deleteResource({ commit }, id) {
            try {
                const response = await fetch(`http://localhost:8080/api/recursos/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    commit('deleteResource', id);
                } else {
                    throw new Error('Erro ao excluir recurso');
                }
            } catch (error) {
                console.error('Erro ao excluir recurso:', error);
            }
        },
    },
    getters: {
        filteredResources: (state, getters) => {
            const selectedTipoRecurso = getters['recurso/getSelectedTipoRecurso'];
            return state.resources.filter((resource) => {
                const matchesTipoRecurso = selectedTipoRecurso ? resource.tipo === selectedTipoRecurso : true;
                return matchesTipoRecurso;
            });
        },
    },
});
