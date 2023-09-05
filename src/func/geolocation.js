import { baseApi, apiKey, basegeo, revgeokey } from '../api/api';
import axios from 'axios';
import { fetchWeatherData } from './fetchWeatherData';


export let geoData = [];
export let geoUserAddress;

export async function geolocationFetch() {


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    else {
        console.log("Unhandled")
    }
}

async function getPosition(position) {
    geoData = [position.coords.latitude, position.coords.longitude]


    getReverseData(position.coords.latitude, position.coords.longitude);
    console.log(geoData)


    return geoData;

}

async function getReverseData(lat, lon) {

    const reverseGeocoding = await axios.get(`${basegeo}key=${revgeokey}&lat=${lat}&lon=${lon}&accept-language=<it>&format=json`);
    const resolvedReverseData = reverseGeocoding.data;
    geoUserAddress = resolvedReverseData.address.state;

    console.log(resolvedReverseData);


}



