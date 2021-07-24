import {useEffect, useState} from "react";

function useFetchJSON(url:string ) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchJSON() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchJSON();
    }, []);

    return [data, loading];
}

export { useFetchJSON }