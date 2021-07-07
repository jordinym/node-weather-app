require("colors");
const inquirer = require("inquirer");

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hace?",
    choices: [
      { value: "1", name: `${"1.".green} Create task` },
      { value: "2", name: `${"2.".green} List task` },
      { value: "3", name: `${"3.".green} List completed task` },
      { value: "4", name: `${"4.".green} List pending task` },
      { value: "5", name: `${"5.".green} Complete task` },
      { value: "6", name: `${"6.".green} Delete task` },
      { value: "0", name: `${"0.".green} Exit \n` },
    ],
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

const inquirerMenuDelete = async (data = []) => {
  /*
  //PRIMERA FORMA
  let choices = [];
  
  data.forEach((item, i) => {
    let index = `${i}.`.green;
    choices.push({ value: item.id, name: `${index} ${item.description}` });
  }); */

  //SEGUNDA FORMA
  const choices = data.map((task, i) => {
    const index = `${i}.`.green;
    return { value: task.id, name: `${index} ${task.description}` };
  });

  //AÑADIENDO UN VALOR EN LA POSICION CERO
  choices.unshift({value:null,name:`${'0.'.green} Cancelar`});

  const options = [
    {
      type: "list",
      name: "option",
      message: "Borrar",
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

const inquirerMenuComplete = async (data = []) => {

  const choices = data.map((task, i) => {
    const index = `${i+1}.`.green;
    return { 
      value: task.id, 
      name: `${index} ${task.description}` , 
      checked: (task.completedEn) ? true : false };
  }); 
  
  const options = [
    {
      type: "checkbox",
      name: "option",
      message: "select one or more options",
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
  inquirerMenuDelete,
  confirmOpetionDelete,
  inquirerMenuComplete
};
