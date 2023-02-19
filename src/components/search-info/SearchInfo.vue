<script setup lang="ts">
import { computed } from "vue";
import { useMap } from "../../composables/useMap";

const { distance, duration } = useMap();

const activeInfo = computed(() => {
  if (!distance.value || !duration.value) return false;

  return distance.value > 0 && duration.value > 0;
});

const priceRoute = computed(() => {
  if (!distance.value || !duration.value) return

  const per_distante = distance.value * 34;
  const per_duration = duration.value * 0.5;

  const result = per_distante + per_duration;

  return result.toFixed(2);
});
</script>

<template>
  <transition>
    <div v-if="activeInfo" class="absolute bottom-10 left-0 z-50 px-4">
      <div class="bg-white rounded-lg px-4 py-2 text-zinc-700">
        <div class="flex items-center gap-2">
          <i class="ri-guide-fill text-lg"></i>
          <p class="text-xs font-semibold">{{ distance }} km</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ri-time-fill text-lg"></i>
          <p class="text-xs font-semibold">{{ duration }} min</p>
        </div>

        <div class="flex items-center gap-2">
          <i class="ri-money-dollar-circle-fill"></i>
          <p class="text-xs font-semibold">{{ priceRoute }} PEN (estimado)</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 1;
}
</style>