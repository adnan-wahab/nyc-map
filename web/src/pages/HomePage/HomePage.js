import React, { useState } from 'react'

import VisualizationControls from 'src/components/VisualizationControls'
import ListingControls from 'src/components/ListingControls'
import Map from 'src/components/Map'

import { Grommet } from 'grommet'
import { Button } from "@blueprintjs/core";

function Root() {
    const [selectedLayer, selectLayer] = useState()
    const [listingLayer, selectListings] = useState()
    const [showLoading, setShowLoading] = useState()

    // heap.identify('unique_identifier');

    const layers = [listingLayer, selectedLayer]
    // console.log(layers)
    const loader = <div id="rainbow-progress-bar"></div>

    return (
        <Grommet theme={{ global: { colors: { doc: '#ff99cc' } } }}>
            {showLoading && loader}
            <ListingControls selectListings={selectListings} />
            <VisualizationControls setLayer={selectLayer} />
            <Map layers={layers} />
        </Grommet>
    )
}

export default Root
