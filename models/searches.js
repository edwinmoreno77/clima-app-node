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

    async city(place = '') {


        try {

            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });

            const response = await intance.get();

            console.log(response.data);

            return data;

        } catch (error) {

            return [];
        }

    }


}

export {
    Searches
} 