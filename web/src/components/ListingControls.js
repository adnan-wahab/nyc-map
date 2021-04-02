import React, { useEffect, useState, useContext } from 'react'
import { IconLayer } from '@deck.gl/layers'
import { RangeSlider } from '@blueprintjs/core'
import MapContext from './MapContext'

const LISTING_TYPES = ['Rentals', 'Airbnb', 'Condo', 'Officespace']

const makeIconLayer = (data, setSelectedListing) => {
    const layerProps = {
        data,
        pickable: true,
        getPosition: (d) => [+d.longitude, +d.latitude],
        getIcon: (d) => 'marker',
        iconMapping: '/location-icon-mapping.json',
        iconAtlas: '/location-icon-atlas.png',
        sizeUnits: 'pixels',

        sizeScale: 0.1,
        sizeMinPixels: 20,
        sizeMaxPixels: 50,
        getColor: () => [255, 0, 255, 255],
        onClick: (info) => {
            setSelectedListing(info.object)
        },
    }

    // return new IconClusterLayer({
    //     ...layerProps,
    //     id: 'icon-cluster',
    //     sizeScale: 60,
    // })

    return new IconLayer({
        ...layerProps,
        autoHighlight: true,
        highlightColor: [0, 0, 128, 128],
        id: 'icon',
        getIcon: (d) => 'marker',
        sizeUnits: 'meters',
        sizeScale: 2000,
        sizeMinPixels: 6,
    })
}

const queryMongo = async (search) => {
    const query = {}
    const res = await fetch('http://localhost:8911/listings', {
        method: 'POST',
        body: JSON.stringify(query),
    })
    const rest = await res.json()
    return rest
}

const ListingControls = ({ setLayer, selected }) => {
    const [checked, setChecked] = useState('Airbnb')
    const [priceRange, setPriceRange] = useState([0, 2000])
    const { setSelectedListing } = useContext(MapContext)

    useEffect(() => {
        const call = async () => {
            if (!checked) return
            const data = await queryMongo({})
            const layer = makeIconLayer(data.slice(0, 50), setSelectedListing)
            if (selected) setLayer(layer)
        }
        call()
    }, [checked, setLayer, selected])

    let radio = LISTING_TYPES.map((d) => (
        <label key={d} className="pr-2">
            <input
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded "
                name={d}
                type="radio"
                checked={checked == d}
                onChange={() => {}}
            />{' '}
            {d}
        </label>
    ))
    return (
        <div className="p-5 bg-white h-60 w-96 text-black">
            <div
                className="text-xs"
                direction="row"
                align="center"
                pad="small"
                gap="small"
            >
                <span className="float-left">Type</span>
                <form
                    className="inline"
                    onChange={(e) => setChecked(e.target.name)}
                >
                    {radio}
                </form>
            </div>

            <div className="pt-5">
                <span className="float-left" size="small" color="brand">
                    Price
                </span>

                <div className="9/12 pl-12">
                    <RangeSlider
                        min={0}
                        max={3000}
                        stepSize={100}
                        labelStepSize={500}
                        value={priceRange}
                        onChange={(value) => {
                            console.log(value)
                            setPriceRange(value)
                        }}
                        vertical={false}
                    />
                </div>

                <div className="mt-5">
                    <button
                        className="inline-flex items-center px-2.5 py-1.5 border
                     border-gray-300 shadow-sm text-xs font-medium rounded
                      text-gray-700 bg-white hover:bg-gray-50 focus:outline-none
                       focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Rooms
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListingControls
