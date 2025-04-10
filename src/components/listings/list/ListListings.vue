<script lang="ts" setup>
import ListingRow from "./ListingRow.vue";
import PageContainer from "@/components/PageContainer.vue";
import type { ListingDTO } from "@/api/services";
import { onMounted } from "vue";

const props = defineProps<{
  listings: ListingDTO[];
}>();

onMounted(() => {
  console.log(props.listings.length);
});
</script>

<template>
  <PageContainer>
    <div class="listing-list">
      <ListingRow v-for="listing in props.listings" :key="listing.id" :listing="listing" />
    </div>
  </PageContainer>
</template>

<style scoped>
.listing-list {
  display: flex;
  flex-direction: column;
}
</style>
