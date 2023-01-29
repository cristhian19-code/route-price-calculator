import Mapboxgl from 'mapbox-gl';
import { defineStore } from 'pinia'

import { Feature } from '../interfaces/places';

import directionApi from '../api/directionApi'
import { DirectionResponse } from './../interfaces/direction';

export interface MapState {
    map?: Mapboxgl.Map;
    markers: Mapboxgl.Marker[];
    distance?: number;
    duration?: number;
}

export type LngLat = [number, number]

export const usePlacesStore = defineStore('map', {
    state: (): MapState => ({
        map: undefined,
        markers: [],
        distance: undefined,
        duration: undefined,
    }),
    actions: {
        async getRouterBetweenPoints(start: LngLat, end: LngLat) {
            const { data } = await directionApi.get<DirectionResponse>(`${start.join(',')};${end.join(',')}`)

            const routes = data.routes[0];

            const coords: number[][] = routes.geometry.coordinates;

            this.setRoutePolyline(coords);

            this.setInfoRoute(routes.distance, routes.duration)
        },
        setInfoRoute(distante: number, duration: number) {
            let kms = (distante / 10000);
            kms = Math.round(kms * 100);
            kms /= 100;

            this.distance = kms;
            this.duration = Math.floor(duration / 60);
        },
        setMap(map: Mapboxgl.Map) {
            this.map = map;
        },
        setPlaceMarkers(places: Feature[]) {

            this.markers.forEach(marker => marker.remove());

            this.markers = []

            if (!this.map) return

            for (const place of places) {
                const [lng, lat] = place.center;

                const poppup = new Mapboxgl.Popup().setLngLat([lng, lat])
                    .setHTML(`
                        <p class="text-black">${place.place_name_es}</p>
                    `);

                // Agregando markadores de la busqueda
                const marker = new Mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .setPopup(poppup)
                    .addTo(this.map);

                this.markers.push(marker);


            }

            // Limpieza de polyline
            if (this.map.getLayer('RouteString')) {
                this.map.removeLayer('RouteString');
                this.map.removeSource('RouteString');
                this.distance = undefined;
                this.duration = undefined;
            }
        },
        setRoutePolyline(coords: number[][]) {
            const start = coords[0];
            const end = coords[coords.length - 1];

            // todo: definir los bounds
            const bounds = new Mapboxgl.LngLatBounds(
                [start[0], start[1]],
                [end[0], end[1]]
            )

            // Agredando cada punto a los bordes de la ruta
            for (const coord of coords) {
                const newCoord: [number, number] = [coord[0], coord[1]];

                bounds.extend(newCoord);
            }

            this.map?.fitBounds(bounds, {
                padding: 300
            });

            // Configuracion polyline
            const sourceData: Mapboxgl.AnySourceData = {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: coords
                            }
                        }
                    ]
                }
            }
            if (this.map?.getLayer('RouteString')) {
                this.map.removeLayer('RouteString');
                this.map.removeSource('RouteString');
            }

            this.map?.addSource('RouteString', sourceData)

            this.map?.addLayer({
                id: 'RouteString',
                type: 'line',
                source: 'RouteString',
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                paint: {
                    'line-color': 'white',
                    "line-width": 4
                }
            })

        }
    },
    getters: {
        isMapReady(state) {
            return !!state.map;
        }
    }
})