<template>
    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <a href="https://www.palmares.ifpe.edu.br/" target="_blank" rel="noopener noreferrer"
                title="Instituto Federal de Educação, Ciência e Tecnologia de Pernambuco - IFPE">
                <img src="../assets/foto/if.png" alt="Logo da instituição" class="footer-logo" />
            </a>
            <p>&copy; {{ currentYear }} Todos os direitos reservados.</p>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear(), // Define o ano atual
        };
    },
};
</script>

<style scoped>
footer {
    text-align: center;
    padding: 10px 20px;
    background-color: #388e3c;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    position: relative;
    clear: both;
    font-size: 1.6rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.footer-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    cursor: pointer;
}

footer p {
    color: white;
    margin: 0;
}
</style>
