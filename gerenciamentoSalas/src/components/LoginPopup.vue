<template>
  <div v-if="showPopup" class="login-popup">
    <div class="popup-content">
      <span @click="closePopup">Fechar</span>
      <p>Por favor, faça login para continuar</p>
      <button @click="redirectTo('login')">Login</button>
      <button @click="redirectTo('register')">Cadastro</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPopup: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    redirectTo(page) {
      this.$emit('redirect', page);
    }
  }
};
</script>

<style scoped>
/* Adicione aqui seus estilos do pop-up */
.login-popup {
  display: flex;
  position: fixed;
  /* Outros estilos do pop-up */
}
</style>
