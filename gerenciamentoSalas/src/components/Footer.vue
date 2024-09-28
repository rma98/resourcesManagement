<template>
  <footer>
    <p>{{ currentYear }} &copy; Todos os direitos reservados.</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(), // Obter o ano atual
    };
  },
};
</script>

<style scoped>
footer {
  text-align: center;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  position: relative;
  clear: both;
}
</style>
