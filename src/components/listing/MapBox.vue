<script lang="ts" setup>
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";

defineProps<{
  location: {
    lat: number;
    lng: number;
  };
}>();
const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
</script>

<template>
  <a
    target="_blank"
    :href="'https://www.google.com/maps/search/?api=1&query=' + location.lat + ',' + location.lng"
  >
    <MapboxMap
      style="height: 400px"
      :access-token="accessToken"
      map-style="mapbox://styles/mapbox/streets-v11"
      :center="[location.lng, location.lat]"
      :zoom="11"
    >
      <MapboxMarker :lng-lat="[location.lng, location.lat]" />
    </MapboxMap>
  </a>
</template>

<style scoped></style>
