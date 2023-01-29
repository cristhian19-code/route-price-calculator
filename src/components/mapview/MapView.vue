<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Mapboxgl from "mapbox-gl";

// Composables
import { usePlaces } from "../../composables/usePlaces";
import { useMap } from "../../composables/useMap";

// Components
import spinner from "@/components/icons/spinner.vue";

const mapElement = ref<HTMLDivElement>();

const { isUserLocationReady, userLocation } = usePlaces();

const { setMap } = useMap();

const initMap = async () => {
  if (!mapElement.value) return;
  if (!userLocation.value) return;

  // dar tiempo para que renderice correctamente el mapa
  await Promise.resolve();

  //   Creacion de mapa
  const map = new Mapboxgl.Map({
    container: mapElement.value,
    style: "mapbox://styles/mapbox/navigation-night-v1", 
    center: userLocation.value,
    zoom: 11,
  });

  //   Creacion de poppup
  const myLocationPoppup = new Mapboxgl.Popup().setLngLat(userLocation.value)
    .setHTML(`
        <p class="text-black"></p>
    `);

  // Creacion de marcador
  const myLocationMarker = new Mapboxgl.Marker()
    .setLngLat(userLocation.value)
    .setPopup(myLocationPoppup)
    .addTo(map);

  // todo: Establecer el mapa en pinia
  setMap(map);
};

onMounted(() => {
  if (isUserLocationReady) return initMap();
});

watch(isUserLocationReady, (newVal) => {
  if (isUserLocationReady.value) initMap();
});
</script>

<template>
  <div
    v-if="!isUserLocationReady"
    class="
      h-full
      w-full
      flex flex-col
      items-center
      justify-center
      z-50
      fixed
      text-center
    "
  >
    <spinner />
  </div>

  <div
    v-show="isUserLocationReady"
    ref="mapElement"
    class="w-full h-full"
  ></div>
</template>