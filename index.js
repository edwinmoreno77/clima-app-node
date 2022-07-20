import 'dotenv/config';

import colors from 'colors';
import { inquirerMenu, listPlaces, pause, readInput } from './helpers/inquirer.js';
import { Searches } from './models/searches.js';

console.clear();

const main = async () => {

    const searches = new Searches();

    let option;

    do {
        option = await inquirerMenu();

        switch (option) {
            case 1:
                // Search cities
                let place = await readInput(' city: ');
                let cities = await searches.city(place);

                //select a city
                console.clear();
                const id = await listPlaces(cities);
                const selectedCity = cities.find(city => city.id === id);
                if (selectedCity) {

                    const weather = await searches.cityWeather(selectedCity.lat, selectedCity.lon);

                    searches.addHistory(selectedCity.name);
                    //show result
                    console.clear();
                    console.log(' \ninformation about city:\n'.green);
                    console.log(' City: ', `${selectedCity.name}`.green);
                    console.log('\n');
                    console.log(' description: ', `${weather.desc}`.green);
                    console.log(' temperature: ', weather.temp);
                    console.log(' min temp:    ', weather.min);
                    console.log(' max temp:    ', weather.max);
                    console.log(' latitude:    ', selectedCity.lat);
                    console.log(' longitude:   ', selectedCity.lon);
                }


                break;
            case 2:
                searches.getHistory().forEach((city, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx}. ${city}`);
                });

                break;
            case 0:
                console.log('Bye');
                break;
        }

        await pause();

    } while (option !== 0);




}

main();