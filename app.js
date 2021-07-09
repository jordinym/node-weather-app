const { readInput, pause, inquirerMenu, inquirerMenuCities, inquirerMenuHistorial } = require("./helpers/inquirer");
const { saveDB } = require("./helpers/saveFile");
const Searches = require("./models/searches");
require("colors");

const main=async()=>{
    const searches=new Searches();
    while (true) {
        const opt=await inquirerMenu("hello");  

        switch (opt) {
            case 1:
                const city= await readInput('Enter search city:');
                const cities=await searches.city(city);
                const citySelect=await inquirerMenuCities(cities);
                if(citySelect){
                    const createHistorial=await searches.createHistorial(citySelect);
                    console.log('\nInformation of the city\n'.green);
                    console.log('City: ',);
                    console.log('Latitude: ',);
                    console.log('Longitude: ',);
                    console.log('Temperature: ',);
                    console.log('Minimum: ',);
                    console.log('Maximum: ',);
                } 
                break;
            case 2:
                  await inquirerMenuHistorial(searches.listHistories);
                break;
            default:
                break;
        }

        saveDB(searches.listHistories);
        if(opt!==0) await pause(); else break;
    }  
}
main();