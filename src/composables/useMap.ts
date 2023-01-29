import { computed } from 'vue';
import Mapboxgl from 'mapbox-gl';

import { LngLat, usePlacesStore } from '../store/map'

import { Feature } from '../interfaces/places';

export const useMap = () => {
    const mapStore = usePlacesStore()

    // actions
    const setMap = (e: Mapboxgl.Map) => mapStore.setMap(e)
    const setPlaceMarkers = (e: Feature[]) => mapStore.setPlaceMarkers(e)
    const getRouterBetweenPoints = (start: LngLat, end: LngLat) => mapStore.getRouterBetweenPoints(start, end)

    // State
    const map = computed(() => mapStore.map)
    const distance = computed(() => mapStore.distance)
    const duration = computed(() => mapStore.duration)

    // getters
    const isMapReady = computed(() => mapStore.isMapReady);


    return {
        // computed
        map,
        distance,
        duration,

        isMapReady,

        // actions
        setMap,
        setPlaceMarkers,
        getRouterBetweenPoints,
    }
}