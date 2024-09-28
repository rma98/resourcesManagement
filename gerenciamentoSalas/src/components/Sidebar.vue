<template>
  <nav class="sidebar" :class="{ active: isActive }">
    <ul>
      <li><a href="#"><i class="fas fa-home"></i> Home</a></li>
      <li><a href="#"><i class="fas fa-door-open"></i> Visualizar Salas</a></li>
      <li><a href="#"><i class="fas fa-flask"></i> Visualizar Laboratórios</a></li>
      <li><a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Sair</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
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
