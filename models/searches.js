const { readDB } = require("../helpers/saveFile");
const axios = require("axios");

//console.log(process.env);
class Searches {
  constructor() {
    this.historial = [];
    // TODO: leer DB si si existe
    const readData = readDB(); 
    if (readData) { 
      this.historial = [...readData]; 
    }
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }
  get paramsWeather() {
      return {
        'appid':process.env.OPEN_WEATHER_KEY, 
        'units': 'metric',
        'lang': 'es'
     };
  }
  get listHistories() {
    return this.historial.map(city=>{
      let words=city.split(' ');
      words=words.map(p=>p[0].toUpperCase()+p.substring(1)); 
      return words.join(' ');
    });
  }
  createHistorial(city = "") {
    if (!this.historial.includes(city.toLocaleLowerCase())) {
      this.historial.unshift(city.toLocaleLowerCase());
      // if (this.historial.length > 6) {
      //   delete this.historial[7];
      // }
      this.historial=this.historial.slice(0,5);

      saveDB(this.historial);
    }
  }

  async city(lugar = "") {
    try {
      //peticion https://
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const response = await instance.get();
      return response.data.features.map((city) => ({
        id: city.id,
        name: city.place_name,
        longitude: city.center[0],
        latitude: city.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async temperature(latitude = 0, longitude = 0) {
    try {
         //peticion https://
         const instance = axios.create({
             baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            //  params :{
            //     'appid':process.env.OPEN_WEATHER_KEY,
            //     'lat':latitude,
            //     'lon':longitude,
            //     'units': 'metric',
            //     'lang': 'es'
            //  }
            params: {
                    ...this.paramsWeather,
                    'lat':latitude,
                    'lon':longitude
                }
         });

         const response= await instance.get();
         const {weather,main}=response.data; 
         return {
                weather_desc: weather[0].description,
                temperature: main.temp,
                minimun: main.temp_min,
                maximum: main.temp_max
         };
    } catch (error) {return {};}
  }
}

module.exports = Searches;
