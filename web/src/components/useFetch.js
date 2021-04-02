import { useState, useEffect } from 'react'

//add a cache
const makeFetch = (request) => (url) => {
    const [status, setStatus] = useState('idle')
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setStatus('fetching')
            const res = await request(url)
            const data = await res.json()
            setData(data)
            setStatus('fetched')
            console.log('fetched')
        }

        fetchData()
    }, [url])

    return { status, data }
}

export default makeFetch
