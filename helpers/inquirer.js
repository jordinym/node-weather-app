require("colors");
const inquirer = require("inquirer");

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      { value: 1, name: `${"1.".green} Search city` },
      { value: 2, name: `${"2.".green} Historial` }, 
      { value: 0, name: `${"0.".green} Exit \n` },
  ]
  },
];
const inquirerMenu = async () => {
  console.clear();
  console.log("==============================".green);
  console.log(" Select an option ".green);
  console.log("==============================\n".green);

  const { option } = await inquirer.prompt(menuOptions);

  return option;
};
const pause = async () => {
  console.log("\n");

  return await inquirer.prompt([
    {
      type: "input",
      name: "enter_key",
      message: `\nPress ${"ENTER".green} to continue\n`,
    },
  ]);
};

const readInput = async (message) => {
  const { desc } = await inquirer.prompt([
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "please enter a value";
        }
        return true;
      },
    },
  ]);

  return desc;
};

const inquirerMenuCities = async (data = []) => {
  
  //SEGUNDA FORMA
  const choices = data.map((task, i) => {
    const index = `${i+1}.`.green;
    return { value:  task.description, name: `${index} ${task.description}` };
  });

  //AÑADIENDO UN VALOR EN LA POSICION CERO
  choices.unshift({value:null,name:`${'0.'.green} Cancelar`});

  const options = [
    {
      type: "list",
      name: "option",
      message: "Seleccione Lugar: ",
      choices,
    },
  ];

  const { option } = await inquirer.prompt(options);

  return option;
};
const confirmOpetionDelete = async () => {
  const options = [
    {
      type: "confirm",
      name: "option",
      message: "Are you sure?",
    },
  ];

  const { option } = await inquirer.prompt(options);

  return option;
};

const inquirerMenuHistorial = async (data = []) => {
  
  //SEGUNDA FORMA
  const choices = data.map((item, i) => {
    const index = `${i+1}.`.green;
    return { value: item, name: `${index} ${item}` };
  });
 
  const options = [
    {
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices,
    },
  ];

  const { option } = await inquirer.prompt(options);

  return option;
};
module.exports = {
  inquirerMenu,
  pause,
  readInput,
  inquirerMenuCities,
  confirmOpetionDelete,
  inquirerMenuHistorial
};
