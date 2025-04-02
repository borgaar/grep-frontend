<script lang="ts" setup>
import type { Listing } from "@/data/types/listings/Listing";

defineProps<{
  listing: Listing;
}>();
</script>

<template>
  <div class="listing-thumbnail">
    <img :src="listing.image" alt="Listing Image" class="image" />
    <div class="listing-details">
      <h2 class="listing-title">{{ listing.title }}</h2>
      <p>{{ listing.description }}</p>
      <p>Price: {{ listing.price }}</p>
    </div>
  </div>
</template>

<style scoped>
.listing-thumbnail {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.listing-details {
  margin-top: -7px; /* I don't know where the margin comes from, but this will suffice */
  padding: 5px;
}

.listing-title {
  font-size: 1.2em;
  font-weight: bold;
}

.image {
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
</style>
