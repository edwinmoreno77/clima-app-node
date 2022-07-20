import fs from 'fs';
import axios from 'axios';



class Searches {

    history = [];

    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    getHistory() {
        //other way to get history

        // let words = this.history.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        // return words;

        return this.history.map(city => {

            let words = city.split(' ');
            words = words.map(p => p[0].toUpperCase() + p.substring(1));

            return words.join(' ');
        })

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

    addHistory(city) {

        if (this.history.includes(city.toLocaleLowerCase())) {
            return;
        }

        this.history = this.history.splice(0, 5);

        this.history.unshift(city.toLocaleLowerCase());

        this.saveDB();
    }

    saveDB() {

        const payLoad = {
            history: this.history
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payLoad));

    }

    readDB() {

        if (!fs.existsSync(this.dbPath)) {
            return null;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.history = data.history;

        return this.history;

    }

}

export {
    Searches
} 