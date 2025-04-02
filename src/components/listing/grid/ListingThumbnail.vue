<script lang="ts" setup>
import type { Listing } from "@/data/types/listings/Listing";

defineProps<{
  listing: Listing;
}>();
</script>

<template>
  <RouterLink :to="`/listings/${listing.id}`" class="remove-link-decoration">
    <div class="listing-thumbnail">
      <img :src="listing.image" alt="listing image" class="image" />
      <div class="listing-details">
        <h2 class="listing-title">{{ listing.title }}</h2>
        <p class="description-container">
          {{ listing.description }}
        </p>
        <p>Price: {{ listing.price }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.remove-link-decoration {
  color: inherit;
  text-decoration: none;
}

.listing-thumbnail {
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; /* Clipping the border radius */
}

.listing-details {
  display: flex;
  padding: 10px;
  flex-direction: column;
  height: 300px;
  overflow: hidden;
}

.listing-title {
  font-weight: bold;
}

.image {
  height: 60%;
  object-fit: cover;
}

.description-container {
  overflow-y: auto;
  flex-grow: 1;
}
</style>
