<template>
    <div class="about-page">
        <h1>Sobre o Sistema</h1>
        <p>Bem-vindo ao Sistema de Gerenciamento de Salas e Laboratórios! Aqui está tudo o que você precisa saber:</p>

        <section>
            <h2>O que é este sistema?</h2>
            <p>
                Este sistema foi desenvolvido para facilitar a reserva e o gerenciamento de recursos, como salas e
                laboratórios,
                para coordenadores, professores e alunos.
            </p>
        </section>

        <section>
            <h2>Funcionalidades</h2>
            <ul>
                <li><strong>Coordenadores:</strong> Podem adicionar, editar e excluir recursos, além de cancelar
                    reservas.</li>
                <li><strong>Professores:</strong> Podem visualizar recursos disponíveis e fazer reservas diretamente.
                </li>
                <li><strong>Alunos:</strong> Podem visualizar recursos e solicitar reservas, que serão aprovadas por um
                    professor ou coordenador.</li>
            </ul>
        </section>

        <section>
            <h2>Como usar o sistema?</h2>
            <ol>
                <li>Faça login com sua conta para acessar as funcionalidades.</li>
                <li>Navegue pelo menu para gerenciar ou reservar recursos.</li>
                <li>Acompanhe o status de suas reservas na página "Minhas Reservas".</li>
            </ol>
        </section>

        <router-link to="/" class="button primary">
            <i class="fas fa-arrow-left icon"></i> Voltar para a Página Inicial
        </router-link>
    </div>
</template>

<script>
export default {
    name: "About",
};
</script>

<style scoped>
.about-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

h2 {
    font-size: 2rem;
    margin-top: 20px;
    color: #388e3c;
}

p {
    font-size: 1.7rem;
}

ul {
    list-style-type: disc;
    margin: 10px 0 20px 20px;
    font-size: 1.4rem;
}

ol {
    list-style-type: decimal;
    margin: 10px 0 20px 20px;
    font-size: 1.4rem;
}

.button {
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 2rem;
    margin-top: 20px;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #45a049;
}

.icon {
    margin-right: 10px;
}
</style>