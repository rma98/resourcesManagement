<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p class="status" :class="statusClass">{{ status }}</p>
    <p class="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    status: String,
    description: String,
    isAvailable: Boolean
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
