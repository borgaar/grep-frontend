<script lang="ts" setup>
import type { Listing } from "@/data/types/listings/Listing";

defineProps<{
  listing: Listing;
}>();
</script>

<template>
  <div class="container">
    <div class="title-desciption">
      <h1 class="title">{{ listing.title }}</h1>
      <p>{{ listing.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.title-description {
  display: flex;
  flex-direction: column;
}

.container {
  border-bottom: 1px solid white;
  padding-block: 10px;
}

.title {
  line-height: 1;
}
</style>
