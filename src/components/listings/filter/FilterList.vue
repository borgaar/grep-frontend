<script setup lang="ts">
import { ref } from "vue";
import CategoryFilter from "./CategoryFilter.vue";

const priceRange = ref([0, 100]);
</script>

<template>
  <div class="container">
    <div class="price-range">
      <p>{{ priceRange[0] * 100 }}kr - {{ priceRange[1] * 100 }}kr</p>
      <Slider v-model="priceRange" range class="price-range-slider" />
    </div>
    <div class="category">
      <CategoryFilter />
    </div>
    <Button class="apply-button" :disabled="priceRange[0] === priceRange[1]">Apply</Button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  row-gap: 20px;
  padding-block: 20px;
  align-items: center;
}

.category {
  width: 80%;
  height: min-content;
}

.price-range {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
}

.price-range-slider {
  width: 80%;
  margin-inline: auto;
}

.apply-button {
  width: 80%;
  margin: 0px;
}
</style>
