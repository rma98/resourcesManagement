<template>
  <nav>
    <ul>
      <li @click="handleMenuClick('home')">Home</li>
      <li @click="handleMenuClick('viewRooms')">Visualizar Salas</li>
      <li @click="handleMenuClick('viewLabs')">Visualizar Laboratórios</li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["isLoggedIn"],
  methods: {
    handleMenuClick(option) {
      if (!this.isLoggedIn) {
        this.$emit("show-popup"); // Emite um evento para abrir o popup
      } else {
        switch (option) {
          case "home":
            this.$router.push("/"); // Redireciona para a página Home
            break;
          case "viewRooms":
            this.$router.push("/view-rooms"); // Altere para o caminho correto
            break;
          case "viewLabs":
            this.$router.push("/view-labs"); // Altere para o caminho correto
            break;
        }
        this.closePopup(); // Fecha o popup ao escolher uma opção
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  position: fixed;
  right: -250px;
  top: 0;
  height: 100%;
  background-color: #388e3c;
  transition: right 0.3s;
  z-index: 100;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
}

.sidebar.active {
  right: 0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 15px;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.sidebar ul li a:hover {
  background-color: #4caf50;
}

.sidebar ul li a i {
  margin-right: 10px;
}
</style>
