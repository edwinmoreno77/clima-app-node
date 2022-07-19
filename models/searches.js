import axios from 'axios';


class Searches {

    history = ['Caracas', 'Antofagasta', 'Margarita', 'Ciudad Bolivar', 'Cabimas'];

    constructor() {
        // read db if exists
    }

    get paramsMapBox() {

        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {

        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }

    async city(place = '') {

        try {

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });

            const response = await intance.get();
            return response.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lat: place.center[0],
                lon: place.center[1]
            }));

        } catch (error) {

            return [];
        }

    }

    async cityWeather(lat, lon) {

        try {
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon
                }
            });

            const response = await intance.get();
            const { weather, main } = response.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {

            return [];
        }

    }

}

export {
    Searches
} 