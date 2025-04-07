<script lang="ts" setup>
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";

const props = defineProps<{
  location: {
    lat: number;
    lng: number;
  };
}>();

const onClick = () => {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${props.location.lat},${props.location.lng}`,
    "_blank",
  );
};

const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
</script>

<template>
  <MapboxMap
    style="height: 400px; width: 100%"
    :access-token="accessToken"
    map-style="mapbox://styles/mapbox/streets-v11"
    :onclick="onClick"
    :center="[location.lng, location.lat]"
    :zoom="11"
  >
    <MapboxMarker :lng-lat="[location.lng, location.lat]" />
  </MapboxMap>
</template>

<style scoped></style>
