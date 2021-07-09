require("colors");
require("dotenv").config();

const { readInput, pause, inquirerMenu, inquirerMenuCities, inquirerMenuHistorial } = require("./helpers/inquirer");
const { saveDB } = require("./helpers/saveFile");
const Searches = require("./models/searches");


const main=async()=>{

    const searches=new Searches();
    while (true) {
        const opt=await inquirerMenu(); 
        switch (opt) {
            case 1:
                const city= await readInput('Enter search city:');
                const cities=await searches.city(city);
                const cityId=await inquirerMenuCities(cities);
                
                if(cityId){
                    const citySelect=cities.find(c=>c.id===cityId);
                    const createHistorial=await searches.createHistorial(citySelect.name);
                    const temperature=await searches.temperature(citySelect.latitude,citySelect.longitude);
                    console.log('\nInformation of the city\n'.green);
                    console.log('City: ',citySelect.name);
                    console.log('Latitude: ',citySelect.latitude);
                    console.log('Longitude: ',citySelect.longitude);
                    console.log('Temperature: ',temperature.temperature );
                    console.log('Minimum: ', temperature.minimun);
                    console.log('Maximum: ',temperature.maximum);
                    console.log('what is the weather: ',temperature.weather_desc );
                } 
                break;
            case 2:
                 
                if(searches.listHistories.length>0) await inquirerMenuHistorial(searches.listHistories);
                break;
            default:
                break;
        }

        
        if(opt!==0) await pause(); else break;
    }  
}
main();