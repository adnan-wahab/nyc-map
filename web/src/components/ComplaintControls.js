import React, { useState, useEffect } from 'react'

import { H3HexagonLayer } from '@deck.gl/geo-layers'
import makeFetch from './useFetch'

const queryMongo = async (url) => {
    const res = await fetch(url)
    return res
}
const useFetch = makeFetch(queryMongo)

const complaints = [
    'Blocked-Driveway',
    'Street-Light-Condition',
    'UNSANITARY-CONDITION',
    'GENERAL-CONSTRUCTION',
    'Water-System',
    'HEAT-HOT-WATER',
    'HEATING',
    'Illegal-Parking',
    'Noise---Residential',
    'Noise---Street-Sidewalk',
    'PLUMBING',
    'Street-Condition',
]

export const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    //[216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78],
]

const colorRamp = (n) => {
    return colorRange[n.toString().length]
}

//console.log('loading ' + )

const makeComplaintLayer = (data) => {
    return () => {
        let layer = new H3HexagonLayer({
            id: 'h3-hexagon-layer',
            data: data,
            coverage: 1,
            elevationScale: 2,
            opacity: 0.8,
            pickable: false,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: false,
            getHexagon: (d) => d[0],
            getFillColor: (d) => colorRamp(d[1]),
            getElevation: (d) => d[1],
        })
        return layer
    }
}

const ComplaintControls = ({ selected, setLayer, className }) => {
    const [value, setValue] = useState('HEATING')
    const { status, data } = useFetch(`data/${value}.json`)

    useEffect(() => {
        if (selected) setLayer(makeComplaintLayer(data))
    }, [value, selected, status])

    return (
        <div className={className}>
            <select
                className="pb-5"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                {complaints.map((d) => (
                    <option key={d}>{d}</option>
                ))}
            </select>
            <div className="pt-5">
                <div className="layout">
                    <div
                        className="legend"
                        style={{
                            background: 'rgb(1, 152, 189)',
                            width: '16.6667%',
                        }}
                    ></div>
                    <div
                        className="legend"
                        style={{
                            background: 'rgb(73, 227, 206)',
                            width: '16.6667%',
                        }}
                    ></div>
                    <div
                        className="legend"
                        style={{
                            background: 'rgb(216, 254, 181)',
                            width: ' 16.6667%',
                        }}
                    ></div>
                    <div
                        className="legend"
                        style={{
                            background: 'rgb(254, 237, 177)',
                            width: '16.6667%',
                        }}
                    ></div>
                    <div
                        className="legend"
                        style={{
                            background: 'rgb(254, 173, 84)',
                            width: '16.6667%',
                        }}
                    ></div>
                    <div
                        className="legend"
                        style={{
                            background: 'rgb(209, 55, 78)',
                            width: '16.6667%',
                        }}
                    ></div>
                </div>
                <p className="layout">
                    <span className="col-1-2">Fewer Complaints</span>
                    <span className="col-1-2 text-right">More Complaints</span>
                </p>
                <p>
                    Data source:{' '}
                    <a href="https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9">
                        New York City 311{' '}
                    </a>
                </p>
            </div>
        </div>
    )
}

export default ComplaintControls
