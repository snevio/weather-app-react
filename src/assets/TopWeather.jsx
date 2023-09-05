import { useState } from "react"
import { TopDataArray } from "../func/fetchWeatherData"
import { useEffect } from "react"
import './css/TopWeather.css'
import { BackHand } from "@mui/icons-material"






export default function TopWeather(data) {
    const [bg, setBg] = useState();
    let backGroundValue = data.conditions;


    useEffect(() => {
        setBg(backGroundValue);
    }, [backGroundValue]);

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    function TopWeatherIcon(weatherIcon) {

        const weatherState = weatherIcon.icon;


        switch (weatherState) {
            case 'partly-cloudy-day':
                backGroundValue = 'rgb(43,97,126)'
                return (
                    <img src="weather_icons/svg_icons/partly-cloudy-day.svg" className="scale-100" id="top-weather-image"></img>
                )

            case 'partly-cloudy-night':
                backGroundValue = 'rgb(43,97,126)'
                return (
                    <img src="weather_icons/svg_icons/overcast-night.svg" className="scale-100" id="top-weather-image"></img>
                )

            case 'cloudy':
                backGroundValue = 'rgb(43,97,126)'
                return (
                    <img src="weather_icons/svg_icons/cloudy.svg" className="scale-100" id="top-weather-image"></img>
                )

            case 'clear-day':
                backGroundValue = 'rgb(60,152,207)'
                return (
                    <img src="weather_icons/svg_icons/clear-day.svg" className="scale-100" id="top-weather-image"></img>

                )

            case 'clear-night':
                backGroundValue = 'rgb(60,152,207)'
                return (
                    <img src="weather_icons/svg_icons/clear-night.svg" className="scale-100" id="top-weather-image"></img>
                )

            case 'rain':
                backGroundValue = 'rgb(32,43,45)'
                return (
                    <img src="weather_icons/svg_icons/rain.svg" className="scale-100" id="top-weather-image"></img>
                )

            case 'snow':
                backGroundValue = 'rgb(43,97,126)'
                return (
                    <img src="weather_icons/svg_icons/snow.svg" className="scale-100" id="top-weather-image"></img>
                )


        }
    }

    return (
        <>
            <div className='grid grid-cols-3 mb-3 gap-4 w-2/3 min-h-56 mt-5 rounded-2xl text-2xl text-white font-base' id="weather-box">
                <div className="flex justify-between col-span-2 max-w  rounded-2xl px-5 pt-5  border-2 shadow-2xl overflow-hidden" style={{ backgroundColor: bg }} id="top-left-part">
                    <div className="">

                        <div className="text-4xl">{data.address}</div>
                        <div className="text-6xl mt-4 flex min-w-max">

                            <div><strong>{Math.round((data?.actualTemp - 32) * 5 / 9)}°C /</strong></div>
                            <div className="ml-4 text-4xl">{Math.round((data?.minTemp - 32) * 5 / 9)}°C</div>
                        </div>
                        <div className="mt-4">{data.timezone}</div>
                    </div>
                    <div className="-mt-10">
                        <div className="w-40">
                            <TopWeatherIcon icon={data.conditions} />
                        </div>

                        <section className="ml-7 mt-2">{days[new Date().getDay()]}</section>
                        <section className="ml-7">{data.datetime.split(":").slice(0, 2).join(":")}</section>
                    </div>

                </div>
                <div className="flex" id="top-right-wrapper">

                    <div className="text-xl font-base flex col-span-2 rounded-2xl bg-white text-black p-3 border-2 border-black" id="top-right-content">
                        <div className="grid grid-rows-2" id="first-row">
                            <div className="flex flex-row gap-24">
                                <div>
                                    <div className="flex">
                                        <img src="weather_icons/small-icons/precipitation.png" className="w-7 h-7 mr-2"></img>
                                        <div>Precipitation</div>
                                    </div>
                                    <strong>{data.rainprobs} %</strong>
                                </div>

                                <div>
                                    <div className="flex">
                                        <img src="weather_icons/small-icons/wind.png" className="w-6 h-6 mr-2"></img>
                                        <div>Wind</div>
                                    </div>
                                    <strong>{data.windspeed}KM/h</strong>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between">
                                <div className="">
                                    <div className="flex">
                                        <img src="weather_icons/small-icons/humidity.png" className="w-7 h-7 mr-2" alt="" />
                                        <div>Humidity</div>
                                    </div>
                                    <strong> {data.humidity}%</strong>
                                </div>

                                <div>
                                    <div className="flex">

                                        <img src="weather_icons/small-icons/uv-index.png" className="w-7 h-7 mr-2"></img>
                                        <div>UV</div>
                                    </div>
                                    <strong> {data.uvindex} out 10</strong>
                                </div>
                            </div>





                        </div>
                    </div>

                </div >

            </div >

        </>



    )
}
