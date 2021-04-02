import React, { useEffect, useState } from 'react'

import { H3HexagonLayer } from '@deck.gl/geo-layers'

import bart from '/public/suitability/bartLayer'
import crime from '/public/suitability/crimeLayer'
import schools from '/public/suitability/schoolsLayer'
import travelTime from '/public/suitability/travelTimeLayer'

let layers = [bart, crime, schools, travelTime].map((d) =>
    Object.entries(d).map((d) => d[1])
)

const h3Layer = (data, weights) => {
    let x = 0
    let weightValues = Object.values(weights)

    function fuck(i) {
        x++
        let sum = 0
        layers.forEach(
            (layer, i) => (sum += weightValues[i] * layer[x % layer.length])
        )
        let result = sum / layers.length

        return result * 5
    }

    return new H3HexagonLayer({
        id: 'h3-hexagon-layer' + Math.random(),
        data,
        stroked: true,
        filled: true,
        extruded: false,
        getHexagon: (d) => d.hex9,
        getFillColor: (d, i) => [50, 1, fuck(i) * 255],
        getLineColor: 0,
    })
}

let features = ['Crimes', 'Schools', 'Travel Times', 'Cafes']
let buildWeights = () => {
    return features.reduce((acc, item) => {
        acc[item] = 1
        return acc
    }, {})
}

const useFetch = (url) => {
    const [status, setStatus] = useState('idle')
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setStatus('fetching')
            const res = await fetch(url)
            const data = await res.json()
            setData(data)
            setStatus('fetched')
        }

        fetchData()
    }, [url])

    return { status, data }
}

const SuitabilityControls = ({ selected, setLayer }) => {
    const [weights, setWeights] = useState(buildWeights())
    const { status, data } = useFetch('/hexes.json')

    useEffect(() => {
        if (selected) setLayer(h3Layer(data, weights))
    }, Object.values(weights).concat(selected).concat(status))
    return (
        <div className="p-5">
            {features.map((d, i) => (
                <div key={i}>
                    <input
                        value={weights[d] * 100}
                        type="range"
                        className="clear"
                        onChange={(e) => {
                            weights[d] = e.target.value / 100
                            console.log(d, e.target.value)
                            setWeights({ ...weights })
                        }}
                    />
                    <label className="" key={i}>
                        {d}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default SuitabilityControls
