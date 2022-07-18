import inquirer from 'inquirer';
import colors from 'colors';


const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?\n\n',
        choices: [

            {
                value: 1,
                name: `${'1.'.green} Search cities`
            },
            {
                value: 2,
                name: `${'2.'.green} History`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit`
            }
        ]
    }
]

const inquirerMenu = async () => {

    console.clear();

    console.log('========================'.green);
    console.log(`==    Select a Menu   ==`.white);
    console.log('========================\n'.green);

    const { option } = await inquirer.prompt(menuOptions);

    return option;
}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`,
        }
    ]

    console.log('\n')
    await inquirer.prompt(question);
}

const readInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value';
                } else {
                    return true;
                }
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const deleteTaskList = async (tareas = []) => {

    const choices = tareas.map((task, i) => {

        const idx = `${i + 1}`.green;

        return {
            value: task.id,
            name: `${idx}. ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: '\nSelect a task to delete\n',
            choices: choices
        }
    ];

    const { id } = await inquirer.prompt(question);
    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const showCheckList = async (tareas = []) => {

    const choices = tareas.map((task, i) => {

        const idx = `${i + 1}`.green;

        return {
            value: task.id,
            name: `${idx}. ${task.desc}`,
            checked: (task.completedIn) ? true : false
        }
    });


    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices: choices
        }
    ];

    const { ids } = await inquirer.prompt(question);
    return ids;
}

export {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskList,
    confirm,
    showCheckList
}


