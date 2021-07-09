const { readDB } = require("../helpers/saveFile");
const axios=require("axios");

class Searches{
    
    constructor(){
        this.historial=['peru','lima','callao'];
        // TODO: leer DB si si existe
        const readData= readDB();
        if(readData){
            this.historial=[...readData];
        }
    }

    get paramsMatbox(){
        return{
            'access_token': 'pk.eyJ1Ijoiam9yZGlueW0iLCJhIjoiY2txdzJtaG1sMDg5cTJvbnZ1bGR2eTJubyJ9.zLa70P3BB_l147PCsFM8gg',
            'limit':5,
            'language':'es'
        };
    }
    get listHistories(){
        return this.historial;
    }
    createHistorial(city=''){
        if(!this.historial.includes(city)){
            this.historial.push(city);
            if(this.historial.length>6){
                delete this.historial[7];
            }
        }
    }

    async city(lugar=''){
        //peticion https://
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMatbox
        });
        const response = await instance.get();
        console.log(response.data);

        return[{id:1,description:"Lima"},{id:2,description:"Lima xd"},{id:3,description:"Lima xddd"}];
    }
}

module.exports = Searches;