import { useState, useEffect, useDebugValue } from 'react'
import './App.css'
import TopWeather from './assets/TopWeather'
import HourlyForecast from './assets/HourlyForecast'
import SevenDaysForecast from './assets/SevenDaysForecast'
import { Alert, AlertTitle, TextField, useFormControl, Button } from '@mui/material'
import { SevenDaysForecastArray, fetchWeatherData } from './func/fetchWeatherData'
import { TopDataArray } from './func/fetchWeatherData'
import LoadingSpinner from './assets/LoadingSpinner'
import { delay, motion } from "framer-motion"
import { geolocationFetch, geoData } from './func/geolocation'
import LeftSearchBar from './assets/LeftSearchBar'



function App() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherRendered, setWeatherRendered] = useState(false);
  const [alerts, setAlert] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);




  //Get the API Result and it to the respective STATE variable, causing the re-rendering
  //of the App.jsx component. This will be called everytime we have an API call that updates the results appearing on the screen.
  //Can probably be refactored in something more efficent.

  async function fetchReRender(props) {
    setIsLoading(true)
    setFetchFailed(false)
    try {
      await fetchWeatherData(props).then((data) => {
        setWeather(data);
        setAlert(TopDataArray.alerts);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);


      })
    }
    catch {

      //console.log("Fetch Error.");
      setFetchFailed(true);
      alert("Couldn't find the requested location! If this is caused by the Geolocation Fetch, give the browser the permissions and try Again.")




    }

  }
  /****************************************************************************************************************** */

  //Use this function as a callback for the one above, used to get the value of the left-landmark-boxes and call the Api based on the value.

  function getLocationOnClick(event) {
    fetchReRender(event.currentTarget.innerHTML);
  }

  /*********************************************************************************************************************************** */

  //This one search for Berlin on page load. Used as a Placeholder for when the Page is loaded for the first time.

  useEffect(() => {

    fetchReRender("Berlin");
    setIsLoading(false);
    setWeatherRendered(true);


  }, [weatherRendered]);
  /******************************************************************************************************************************** */

  //Change the Search state and listen for the Enter Key.

  const handleChange = (event) => {
    if (event.key === 'Enter') {

      setSearch(...[event.target.value]);

    }
  }

  /******************************************************************************************************************************** */

  //Check if the InputBox is wether empty or not. If not proceed to call the location API based on the value.
  useEffect(() => {

    if (search !== "") {

      fetchReRender(search);

    } else {
      console.error("Blank");
    }

  }, [search]);

  /******************************************************************************************************************************** */

  //Geolocation based ApiCall

  async function handleGeoFetch() {

    geolocationFetch();
    // console.log(geoData)
    setTimeout(() => {
      fetchReRender(geoData);
    }, 1)


  }
  /******************************************************************************************************************************** */


  /**************************PRE RENDER DATA SECTION********************** */


  /**************************PRE RENDER DATA SECTION********************** */


  return (
    <>
      <div className="absolute  z-10 bg-white h-full w-full hidden" id="mobile-support">
        <div className="flex justify-center align-middle">
          <section>Sorry, not supported on Mobile Devices at the moment.</section>
        </div>
      </div>
      <div className='flex flex-wrap bg-gradient-to-r from-slate-500 to-slate-800 overflow-x-hidden h-screen'>
        <div className='flex items-center w-full bg-gradient-to-r from-slate-500 to-slate-800' id="general-wrapper">

          <LeftSearchBar
            refFunction={getLocationOnClick}
            inputBoxFunction={handleChange}
            geoBoxFunction={handleGeoFetch}
            address={TopDataArray.resolvedAddress}
            searchValue={search} />


          {isLoading ? <LoadingSpinner fetchResolved={fetchFailed} /> :

            <motion.div initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >


              <div className='flex justify-center'>
                {alerts?.map((props, index) => (

                  <section className='mr-5 mt-2' key={index}>

                    <Alert variant="filled" severity="warning">
                      <AlertTitle>Weather Alert !</AlertTitle>
                      <strong>{props.event}</strong>
                    </Alert>
                  </section>
                ))}
              </div>



              <div className=''>
                <div className='w-full h-full flex flex-col mt-10 ml-20' id="middle-wrapper">
                  <TopWeather
                    address={TopDataArray.resolvedAddress}
                    timezone={TopDataArray.timezone}
                    datetime={TopDataArray.datetime}
                    actualTemp={TopDataArray.actualTemp}
                    minTemp={TopDataArray.minTemp}
                    conditions={TopDataArray.conditions}
                    rainprobs={TopDataArray.rainprobs}
                    humidity={TopDataArray.humidity}
                    windspeed={TopDataArray.windspeed}
                    uvindex={TopDataArray.uvindex} />
                  <HourlyForecast />
                  <SevenDaysForecast />
                </div>
              </div>



            </motion.div>

          }


        </div >
      </div >

    </>

  )
}

export default App

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                      REFACTOR THE  TOPWEATHER COMPONENT           !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
