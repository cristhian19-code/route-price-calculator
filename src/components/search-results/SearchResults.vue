<script setup lang="ts">
import Spinner from "@/components/icons/spinner.vue";

import { computed, ref, watch } from "vue";
import { useMap } from "../../composables/useMap";

import { usePlaces } from "../../composables/usePlaces";
import { Feature } from "../../interfaces/places";

const activePlace = ref("");

const placesStore = usePlaces();
const { map, getRouterBetweenPoints, setPlaceMarkers } = useMap();

const places = computed(() => placesStore.places.value);
const isLoadingPlaces = computed(() => placesStore.isLoadingPlaces);

const isPlacesReady = computed(() => placesStore.isPlacesReady);

const onPlaceClick = (place: Feature) => {
  activePlace.value = place.id;

  const [lng, lat] = place.center;

  map.value?.flyTo({
    zoom: 14,
    center: [lng, lat],
  });
};

const getRouteDirection = (place: Feature) => {
  if (!placesStore.userLocation) return;

  const [startLng, startLat] = placesStore.userLocation.value!;

  const [lng, lat] = place.center;

  const start: [number, number] = [startLng, startLat];

  const end: [number, number] = [lng, lat];

  getRouterBetweenPoints(start, end);
};

watch(places, (newPlaces) => {
  activePlace.value = "";
  setPlaceMarkers(newPlaces);
});
</script>

<template>
  <div class="bg-white rounded-lg mt-0 overflow-hidden" v-if="isPlacesReady">
    <spinner v-if="!isLoadingPlaces" class="mx-auto" color="text-indigo-700" />
    <div class="flex flex-col" v-else>
      <div
        v-for="place in places"
        :key="place.id"
        class="p-4 flex items-cente gap-3"
        :class="activePlace === place.id ? 'bg-gray-200' : ''"
      >
        <div class="w-full cursor-pointer" @click="onPlaceClick(place)">
          <p class="text-md">{{ place.text_es }}</p>
          <p class="text-xs">{{ place.place_name_es }}</p>
        </div>
        <div class="w-10">
          <button
            @click="getRouteDirection(place)"
            class="
              w-10
              h-10
              flex
              justify-center
              items-center
              border
              rounded-full
              border-zinc-400
              transition-all
            "
          >
            <i class="ri-route-line"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>