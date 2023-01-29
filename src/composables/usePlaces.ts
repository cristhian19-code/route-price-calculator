import { computed, onMounted } from 'vue';
import { usePlacesStore } from '../store/places'

export const usePlaces = () => {
    const placesStore = usePlacesStore();

    onMounted(() => {
        if (!placesStore.isUserLocationReady) {
            placesStore.getInitialLocation();
        }
    })

    // actions
    const searchPlacesByTerm = (query: string) => placesStore.searchPlacesByTerm(query);

    // computed
    const userLocation = computed(() => placesStore.userLocation)
    const isLoading = computed(() => placesStore.isLoading);

    const places = computed(() => placesStore.places)
    const isLoadingPlaces = computed(() => placesStore.isLoadingPlaces)


    const isUserLocationReady = computed(() => placesStore.isUserLocationReady);
    const isPlacesReady = computed(() => placesStore.isPlacesReady);


    return {
        userLocation,
        isLoading,

        places,
        isLoadingPlaces,
        isPlacesReady,

        isUserLocationReady,

        searchPlacesByTerm
    }
}