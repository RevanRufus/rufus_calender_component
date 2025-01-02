import { useEffect, useState } from "react";


export const useFetch = (apiurl) => {

    const [getdata, setData] = useState([])
    const [getloading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        const datarequest = async () => {
            setLoading(true)
            try {
                let apiresponse = await fetch(apiurl)
                let apijson = await apiresponse.json()
                setData(apijson)
            }
            catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        datarequest()
    }, [apiurl])

    return { getdata, getloading, error }

}