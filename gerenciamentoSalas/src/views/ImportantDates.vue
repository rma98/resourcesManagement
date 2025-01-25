<template>
    <div class="important-dates-page container">
        <header class="page-header">
            <h1>
                <i class="fas fa-calendar-alt icon"></i> Datas Importantes
            </h1>
            <p>Confira os feriados e eventos organizados por ano.</p>
        </header>

        <div v-for="(dates, year, index) in paginatedYears" :key="year" class="year-section">
            <h2>{{ year }}</h2>

            <div class="dates-category">
                <div class="category">
                    <h3>Feriados</h3>
                    <ul>
                        <li v-for="holiday in dates.feriados" :key="holiday.id">
                            <strong>{{ holiday.date }}</strong> - {{ holiday.description }}
                        </li>
                    </ul>
                </div>

                <div class="category">
                    <h3>Eventos</h3>
                    <ul>
                        <li v-for="event in dates.eventos" :key="event.id">
                            <strong>{{ event.date }}</strong> - {{ event.description }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- <div class="pagination">
            <button :disabled="currentPage === 1" @click="prevPage" class="btn">
                Anterior
            </button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="nextPage" class="btn">
                Próximo
            </button>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            importantDates: {}, // Dados completos retornados pela API
            currentPage: 1, // Página inicial
            itemsPerPage: 10, // Número de anos exibidos por página
        };
    },
    computed: {
        paginatedYears() {
            // Converte o objeto de anos em uma lista para paginação
            const years = Object.keys(this.importantDates);
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const paginatedKeys = years.slice(start, end);

            // Retorna os dados apenas dos anos na página atual
            return paginatedKeys.reduce((result, year) => {
                result[year] = this.importantDates[year];
                return result;
            }, {});
        },
        totalPages() {
            // Calcula o total de páginas com base no número de anos
            return Math.ceil(Object.keys(this.importantDates).length / this.itemsPerPage);
        },
    },
    methods: {
        async fetchImportantDates() {
            try {
                const response = await fetch("http://localhost:8080/api/events");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                this.importantDates = data; // Atualiza os dados recebidos
            } catch (error) {
                console.error("Erro ao carregar os eventos:", error);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
    },
    mounted() {
        this.fetchImportantDates();
    },
};
</script>

<style scoped>
/* Container principal */
.important-dates-page {
    padding: 1rem;
    max-width: 1200px;
    margin: auto;
}

/* Cabeçalho da página */
.page-header {
    text-align: center;
    margin-bottom: 2rem;
}

.page-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
}

.page-header p {
    color: #7f8c8d;
    font-size: 2rem;
}

/* Seção de ano */
.year-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Cabeçalho do ano */
.year-section h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    border-left: 5px solid #3498db;
    padding-left: 10px;
    text-transform: uppercase;
}

/* Contêiner de categorias */
.dates-category {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 1rem;
}

/* Categoria individual */
.category {
    flex: 1;
    min-width: 250px;
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: box-shadow 0.3s ease;
}

/* Título de categorias */
.category h3 {
    font-size: 1.8rem;
    color: #34495e;
    margin-bottom: 1rem;
    border-bottom: 2px solid #3498db;
    padding-bottom: 5px;
}

/* Lista de eventos e feriados */
.category ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.category li {
    margin-bottom: 0.8rem;
    color: #2c3e50;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
}

.category li strong {
    color: #e74c3c;
    font-weight: bold;
    margin-right: 0.5rem;
}

/* Hover nas categorias */
.category:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    gap: 1rem;
}

.pagination .btn {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.pagination .btn:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}

.pagination span {
    font-size: 1.2rem;
    color: #2c3e50;
}

/* Responsividade */
@media (max-width: 768px) {
    .page-header h1 {
        font-size: 1.5rem;
    }

    .dates-category {
        flex-direction: column;
    }

    .year-section h2 {
        font-size: 1.5rem;
    }

    .category h3 {
        font-size: 1.6rem;
    }
}
</style>
