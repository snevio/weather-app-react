import { ParaglidingSharp } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useFormControl } from '@mui/material/FormControl';
import { useEffect, useState } from "react"
import './css/LeftSearchBar.css'


/**<TextField id="standard-basic" label="Search for location..." variant="standard" onKeyDown={fetchFunctions.inputBoxFunction} /> */

export default function LeftSearchBar(fetchFunctions) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        setSearch(fetchFunctions.searchValue)
    }, [fetchFunctions.searchValue])




    const locationsArray = [
        "Rome",
        "Tokyo",
        "Kyoto",
        "Nigeria",
        "Paris",
        "New York"
    ]
    return (
        <>

            <div className=" bg-slate-700 rounded-lg min-w-max ml-4 h-2/3 border-2" id="search-box-wrapper">

                <div className="mb-3 mt-3 flex justify-center items-center bg-white rounded-sm">
                    <input placeholder="Search Location..." className="w-full h-10" onKeyDown={fetchFunctions.inputBoxFunction}></input>

                </div>

                <Button variant="contained" className="w-full" onClick={fetchFunctions.geoBoxFunction}>Geolocation Fetch</Button>

                <div className="flex flex-col items-center bg-white rounded-lg">
                </div>
                <div className="flex justify-center">
                    <section className="mb-5 mt-5 text-white">Landmarks</section>
                </div>
                {locationsArray.map((locationProp, index) => (
                    <ul key={index}>
                        <li onClick={fetchFunctions.refFunction} className="mb-4 text-xl cursor-pointer underline italic text-white">- {locationProp}</li>
                    </ul>
                ))}
                <section className="text-xl text-white"><strong>Last searched Place: </strong></section>
                <section className="text-white">{search}</section>
            </div>
        </>
    )
}