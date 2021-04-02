import React, { useState, useEffect } from 'react'
import GL from '@luma.gl/constants'
import _ from 'lodash'
import { ScatterplotLayer } from 'deck.gl'
import makeFetch from './useFetch'
import { ItemRenderer, MultiSelect } from '@blueprintjs/select'

const queryMongo = async (search) => {
    const res = await fetch('http://localhost:8911/mongo', {
        method: 'POST',
        body: JSON.stringify({ search }),
        //body: JSON.stringify({$text: {$search: search}})
    })
    return res
}

const useFetch = makeFetch(queryMongo)
const makeScatterLayer = (data) => {
    return new ScatterplotLayer({
        id: 'places',
        getPosition: (d) => [d.coordinates.longitude, d.coordinates.latitude],
        getFillColor: [100, 0, 100, 255],
        getLineColor: (d) => [0, 0, 0],
        radiusScale: 15,
        radiusMinPixels: 2,
        radiusMaxPixels: 100,
        data: data,
        lineWidthMinPixels: 1,
        stroked: true,
        opacity: 0.9,

        autoHighlight: true,
        highlightColor: [256, 128, 128, 128],
        pickable: true,

        parameters: {
            [GL.DEPTH_TEST]: true,
            [GL.BLEND]: true,
            [GL.BLEND_SRC_RGB]: GL.ONE,
            [GL.BLEND_DST_RGB]: GL.ONE,
            [GL.BLEND_EQUATION]: GL.FUNC_ADD,
        },
    })
}

const PlaceControls = ({ selected, setLayer, className }) => {
    const [value, setValue] = useState('')
    const setValueBounce = _.debounce(setValue, 300)
    const { status, data } = useFetch(value)

    useEffect(() => {
        if (selected) setLayer(makeScatterLayer(data))
    }, [value, selected, status])

    return (
        <div className={className}>
            <input
                type="search"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="search"
                onChange={(e) => setValueBounce(e.target.value)}
            />
        </div>
    )
}

export default PlaceControls
