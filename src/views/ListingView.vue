<script lang="ts" setup>
import { MessageControllerService } from "@/api/services";
import MapBox from "@/components/listing/MapBox.vue";
import PageContainer from "@/components/PageContainer.vue";
import mockListings from "@/data/mock/listings";
import { ref, type VNodeRef } from "vue";

const op: VNodeRef = ref();
const currentMessage = ref("");

const showContactForm = () => {
  op.value.show();
};

const sendMessage = () => {
  op.value.hide();
  MessageControllerService.sendMessage({
    requestBody: {
      content: currentMessage.value,
      recipientId: listing.author.phone,
    },
  });

  currentMessage.value = "";
};

const listing = mockListings[0];
</script>

<template>
  <PageContainer class="container">
    <img :src="listing.image" class="listing-image" :height="500" />
    <div class="content-area">
      <div class="listing-text">
        <h1 class="listing-title">{{ listing.title }}</h1>
        <h2 class="listing-short-description">{{ listing.shortDescription }}</h2>
        <p>{{ listing.description }}</p>
      </div>
      <div class="interactive-area">
        <h2 class="listing-price">{{ listing.price }} {{ $t("currency") }}</h2>
        <div class="listing-author">
          <p>{{ $t("name") }}:</p>
          <p style="text-align: end">{{ listing.author.name }}</p>
          <p>{{ $t("phone") }}:</p>
          <p style="text-align: end">{{ listing.author.phone }}</p>
          <p>{{ $t("posted") }}:</p>
          <p style="text-align: end">
            {{ listing.createdAt.toLocaleString() }}
          </p>
        </div>
        <MapBox
          class="listing-map"
          :location="{ lat: listing.location.lat, lng: listing.location.lng }"
        />
        <Button class="contact-button" @click="showContactForm">{{ $t("contact") }}</Button>
        <Popover ref="op">
          <div class="flex flex-col gap-4">
            <div class="message-input-container">
              <Input
                v-model="currentMessage"
                type="text"
                placeholder="Skriv en melding ..."
                class="message-input"
                @keyup.enter="sendMessage"
              />
              <Button class="send-button" @click="sendMessage">
                <i class="icon icon-send"></i>
              </Button>
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
</style>
