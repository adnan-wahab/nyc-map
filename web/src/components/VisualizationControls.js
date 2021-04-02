
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

const List = styled.section`
  background: transparent;
  border-radius: 3px;
  margin: 0 1em;
  padding: 0.25em 1em;
`
// The above changes the color for the legend.
const SidePanel = styled.section`
  line-height: 21px;
  font-size: 16px;
  padding: 0px;
  font-size: 10px;
  position: fixed;
  right: 0px;
  z-index: 1100;
  background: white;
  height: 100%;
  width: 350px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  color: black;
  overflow: scroll;
`
const SubHeader = styled.section`
  padding: 0px 1.5rem;
  border-color: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #333;
  border-color: rgba(0, 0, 0, 0.1);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

const Logo = styled.img`
  padding-right: 10px;
`

const Label = styled.label`
  display: block;
`

const LinkTitle = styled.span`
  cursor: pointer;
  &:hover {
    color: palevioletred;
  }
`

const PriceInput = styled.input`
  width: 50px;
`
const openModal = () => {
  alert(
    'Find the best appartment to live in using the best data sets!!! fuck brokers they are lying scum trash!!!! '
  )
}


const VisualizationControls = (props) => {
  const [checked, setChecked] = useState(false)
  const [activeIndex, setActiveIndex] = useState([0]);

  return (
    <SidePanel>
      <SubHeader>
        <LinkTitle onClick={openModal}>Visualization Controls</LinkTitle>
      </SubHeader>

      <Accordion
        activeIndex={activeIndex}
        onActive={newActiveIndex => setActiveIndex(newActiveIndex)}
      >
        <AccordionPanel
          header={renderPanelHeader('Places', activeIndex.includes(0))}
        >
          <Box pad="medium" background="light-2" style={{ height: '300px' }}>
          <input placeholder="search"></input>
          <p>
            blahlalbdalbdalglsalg asldflas falsdf lasdf lasdlf alsdfl asldf{' '}
          </p>
          </Box>
        </AccordionPanel>
        <AccordionPanel
          header={renderPanelHeader('311 Complaints', activeIndex.includes(1))}
        >
          <Box pad="medium" background="light-2" style={{ height: '50px' }}>
            <Text>Panel 2 contents</Text>
          </Box>
        </AccordionPanel>
        <AccordionPanel
          header={renderPanelHeader('Commute Distance', activeIndex.includes(2))}
        >
          <CommuteDistanceControls />
        </AccordionPanel>


        <AccordionPanel
          header={renderPanelHeader('Suitability Index', activeIndex.includes(2))}
        >
          <Box pad="medium" background="light-2" style={{ height: '300px' }}>
          <Label>
            <input type="range"></input>noise complaints
          </Label>
          <Label>
            <input type="range"></input>distance to yoga studio
          </Label>
          <Label>
            <input type="range"></input>density of saunas
          </Label>
          <Label>
            <input type="range"></input>gentrification score
          </Label>
        </Box>
        </AccordionPanel>

        <AccordionPanel
        header={renderPanelHeader('Demographics', activeIndex.includes(3))}>
        <span> racial demographic dot map</span>
        </AccordionPanel>
      </Accordion>

    </SidePanel>
  )

}

export default VisualizationControls
