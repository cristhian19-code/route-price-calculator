<script setup lang="ts">
import { computed } from "vue";

import { usePlaces } from "../../composables/usePlaces";
import { useMap } from "../../composables/useMap";

const { userLocation, isUserLocationReady } = usePlaces();
const { map, isMapReady } = useMap();

const isButtonReady = computed(
  () => isUserLocationReady.value && isMapReady.value
);

const onMyLocationClick = () => {
  map.value?.flyTo({
    center: userLocation.value,
    zoom: 14,
  });
};
</script>

<template>
  <div class="fixed bottom-10 right-10 flex justify-center items-center">
    <button
      v-if="isButtonReady"
      @click="onMyLocationClick"
      class="
        bg-zinc-900
        h-10
        w-10
        rounded-full
        duration-500
        transition-all
      "
    >
      <i class="ri-map-pin-fill text-md text-white"></i>
    </button>

      <div class="bg-zinc-900 h-8 w-8 animate-ping absolute rounded-full -z-20"></div>
  </div>
</template>