<script lang="ts" setup>
import {
  ListingControllerService,
  MessageControllerService,
  type ListingDTO,
} from "@/api/services";
import MapBox from "@/components/listing/MapBox.vue";
import PageContainer from "@/components/PageContainer.vue";
import { onMounted, ref } from "vue";
import Popover from "primevue/popover";
import { useRoute } from "vue-router";

import { useI18n } from "vue-i18n";
import { format } from "date-fns";
const { t } = useI18n();
const op = ref();
const currentMessage = ref("");

const showContactForm = (event: MouseEvent) => {
  op.value.show(event);
};

const sendMessage = (event: Event) => {
  if (listing.value === undefined) {
    return;
  }

  op.value.hide(event);
  MessageControllerService.sendMessage({
    requestBody: {
      content: currentMessage.value,
      recipientId: listing.value.author.phone,
    },
  });

  currentMessage.value = "";
};

const route = useRoute();

onMounted(async () => {
  listing.value = await ListingControllerService.get({ id: route.params.id as string });
});

const listing = ref<ListingDTO>();

const toggleBookmarked = async () => {
  // Optimistic update
  if (!listing.value) return;
  listing.value.isBookmarked = !listing.value.isBookmarked;

  await ListingControllerService.update({
    id: listing.value.id,
    requestBody: {
      ...listing.value,
      bookmarked: listing.value.isBookmarked,
      category: listing.value.category.name,
    },
  });
};
</script>

<template>
  <PageContainer v-if="listing !== undefined" class="container">
    <img :src="'https://picsum.photos/200/300'" class="listing-image" :height="500" />
    <div class="content-area">
      <div class="listing-text">
        <h1 class="listing-title">{{ listing.title }}</h1>
        <p>{{ listing.description }}</p>
      </div>
      <div class="interactive-area">
        <h2 class="listing-price">{{ listing.price }} {{ $t("currency") }}</h2>
        <div class="listing-author">
          <p>{{ $t("name") }}:</p>
          <p style="text-align: end">
            {{ listing.author.firstName }} {{ listing.author.lastName }}
          </p>
          <p>{{ $t("phone") }}:</p>
          <p style="text-align: end">{{ listing.author.phone }}</p>
          <p>{{ $t("posted") }}:</p>
          <p style="text-align: end">
            {{ format(new Date(listing.createdAt), "dd.MM.yyyy HH:mm") }}
          </p>
        </div>
        <MapBox
          class="listing-map"
          :location="{ lat: listing.location.lat, lng: listing.location.lon }"
        />
        <div class="button-container">
          <Button
            class="contact-button"
            icon="pi pi-phone"
            :label="t('contact')"
            @click="showContactForm"
          />
          <Button
            class="contact-button"
            icon="pi pi-star"
            :label="Boolean(listing?.isBookmarked) ? t('saved') : t('save')"
            severity="help"
            :variant="listing?.isBookmarked ? 'outlined' : undefined"
            @click="toggleBookmarked"
          />
        </div>
        <Popover ref="op" :dismissable="false">
          <div class="flex flex-col gap-4">
            <div class="message-input-container">
              <InputText
                v-model="currentMessage"
                type="text"
                :placeholder="t('skriv-en-melding')"
                class="message-input"
                @keyup.enter="sendMessage"
              />
              <Button class="send-button" icon="pi pi-send" @click="sendMessage" />
            </div>
          </div>
        </Popover>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.container {
  margin-block: 20px;
}

.message-input-container {
  display: flex;
  gap: 10px;
}

.listing-price {
  font-size: 1.8rem;
  font-weight: 600;
}

.listing-author {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  width: 100%;
}

.listing-author p {
  font-weight: 500;
}

.listing-image {
  width: 100%;
  height: 400;
  object-fit: cover;
  border-radius: 10px;
}

.listing-text {
  margin-bottom: 20px;
}

.listing-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.listing-short-description {
  font-weight: 500;
  margin-bottom: 10px;
}

.listing-map {
  /* corner rounding */
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow: hidden;
  min-width: 100%;
}

.content-area {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  gap: 20px;
}

@media (max-width: 768px) {
  .content-area {
    flex-direction: column;
  }
}

.contact-button {
  width: 100%;
}

.interactive-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #f0f8ff;
  align-items: center;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
}
</style>
