<template>
    <section class="faq-container">
        <h3 class="faq-titulo">Perguntas Frequentes - Sistema de Gerenciamento de Salas e Laboratórios</h3>
        <div class="faq">
            <div v-for="(item, index) in perguntas" :key="index" class="faq-item">
                <div class="pergunta" @click="toggleResposta(index)">
                    <h3>{{ item.pergunta }}</h3>
                    <i :class="item.ativada ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                </div>
                <div class="resposta" :class="{ ativar: item.ativada }">
                    <p>{{ item.resposta }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            perguntas: [
                {
                    pergunta: "Como faço login no sistema?",
                    resposta:
                        "Você pode fazer login utilizando seu e-mail institucional e senha cadastrada. Caso tenha problemas, use a opção 'Esqueci minha senha'.",
                    ativada: false,
                },
                {
                    pergunta: "Quem pode criar ou cancelar reservas?",
                    resposta:
                        "Coordenadores e professores podem criar reservas diretamente. Para cancelar reservas apenas coordenadores podem realizar está ação.",
                    ativada: false,
                },
                {
                    pergunta: "Como sei se minha solicitação de reserva foi aprovada?",
                    resposta:
                        "Você pode acompanhar o status das suas reservas na página 'Minhas Reservas'. Notificações também serão enviadas por e-mail.",
                    ativada: false,
                },
                {
                    pergunta: "O que fazer se eu não conseguir acessar minha conta?",
                    resposta:
                        "Use a opção 'Esqueci minha senha' na página de login ou entre em contato com o suporte técnico.",
                    ativada: false,
                },
                {
                    pergunta: "Como visualizar a disponibilidade de recursos?",
                    resposta:
                        "Você pode verificar as salas e laboratórios disponíveis na aba 'Recursos'. Utilize os filtros para refinar sua pesquisa.",
                    ativada: false,
                },
            ],
        };
    },
    methods: {
        toggleResposta(index) {
            this.perguntas[index].ativada = !this.perguntas[index].ativada;
        },
    },
};
</script>

<style scoped>
/* Reset básico */
.faq-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 850px;
    margin: 55px auto;
    padding: 20px;
}

.faq-titulo {
    color: #1C1C1C;
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 20px;
}

/* Pergunta */
.faq-item {
    margin-bottom: 15px;
}

.pergunta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #4caf50;
    padding: 15px 20px;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease;
}

.pergunta:hover {
    background: #e8f5e9;
    border-color: #4caf50;
}

.pergunta h3 {
    font-size: 2rem;
    color: #1C1C1C;
    flex: 1;
    text-align: left;
}

.pergunta i {
    font-size: 1.8rem;
    color: #4caf50;
    transition: transform 0.3s ease;
}

.pergunta .uil-angle-up {
    transform: rotate(180deg);
}

/* Resposta */
.resposta {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 20px;
    transform: scaleY(0.8);
    transform-origin: top;
    transition: all 0.4s ease-in-out;
    font-size: 1.7rem;
    color: #555;
}

.ativar {
    max-height: 300px;
    opacity: 1;
    transform: scaleY(1);
    padding: 10px 20px;
}
</style>
