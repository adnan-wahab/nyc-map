import ReactMapGL from 'react-map-gl'
import React, { useState } from 'react'
import DeckGL from 'deck.gl'
import { StaticMap } from 'react-map-gl'

const INITIAL_VIEW_STATE = {
    altitude: 1.5,
    bearing: 26.13583138173302,
    height: 766,
    latitude: 40.70668036901265,
    longitude: -73.94436173838425,
    maxPitch: 60,
    maxZoom: 20,
    minPitch: 0,
    minZoom: 0,
    pitch: 41.81818181818182,
    width: 854,
    zoom: 11.502812637593744,
}

const adnan = ({ object }) => {
    let html
    if (!object) return null

    if (object.cluster)
        html = `<div class="mini-bubble-details">
    ${object.point_count} appartments
           </div>`
    else if (object.picture_url)
        html = `
        <div class="mini-bubble-details">
                    <strong>${object.price}</strong>
                    <div>${object.name}</div>
                    <div>3 bd, 2 ba</div>
                    <div>1,604 sqft</div>
                    <div>Review Score: ${object.review_scores_rating}</div>
                    <div class="text-red-600">Price is 300 over expected value!</div>
                    <div class="text-green-600">Price is 300 under expected value!</div>

               </div>`
    else
        html = `
        <img width="100px" height="100px" src=${
            object.image_url + '?im_w=1200'
        }/>
        <div class="mini-bubble-details">
                    <div>${object.name}</div>

               </div>`
    return {
        style: {
            color: '#333',
            'background-color': 'white',
        },
        html,
    }
}

const Mapbox_access_token =
    'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNpenExZHF0ZTAxMXYzMm40cWRxZXY1d3IifQ.TdYuekJQSG1eh6dDpywTxQ'
//process.env.HELLO_ENV; // eslint-disable-line

const Map = ({ layers }) => {
    return (
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            useDevicePixels={false}
            layers={layers}
            controller={true}
        >
            <StaticMap
                reuseMaps
                mapboxApiAccessToken={Mapbox_access_token}
                preventStyleDiffing={true}
            />
        </DeckGL>
    )
}

export default React.memo(Map)
