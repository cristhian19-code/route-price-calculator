import { defineStore } from 'pinia'
import searchApi from '../api/searchApi';
import { PlacesResponse, Feature } from './../interfaces/places';

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number]; // [long , lat]

    isLoadingPlaces: boolean;
    places: Feature[];
}

export const usePlacesStore = defineStore('places', {
    state: (): PlacesState => ({
        isLoading: false,
        userLocation: undefined,

        isLoadingPlaces: false,
        places: []
    }),
    actions: {
        getInitialLocation() {
            //todo: colocar loading
            this.isLoading = true;
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { longitude, latitude } = coords;

                    this.userLocation = [longitude, latitude];

                    this.isLoading = false;
                },
                (err) => {
                    console.error(err)

                    throw new Error("No geolocation");
                }
            );
        },
        async searchPlacesByTerm(query: string): Promise<Feature[]> {
            console.log();
            if (query.length === 0) {
                this.places = [];
                return []
            };

            if (!this.userLocation) {
                throw new Error("No hay ubicacion del usuario");
            }

            this.isLoadingPlaces = true;

            const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`, {
                params: {
                    proximity: this.userLocation?.join(','),
                }
            })

            const features = data.features

            this.places = features;
            this.isLoadingPlaces = false;

            return features;
        }
    },
    getters: {
        isUserLocationReady(state) {
            return !!state.userLocation;
        },
        isPlacesReady(state) {
            return state.places.length > 0
        }
    }
})