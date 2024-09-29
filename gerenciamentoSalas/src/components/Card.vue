<template>
  <div class="card" :class="{ available: isAvailable, unavailable: !isAvailable }" @click="handleClick">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <span :class="statusClass">{{ status }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('card-clicked', { title: this.title }); // Emitindo o evento de clique
    }
  },
  computed: {
    statusClass() {
      return this.isAvailable ? 'available' : 'unavailable';
    }
  }
};
</script>

<style scoped>
.card {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 30%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.card h3 {
  margin: 0 0 10px;
}
.status {
  font-weight: bold;
}
.available {
  color: #388e3c;
}
.unavailable {
  color: #f44336;
}
</style>
