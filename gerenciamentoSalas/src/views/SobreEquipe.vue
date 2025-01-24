<template>
    <!-- Cabeçalho com descrição do sistema -->
    <div class="header">
        <h1>Conheça a equipe do Sistema de Gerenciamento de Salas e Laboratórios</h1>
        <div class="about">
            <p>
                O Sistema de Gerenciamento de Salas e Laboratórios foi idealizado para facilitar a gestão
                de recursos como salas e laboratórios, promovendo uma maneira eficiente de fazer reservas,
                com base na disponibilidade dos espaços. A ideia começou na disciplina Projeto de Desenvolvimento de
                Sistemas Web I, com o apoio do professor Delano Oliveira, e continuou com melhorias na disciplina de
                Projeto de Desenvolvimento de Sistemas Web II, ministrada pelo professor Leonardo Lima.
            </p>
        </div>
    </div>

    <!-- Equipe (Professores e Desenvolvedores) -->
    <div class="main-container">
        <div class="professores">
            <p class="class">Professor</p>
            <div class="tela">
                <div>
                    <img class="avatar" src="../assets/foto/leonardo.png" alt="Leonardo Lima">
                    <div class="detalhes">
                        <p>Leonardo Lima</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="desenvolvedores">
            <p class="class">Desenvolvedores</p>
            <div class="tela">
                <div>
                    <img class="avatar" src="../assets/foto/robson.png"
                        alt="Robson Albuquerque">
                    <div class="detalhes">
                        <p>Robson Albuquerque</p>
                    </div>
                </div>
                <div>
                    <img class="avatar" src="../assets/foto/hiany.png" alt="Hiany Silva">
                    <div class="detalhes">
                        <p>Hiany Silva</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sobre",
};
</script>

<style scoped>
/* Estilos Integrados */
.header {
    padding: 20px;
    text-align: center;
}

.header>h1 {
    color: #1C1C1C;
    font-size: 2.5rem;
    margin-bottom: 20px;
}

.about {
    background: linear-gradient(135deg, #388e3c 0%, #f9f9f9 60%, #ccc 100%);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-left: 200px;
    margin-right: 200px;
    margin-top: 10px;
    padding: 10px;
}

.about>p {
    color: #404040;
    padding: 20px;
    font-size: 1.7rem;
}

.main-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 50px;
    margin-top: 25px;
}

.professores,
.desenvolvedores {
    text-align: center;
    width: 45%;
}

.class {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #1C1C1C;
    font-weight: bold;
}

.avatar {
    width: 200px;
    height: 200px;
    border-radius: 0;
    /* Começa quadrado */
    object-fit: cover;
    margin-bottom: 10px;
    transition: transform 0.4s ease, border-radius 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
}

.avatar:hover {
    border-radius: 50%;
    /* Transforma em círculo */
    transform: scale(1.1) rotate(5deg);
    /* Aumenta levemente e adiciona rotação */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    /* Adiciona uma sombra mais destacada */
    background-color: hsl(155, 41%, 85%);
    /* Um toque sutil de cor no fundo */
}

.detalhes p {
    text-align: center;
    font-size: 1.4rem;
    color: #1C1C1C;
}

.tela {
    display: flex;
    justify-content: center;
    gap: 40px;
}

.tela div {
    margin-left: 20px;
    margin-right: 20px;
}

/* Responsividade */
@media (max-width: 768px) {
    .header>h1 {
        font-size: 2rem;
    }

    .about {
        margin-left: 20px;
        margin-right: 20px;
    }

    .about>p {
        font-size: 1.3rem;
    }

    .main-container {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .professores,
    .desenvolvedores {
        width: 90%;
    }

    .tela {
        flex-direction: column;
        align-items: center;
    }

    .avatar {
        width: 150px;
        height: 150px;
    }

    .detalhes p {
        font-size: 1rem;
    }

    .class {
        font-size: 1.5rem;
    }
}
</style>
