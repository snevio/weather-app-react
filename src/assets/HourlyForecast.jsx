import React, { useEffect, useState } from 'react'
import { HourlyForecastArray } from '../func/fetchWeatherData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';
import { Output } from '@mui/icons-material';
import './css/HourlyForecast.css'



export default function HourlyForecast(props) {



    function OutputArray() {
        {

            return (
                HourlyForecastArray.map((props, index) =>
                (
                    <div key={index} className='min-w-0' id="hour-wrapper">
                        <div className='flex flex-col justify-center items-center mr-4 bg-slate-500 rounded-2xl h-3/4 min-w-fit' id="hour-content">
                            {index < 5 ?
                                <><div className='flex justify-center' id="hour-number-section"><strong>{props.datetime.split(":").slice(0, 2).join(":")}</strong></div><div><strong>AM</strong></div></> :
                                <><div className='flex justify-center' id="hour-number-section"><strong>{props.datetime.split(":").slice(0, 2).join(":")}</strong></div><div><strong>PM</strong></div></>
                            }

                            <div className='mt-4 mb-4' id="hour-icon-section"><HourlyWeatherIcon icon={props.icon} /></div>
                            <div id="hour-temp"><strong>{Math.round((props.temp - 32) * 5 / 9)}°C</strong></div>
                        </div>

                    </div>

                ))
            )
        }
    }


    const graphDataObject = [{}]

    for (let i = 0; i < HourlyForecastArray.length; i++) {

        graphDataObject.push({
            name: HourlyForecastArray[i].datetime.split(":").slice(0, 2).join(":"),
            Temperature: Math.round((HourlyForecastArray[i].temp - 32) * 5 / 9) + "",
            maxAxis: 50
        },

        )




    }



    function HourlyWeatherIcon(weatherIcon) {
        const weatherState = weatherIcon.icon;


        switch (weatherState) {
            case 'partly-cloudy-day':

                return (
                    <img src="public/weather_icons/cloudy_sun.png" className="scale-100" id="top-weather-image"></img>
                )

            case 'partly-cloudy-night':

                return (
                    <img src="public/weather_icons/cloudy-night.png" className="scale-100" id="top-weather-image"></img>
                )

            case 'cloudy':

                return (
                    <img src="public/weather_icons/cloud.png" className="scale-100" id="top-weather-image"></img>
                )

            case 'clear-day':

                return (
                    <img src="public/weather_icons/sun.png" className="scale-100" id="top-weather-image"></img>

                )

            case 'clear-night':

                return (
                    <img src="public/weather_icons/clear-night.png" className="scale-100" id="top-weather-image"></img>
                )

            case 'rain':
                return (
                    <img src="public/weather_icons/heavy-rain.png" className="scale-100" id="top-weather-image"></img>
                )

            case 'snow':

                return (
                    <img src="public/weather_icons/snowy.png" className="scale-100" id="top-weather-image"></img>
                )


        }

    }
    return (
        <div className='grid grid-cols-3 gap-4 justify-center w-2/3 h-56 mt-5 mb-4' id="middle-part-section" >

            <div className='relative flex justify-center items-center col-span-2 bg-slate-700 rounded-2xl border-2 shadow-2xl' id="hour-section">
                <OutputArray />
            </div>



            <div className='col-span-1 bg-slate-700 h-full w-tempGraphWidth rounded-2xl border-2 shadow-2xl' id="graph-section" >


                <ResponsiveContainer width="100%">
                    <AreaChart data={graphDataObject}
                        margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" interval={0} dx={-20} />
                        <YAxis dataKey="maxAxis" />
                        <Tooltip />
                        <Area type="monotone" dataKey="Temperature" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div >
    )
}
