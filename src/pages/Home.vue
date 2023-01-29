<script setup lang="ts">
import MapView from "@/components/mapview/MapView.vue";
import LocationButton from "@/components/btn/LocationButton.vue";
import SearchBar from "@/components/searchbar/SearchBar.vue";
import SearchInfo from "@/components/search-info/SearchInfo.vue";

</script>

<template>
  <map-view />

  <location-button />

  <search-bar />
  <search-info />
</template>