import React, { useState } from 'react'

import VisualizationControls from 'src/components/VisualizationControls'
import Map from 'src/components/Map'
import ListingModal from 'src/components/ListingModal'
import MapContext from 'src/components/MapContext'

import '@blueprintjs/core/lib/css/blueprint.css'

function Root() {
    const [selectedLayer, selectLayer] = useState()
    const [showLoading, setShowLoading] = useState()
    const [listing, setListing] = useState()

    const stuff = {
        showLoading: setShowLoading,
        setSelectedListing: setListing,
    }

    const loader = <div id="rainbow-progress-bar"></div>

    return (
        <div className="antialiased">
            {showLoading && loader}
            <MapContext.Provider value={stuff}>
                <ListingModal object={listing} />
                <VisualizationControls setLayer={selectLayer} />
                <Map layers={[selectedLayer]} />
            </MapContext.Provider>
        </div>
    )
}

export default Root
