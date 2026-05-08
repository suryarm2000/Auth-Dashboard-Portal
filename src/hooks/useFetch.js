import { useEffect, useState } from "react";

function useFetch(url){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try{
                setLoading(true);
                setError(null);
                
                const res = await fetch(url);
                if(!res.ok){
                    throw new Error("Fetching data failed");
                }
                const json = await res.json();
                setData(json);
            } catch(err){
                setError(err.message);
            } finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [url])

    return {data, loading, error};
}

export default useFetch;