<template>
    <div class="item-list">
        <div class="filters">
            <!-- Filtros por nome e localização -->
            <div class="filter">
                <label for="name" class="filter-label">Filtrar por nome:</label>
                <input type="text" v-model="selectedName" id="name" class="custom-input"
                    placeholder="Digite o nome do recurso" />
            </div>
            <div class="filter">
                <label for="location" class="filter-label">Filtrar por localização:</label>
                <input type="text" v-model="selectedLocation" id="location" class="custom-input"
                    placeholder="Digite a localização" />
            </div>
            <div class="filter">
                <label for="status" class="filter-label">Filtrar por status:</label>
                <select id="status" v-model="selectedStatus" class="custom-input">
                    <option value="">Todos</option>
                    <option value="RESERVADO">Reservado</option>
                    <option value="DISPONIVEL">Disponível</option>
                </select>
            </div>
        </div>

        <div v-if="filteredResources.length" class="card-carousel">
            <div v-for="item in filteredResources" :key="item.id" class="card" :class="getCardClasses(item.status)">
                <div class="card-header">
                    <h4>{{ item.nome }}</h4>
                    <span class="status-icon">
                        <i :class="getStatusIconClass(item.status)" :title="item.status"></i>
                    </span>
                </div>
                <p><strong>Status:</strong> {{ item.status }}</p>
                <p><strong>Descrição:</strong> {{ item.descricao }}</p>
                <p><strong>Capacidade:</strong> {{ item.capacidade }}</p>
                <p><strong>Localização:</strong> {{ item.localizacao }}</p>
                <div class="actions">
                    <i v-if="isLoggedIn && userRole === 'COORDENADOR'" class="fas fa-edit" @click="editItem(item)"
                        title="Editar"></i>
                    <i v-if="isLoggedIn && userRole === 'COORDENADOR'" class="fas fa-trash delete-item-btn"
                        @click="openDeleteModal(item)" title="Excluir"></i>
                    <!-- Botão de reservar -->
                    <button
                        v-if="isLoggedIn && (userRole === 'COORDENADOR' || userRole === 'PROFESSOR' || userRole === 'ALUNO')"
                        :disabled="item.status === 'OCUPADO' || item.status === 'RESERVADO' || item.status === 'PENDENTE'"
                        @click="openReservationModal(item)" class="btn-reservar">
                        Reservar
                    </button>
                    <!-- Botão de cancelar -->
                    <button
                        v-if="isLoggedIn && userRole === 'COORDENADOR' && item.reservasIds && item.reservasIds.length > 0 && item.status !== 'DISPONIVEL'"
                        @click="cancelReservation(item)" class="btn-cancelar">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
        <div v-else-if="selectedStatus">
            <p>Nenhuma reserva encontrada com o status "{{ selectedStatus }}".</p>
        </div>
        <div v-else>
            <p>Nenhum recurso encontrado.</p>
        </div>

        <!-- Modal de exclusão -->
        <ModalExcluir :visible="showDeleteModal" :itemName="itemToDelete.nome" @close="closeDeleteModal"
            @confirm="deleteItem(itemToDelete.id)" />

        <!-- Modal de reserva -->
        <ModalReserva :visible="showReservationModal" :resourceId="resourceToReserve?.id"
            :resourceName="resourceToReserve?.nome" :resourceDescription="resourceToReserve?.descricao"
            @close="showReservationModal = false" @reserve-created="handleReservationCreated" />
    </div>
</template>

<script>
import ModalExcluir from "../components/ModalExcluir.vue";
import ModalReserva from "../components/ModalReserva.vue";
import { mapState, mapActions } from "vuex";

