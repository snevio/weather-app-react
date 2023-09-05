import { baseApi, apiKey } from '../api/api';
import axios from 'axios';

import { geoUserAddress } from './geolocation';


export let TopDataArray = {
    resolvedAddress: "",
    timezone: "",
    datetime: "",
    conditions: "",
    actualTemp: "",
    maxTemp: "",
    minTemp: "",
    humidity: "",
    rainprobs: "",
    windspeed: "",
    alerts: ""
}

/******************************************************************* */
export let SevenDaysForecastArray = [];

/******************************************************************* */

export let HourlyForecastArray = [];

export let weatherData2 = [];

/******************************************************************* */

export async function fetchWeatherData(city) {


    const response = await axios.get(`${import.meta.env.VITE_BASE_WEATHER_API}/${city}?key=${import.meta.env.VITE_BASE_API_KEY}`)
    const weatherData = response.data;

    TopDataArray.timezone = weatherData.timezone;
    TopDataArray.datetime = weatherData.currentConditions.datetime;
    TopDataArray.conditions = weatherData.currentConditions.icon;
    TopDataArray.actualTemp = weatherData.days[0].temp;
    TopDataArray.maxTemp = weatherData.days[0].tempmax;
    TopDataArray.minTemp = weatherData.days[0].tempmin;
    TopDataArray.humidity = weatherData.currentConditions.humidity;
    TopDataArray.rainprobs = weatherData.days[0].precipprob;
    TopDataArray.windspeed = weatherData.currentConditions.windspeed;
    TopDataArray.alerts = weatherData.alerts;
    TopDataArray.uvindex = weatherData.currentConditions.uvindex;
    // TopDataArray.resolvedAddress = weatherData.resolvedAddress;

    if (weatherData.resolvedAddress.includes("1")) {
        TopDataArray.resolvedAddress = geoUserAddress;
    }
    else {
        TopDataArray.resolvedAddress = weatherData.resolvedAddress;
    }


    weatherData2 = weatherData;


    /*GET THE VALUE FOR THE NEXT SEVEN DAYS(API RETURNS 0 AS TODAY AND I DONT NEED IT)*/

    SevenDaysForecastArray = [];

    for (let i = 0; i < 7; i++) {
        SevenDaysForecastArray.push(weatherData.days[i]);

    }


    //console.log(TopDataArray);
    // console.log(SevenDaysForecastArray);
    //console.log(HourlyForecastArray);
    console.log(weatherData);
    //console.log(weatherData2)

    hourFunction(0)
    return SevenDaysForecastArray, HourlyForecastArray
}


export async function hourFunction(dayIndex) {

    HourlyForecastArray = [];
    for (let y = 0; y < 23; y += 3) {
        HourlyForecastArray.push(weatherData2.days[dayIndex].hours[y]);

    }

}

