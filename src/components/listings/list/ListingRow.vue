<script lang="ts" setup>
import { ImageControllerService, type ListingDTO } from "@/api/services";
import { onMounted, ref } from "vue";

const props = defineProps<{
  listing: ListingDTO;
}>();

const imageData = ref<string | undefined>(undefined);

onMounted(async () => {
  try {
    const response = await ImageControllerService.download({
      imageIds: [props.listing.imageIds[0]],
    });

    const base64EncodedImageData = Object.values(response)[0];

    imageData.value = `data:image/jpeg;base64,${base64EncodedImageData}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
});
</script>

<template>
  <RouterLink :to="`/listing/${listing.id}`" class="container">
    <div class="image-container">
      <img
        :src="imageData ?? '/placeholder.png'"
        alt="Listing image"
        style="object-fit: cover; height: 100%; width: 100%"
      />
    </div>
    <div class="title-description">
      <h1 class="title">{{ listing.title }}</h1>
      <p class="description">{{ listing.description }}</p>
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

.description {
  text-overflow: hidden;
  overflow: hidden;
  height: 1.4rem;
  width: 100%;
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
  min-width: 6rem;
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
