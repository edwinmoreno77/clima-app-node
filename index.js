import 'dotenv/config';

import colors from 'colors';
import { inquirerMenu, pause, readInput } from './helpers/inquirer.js';
import { Searches } from './models/searches.js';

console.clear();

const main = async () => {

    const searches = new Searches();

    let option;

    do {
        option = await inquirerMenu();

        switch (option) {
            case 1:
                let place = await readInput(' city: ');
                let cities = await searches.city(place);

                console.log(' \ninformation about city:\n'.green);
                console.log(' City: ', place);
                console.log('\n');
                console.log(' latitude: ');
                console.log(' longitude: ');
                console.log(' temperature: ');
                console.log(' min temp: ');
                console.log(' max temp: ');




                break;
            case 2:
                console.log('History');
                break;
            case 0:
                console.log('Bye');
                break;
        }

        await pause();

    } while (option !== 0);




}

main();