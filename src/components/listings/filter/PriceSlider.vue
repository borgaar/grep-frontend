<script setup lang="ts">
import { useFilterStore } from "@/state/filter";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const priceRange = ref([0, 100000]);

const { priceLower, priceUpper } = storeToRefs(useFilterStore());

const onSliderChange = () => {
  priceLower.value = priceRange.value[0];
  priceUpper.value = priceRange.value[1];
};
</script>

<template>
  <p>{{ priceRange[0] }}kr - {{ priceRange[1] }}kr</p>
  <Slider
    v-model="priceRange"
    range
    :min="0"
    :max="100000"
    class="price-range-slider"
    @slideend="onSliderChange"
  />
</template>

<style scoped>
.price-range-slider {
  width: 80%;
  margin-inline: auto;
}
</style>
