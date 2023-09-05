import React, { useEffect } from 'react'
import { HourlyForecastArray, SevenDaysForecastArray, fetchWeatherData, weatherData2 } from '../func/fetchWeatherData'
import HourlyForecast from './HourlyForecast';
import './css/SevenDaysForecast.css'



export default function SevenDaysForecast() {


    /****************************************** */
    //Creating two array in order to store the newDate value and transform it into a Week day. 

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];


    let arrangedArray = [];

    function arrangeArray() {
        var e = new Date().getDay();
        var s = 0;
        for (let i = 0; arrangedArray.length < 7; i++) {

            if (e < 6) {
                arrangedArray.push(e + s)
                e++
            }

            else {
                e = 0;
                arrangedArray.push(e + s)
                s++
            }
        }

    }
    arrangeArray();

    /****************************************** *//****************************************** *//****************************************** */


    function getBox(event) {
        var thisCard = event?.target.getAttribute("datatype");
        HourlyForecast(thisCard)
    }








    function WeatherIcon(weatherIcon) {
        if (weatherIcon.icon === "cloudy") {

            return (
                <img src="weather_icons/cloud.png" className='w-16'></img>
            )
        }

        else if (weatherIcon.icon === "rain") {
            return (
                <img src="weather_icons/heavy-rain.png" className='w-16'></img>
            )
        }

        else if (weatherIcon.icon === "partly-cloudy-night") {
            return (
                <img src="weather_icons/cloudy-night.png" className='w-16'></img>
            )
        }

        else if (weatherIcon.icon === "partly-cloudy-day") {
            return (
                <img src="weather_icons/cloudy_sun.png" className='w-16'></img>
            )
        }

        else if (weatherIcon.icon === "clear-day") {
            return (
                <img src="weather_icons/sun.png" className='w-16'></img>
            )
        }
        else if (weatherIcon.icon === "snow") {
            return (
                <img src="weather_icons/snow.png" className='w-16'></img>
            )
        }
        else if (weatherIcon.icon === "fog") {
            return (
                <img src="weather_icons/fog.png" className='w-16'></img>
            )
        }



    }

    return (
        <>
            <div className='min-w-0'>
                <div className=' relative flex flex-row justify-center w-2/3 h-56 bg-slate-700 rounded-2xl  mt-1 shadow-2xl border-2' id="weeks-div">
                    {SevenDaysForecastArray.map((props, index) =>
                    (
                        <div key={index} className='min-w-0'>

                            <div className='flex flex-col justify-center items-center h-full hover:bg-slate-600 transition-all mr-4 w-24' id="week-tab" datatype={index} key={index} onClick={getBox}>
                                <div className='mr-4 mb-4 ml-3' datatype={index} id='week-item'>
                                    <strong className=''>{days[arrangedArray[index]]}</strong>
                                </div>

                                <WeatherIcon icon={props.icon} />

                                <div className='flex'>
                                    <section className='mt-4 mr-4' datatype={index} id="week-hours">
                                        <strong>{Math.round((props.tempmax - 32) * 5 / 9)}°</strong>
                                    </section>
                                    <section className='mt-4 text-gray-500' datatype={index}><strong>{Math.round((props.tempmin - 32) * 5 / 9)}°</strong></section>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div >





        </>
    )
}
