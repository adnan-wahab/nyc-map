import React, { useState, useRef } from 'react'
import CommuteDistanceControls from './CommuteDistanceControls'
import ComplaintControls from './ComplaintControls'
import SuitabilityControls from './SuitabilityControls'
import PlaceControls from './PlaceControls'
import ListingControls from 'src/components/ListingControls'

let blurb = () => {
    return (
        <>
            <div className="overflow-hidden p-5">
                <h3>Data Attribution</h3>
                <p>
                    Data Attribution Crib Finder makes use of a variety of
                    public data sources and third-party databases. You can find
                    more information about the terms governing their use on the
                    <a href="">Attribution page</a>.
                </p>
                <h3>Disclaimer</h3>
                <p>
                    The data and the associated metadata are provided "as-is",
                    without express or implied warranty of completeness,
                    accuracy, or fitness for a particular purpose.
                    <a href="">Read full disclaimer</a>
                </p>
            </div>
            <div className="flex">
                <button
                    className="inline-flex items-center px-2.5 py-1.5 border
                     border-gray-300 shadow-sm text-xs font-medium rounded
                      text-gray-700 bg-white hover:bg-gray-50 focus:outline-none
                       focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Contact
                </button>
            </div>
        </>
    )
}

let titles = [
    'Browse Listings',
    '311 Complaints',
    'Suitability Analysis',
    'Places to go',
    'Commute Distance?',
    'Data Attribution',
]

let content = [
    'Crib Finder is a urban analysis tool designed for discovering the best place in New York City for you to live. Use a single, powerful, interactive interface and explore pricing and spatial insights faster than ever.',
    `The layer aggregates data within the boundary of each hexagon cell
    `,

    `Suitability analysis is a GIS-based multi-criteria decision making process.
    Each aspect of the landscape has characteristics that are in some degree either suitable or unsuitable for the activities being planned.
    Use the sliders below to adjust the importance of each category`,

    `Access to transit within walking distances of places where people live and work is crucial for maintaining the economic vitality and quality of life in cities.`,
]

const Accordion = ({ setLayer, scrollTop }) => {
    let [selectedIndex, setSelectedIndex] = useState(0),
        SIZE = 400,
        fraction = Math.floor(scrollTop / SIZE)

    if (selectedIndex !== fraction) setSelectedIndex(fraction)
    let list = [
        ListingControls,
        ComplaintControls,
        SuitabilityControls,
        PlaceControls,
        CommuteDistanceControls,
        blurb,
    ].map((Child, idx) => (
        <div key={idx} className="tab w-full text-black">
            <div
                style={{ height: `${SIZE}px` }}
                className={`opacity-${selectedIndex === idx ? '100' : '50'}`}
            >
                <h3 className="px-5 pt-5 border-t text-xl">{titles[idx]}</h3>
                <p className="p-5 text-sm border-b">{content[idx]}</p>
                <Child
                    className="p-5"
                    setLayer={setLayer}
                    selected={selectedIndex === idx}
                />
            </div>
        </div>
    ))

    return <div className="shadow-md">{list}</div>
}

const VisualizationControls = ({ setLayer }) => {
    let [scrollTop, setScrollTop] = useState(0)
    let myRef = useRef(null)

    let onScroll = () => {
        setScrollTop(myRef.current.scrollTop)
    }

    return (
        <div className="hidden md:block fixed inset-0 overflow-hidden z-50">
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex transform-gpu transition-transform">
                <div className="relative w-screen max-w-sm">
                    <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 sm:-ml-10 sm:pr-4 flex">
                        {/* add legend here */}
                    </div>
                    <div className="h-full flex flex-col pt-6 bg-white shadow-xl overflow-y-scroll">
                        <div className="px-4 sm:px-6">
                            <div className="pb-5">
                                <img
                                    className="inline pr-2"
                                    src="/favicon.png"
                                />
                                <span className="text-xl pr-3">
                                    Crib Finder
                                </span>
                                <span className="text-xs">
                                    Data Driven Apartment Hunting
                                </span>
                            </div>
                        </div>
                        <div className="relative flex-1 sm:px-6">
                            <div
                                className="absolute inset-0 pointer-events-auto overflow-scroll"
                                onScroll={onScroll}
                                ref={myRef}
                            >
                                <Accordion
                                    setLayer={setLayer}
                                    scrollTop={scrollTop}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default VisualizationControls
