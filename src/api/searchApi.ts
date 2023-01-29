import axios from 'axios'

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiY2hyaXN0aWFuOTktY29kZSIsImEiOiJjazg0dTYzMmEwMDFxM21vaXNqcHFqaXkxIn0.lBoSGK2YhEO37zUmbgxnhQ',
    }
})

export default searchApi;