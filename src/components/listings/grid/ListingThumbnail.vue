<script lang="ts" setup>
import type { ListingDTO } from "@/api/services";

defineProps<{
  listing: ListingDTO;
}>();
</script>

<template>
  <RouterLink :to="`/listing/${listing.id}`" class="remove-link-decoration">
    <div class="listing-thumbnail">
      <img :src="'https://picsum.photos/200/300'" alt="listing image" class="image" />
      <div class="listing-details">
        <div class="title-container">
          <h2 class="listing-title">{{ listing.title }}</h2>
          <i v-if="listing.isBookmarked" class="pi pi-star bookmark"></i>
        </div>
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

.listing-thumbnail:hover {
  transform: scale(1.03);
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
}

.title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.bookmark {
  color: var(--p-yellow-400);
  font-size: 1.5rem;
}

.listing-thumbnail {
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: transform 0.1s ease;
  transform: scale(1);
  height: 100%;
  overflow: hidden; /* Clipping the border radius */
}

.listing-details {
  position: relative;
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