export default {
    components: { ModalExcluir, ModalReserva },
    data() {
        return {
            resources: [],
            selectedName: "",
            selectedLocation: "",
            selectedStatus: "",
            showDeleteModal: false,
            itemToDelete: {},
            showReservationModal: false,
            resourceToReserve: null,
            updateInterval: null,
        };
    },
    computed: {
        ...mapState({
            isLoggedIn: (state) => !!state.user.name,
            userRole: (state) => state.user.role,
        }),
        filteredResources() {
            return this.resources.filter((item) => {
                const matchesName = this.selectedName
                    ? item.nome.toLowerCase().includes(this.selectedName.toLowerCase())
                    : true;
                const matchesLocation = this.selectedLocation
                    ? item.localizacao.toLowerCase().includes(this.selectedLocation.toLowerCase())
                    : true;
                const matchesStatus = this.selectedStatus ? item.status === this.selectedStatus : true;

                return matchesName && matchesLocation && matchesStatus;
            });
        },
    },
    created() {
        this.loadResources();
        // Inicia o polling para atualizar os recursos automaticamente
        this.updateInterval = setInterval(() => {
            this.loadResources();
        }, 10000); // Atualiza a cada 5 segundos (ajuste o tempo conforme necessário)
    },
    beforeDestroy() {
        // Limpa o intervalo ao destruir o componente
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    },
    methods: {
        ...mapActions({
            removeResource: "removeResource",
        }),
        async loadResources() {
            try {
                const response = await fetch("http://localhost:8080/api/recursos");
                if (!response.ok) throw new Error("Erro ao carregar os recursos");
                const data = await response.json();
                this.resources = data.map((resource) => ({
                    ...resource,
                    status: resource.status || "PENDENTE",
                }));
            } catch (error) {
                console.error(error);
            }
        },
        editItem(item) {
            this.$router.push(`/editar-recurso/${item.tipoRecurso || "geral"}/${item.id}`);
        },
        openDeleteModal(item) {
            this.itemToDelete = item;
            this.showDeleteModal = true;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
        async deleteItem(id) {
            try {
                const token = localStorage.getItem("token"); // Recuperar o token do localStorage
                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }

                const response = await fetch(`http://localhost:8080/api/recursos/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Adicionando o token no cabeçalho
                    },
                });

                if (!response.ok) throw new Error("Erro ao excluir o recurso");
                this.resources = this.resources.filter((item) => item.id !== id);
                this.closeDeleteModal();
                this.showSuccessMessage("Recurso excluído com sucesso!");
            } catch (error) {
                this.showError("Erro ao excluir o recurso");
            }
        },
        async cancelReservation(resource) {
            try {
                const reservationId = resource.reservasIds[0];
                const token = localStorage.getItem("token"); // Recuperar o token do localStorage

                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }

                const response = await fetch(`http://localhost:8080/api/reservas/${reservationId}/cancelar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Adicionando o token no cabeçalho
                    },
                });

                if (!response.ok) throw new Error("Erro ao cancelar a reserva");

                // Recarrega a lista de recursos após o cancelamento
                this.loadResources();
                this.showSuccessMessage("Reserva cancelada com sucesso!");
            } catch (error) {
                this.showError("Erro ao cancelar a reserva.");
            }
        },
        async buscarPorStatus() {
            try {
                // Caso o status não seja selecionado, recarrega todos os recursos
                if (!this.selectedStatus) {
                    this.loadResources();
                    return;
                }

                const token = localStorage.getItem("token"); // Recuperar o token do localStorage
                if (!token) {
                    throw new Error("Token de autenticação não encontrado.");
                }

                const response = await fetch(`http://localhost:8080/api/reservas/status/${this.selectedStatus}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Adicionando o token no cabeçalho
                    },
                });

                if (!response.ok) throw new Error("Erro ao buscar reservas pelo status.");
                const reservas = await response.json();

                // Atualiza a lista de recursos com base no status selecionado
                this.resources = reservas.map((reserva) => ({
                    id: reserva.id,
                    nome: reserva.nome || "Recurso sem nome",
                    descricao: reserva.descricao || "Descrição indisponível",
                    capacidade: reserva.capacidade || "Não informada",
                    localizacao: reserva.localizacao || "Localização desconhecida",
                    status: reserva.status || "PENDENTE",
                    reservasIds: reserva.reservasIds || [],
                }));
            } catch (error) {
                console.error(error);
                this.showError("Erro ao buscar reservas pelo status.");
            }
        },
        openReservationModal(resource) {
            this.resourceToReserve = resource;
            this.showReservationModal = true;
        },
        handleReservationCreated() {
            this.showReservationModal = false; // Fechar o modal
            this.loadResources(); // Recarregar a lista
        },
        showSuccessMessage(message) {
            alert(message);
        },
        showError(message) {
            alert(message);
        },
        getCardClasses(status) {
            return {
                "status-pendente": status === "PENDENTE",
                "status-reservado": status === "RESERVADO",
                "status-cancelada": status === "CANCELADA",
                "status-disponivel": status === "DISPONIVEL",
                "status-ocupado": status === "OCUPADO",
            };
        },
        getStatusIconClass(status) {
            switch (status) {
                case "PENDENTE":
                    return "fas fa-hourglass-half";
                case "RESERVADO":
                    return "fas fa-check-circle";
                case "CANCELADA":
                    return "fas fa-times-circle";
                case "DISPONIVEL":
                    return "fas fa-check-circle";
                case "OCUPADO":
                    return "fas fa-times-circle";
                default:
                    return "";
            }
        },
    },
};
</script>

<style scoped>
/* Container dos filtros */
.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

/* Cada filtro individual */
.filter {
    flex: 1;
    min-width: 220px;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

/* Rótulos */
.filter-label {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
    transition: color 0.3s ease;
}

.filter-label:hover {
    color: #007bff;
}

/* Estilo dos campos de input e select */
.custom-input,
.custom-select {
    width: 100%;
    padding: 12px 15px;
    font-size: 1rem;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-input:focus,
.custom-select:focus {
    outline: none;
    border-color: #388e3c;
    box-shadow: 0 0 8px rgba(56, 142, 60, 0.5);
    background-color: #e8f5e9;
}

.custom-input:hover,
.custom-select:hover {
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.4);
}

/* Grid responsivo para os cards */
.card-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.card {
    height: 100%;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Feedback visual de hover */
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.status-pendente {
    background-color: #ffeeba;
}

.status-reservado {
    background-color: #c3e6cb;
}

.status-cancelada {
    background-color: #f5c6cb;
}

.status-disponivel {
    background-color: #d4edda;
}

.status-ocupado {
    background-color: #f8d7da;
}

.status-icon {
    font-size: 1.5rem;
    color: inherit;
    margin-bottom: 10px;
}

/* Botões de ação */
.actions i {
    cursor: pointer;
    margin-right: 15px;
}

.actions .delete-item-btn {
    color: red;
}

.btn-reservar {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 10px;
    align-self: flex-end;
}

.btn-reservar:hover {
    background-color: #45a049;
}

.btn-reservar:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
}

/* Botão de cancelar */
.btn-cancelar {
    background-color: #f44336;
    /* Vermelho */
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 10px;
    align-self: flex-end;
}

/* Hover do botão cancelar */
.btn-cancelar:hover {
    background-color: #d32f2f;
    /* Vermelho mais escuro no hover */
}

/* Botão cancelar desabilitado */
.btn-cancelar:disabled {
    background-color: #ccc;
    /* Cinza */
    color: #666;
    cursor: not-allowed;
}

/* Botão de confirmar */
.btn-confirmar {
    background-color: #2196f3;
    /* Azul */
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 10px;
    align-self: flex-end;
}

/* Hover do botão confirmar */
.btn-confirmar:hover {
    background-color: #1976d2;
    /* Azul mais escuro no hover */
}

/* Botão confirmar desabilitado */
.btn-confirmar:disabled {
    background-color: #ccc;
    /* Cinza */
    color: #666;
    cursor: not-allowed;
}
</style>
