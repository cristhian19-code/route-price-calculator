<script setup lang="ts">
import { computed, ref } from "vue";
import { usePlaces } from "../../composables/usePlaces";

import SearchResults from "@/components/search-results/SearchResults.vue";

// Variable de apoyo
const debounceValue = ref<string>("");
const { searchPlacesByTerm } = usePlaces();
// Variable para almacenar el timeout
const debounceTimeout = ref();

const searchTerm = computed({
  get() {
    return debounceValue.value;
  },
  set(val: string) {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

    debounceTimeout.value = setTimeout(() => {
      debounceValue.value = val;
      searchPlacesByTerm(val);
    }, 500);
  },
});
</script>

<template>
  <div class="absolute top-0 left-0 w-full md:w-[400px] px-4 z-50">
    <div class="relative py-4">
      <div class="w-full">
        <div
          class="
            flex
            absolute
            w-[50px]
            inset-y-0
            left-0
            items-center
            pl-3
            h-full
          "
        >
          <i class="ri-search-line"></i>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          id="voice-search"
          autocomplete="off"
          class="
            bg-gray-50
            text-sm
            rounded-lg
            block
            w-full
            outline-none
            pl-10
            p-2.5
          "
          placeholder="Buscar lugares"
          required
        />
      </div>
    </div>
    <search-results />
  </div>
</template>