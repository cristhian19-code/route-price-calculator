import axios from 'axios'

const directionApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: 'false',
        access_token: 'pk.eyJ1IjoiY2hyaXN0aWFuOTktY29kZSIsImEiOiJjazg0dTYzMmEwMDFxM21vaXNqcHFqaXkxIn0.lBoSGK2YhEO37zUmbgxnhQ',
    }
})

export default directionApi;