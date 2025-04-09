<script lang="ts" setup>
import type { ListingDTO } from "@/api/services";

defineProps<{
  listing: ListingDTO;
}>();
</script>

<template>
  <RouterLink :to="`/listing/${listing.id}`" class="container">
    <div class="image-container">
      <img
        :src="'https://picsum.photos/id/237/200/300'"
        style="object-fit: cover; height: 100%; width: 100%"
      />
    </div>
    <div class="title-description">
      <h1 class="title">{{ listing.title }}</h1>
      <p>{{ listing.description }}</p>
    </div>
    <div class="expand"></div>
    <i v-if="listing.isBookmarked" class="pi pi-star bookmark"></i>
  </RouterLink>
</template>

<style scoped>
.title-description {
  display: flex;
  flex-direction: column;
}

.expand {
  flex-grow: 1;
}

.image-container {
  object-fit: cover;
  border-radius: 0.5rem;
  height: 90%;
  aspect-ratio: 4/3;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  align-items: center;
  height: 4rem;
  text-decoration: inherit;
  color: inherit;
  column-gap: 1rem;
  border-bottom: 1px solid white;
  padding-block: 10px;
  border-top: 1px solid var(--p-neutral-300);
  transition: height 0.3s ease;
}

.container:hover {
  height: 6rem;
}

.title {
  line-height: 1;
  font-size: 1.4rem;
  font-weight: 500;
}

.bookmark {
  color: var(--p-yellow-400);
  font-size: 1.5rem;
}
</style>
