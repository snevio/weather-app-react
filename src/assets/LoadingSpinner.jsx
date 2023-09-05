import { delay, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Alert, AlertTitle, TextField, useFormControl, Button } from '@mui/material'

export default function LoadingSpinner(props) {

    const [isError, setIsError] = useState(false);
    useEffect(() => {

        setIsError(props.fetchResolved);
        console.log(isError)
    })

    return (
        <div className="w-full h-screen flex justify-center items-center">

            {isError ? <Alert variant="filled" severity="error">
                <AlertTitle>Try Again</AlertTitle>
                <strong>Couldn't find the requested location!</strong>
            </Alert>
                :

                <motion.div initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }} >
                    <img src="weather_icons/image_processing.gif" className="w-52 bg-slate-700"></img >
                </motion.div>
            }


        </div>
    )




}
