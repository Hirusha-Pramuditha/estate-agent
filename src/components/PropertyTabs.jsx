import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

/**
 * PropertyTabs Component
 * Displays property information in tabbed interface
 * @param {string} description - Full property description
 * @param {string} floorPlan - Floor plan image URL
 * @param {string} location - Property location for map
 * @param {string} postcode - Property postcode
 */
function PropertyTabs({ description, floorPlan, location, postcode }) {
  /**
   * Generate Google Maps embed URL
   * @returns {string} Google Maps embed URL
   */
  const getMapUrl = () => {
    const address = encodeURIComponent(`${location}, ${postcode}`)
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${address}&zoom=15`
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Description</Tab>
        <Tab>Floor Plan</Tab>
        <Tab>Location Map</Tab>
      </TabList>

      <TabPanel>
        <div className="tab-content">
          <h3>Property Description</h3>
          <p>{description}</p>
        </div>
      </TabPanel>

      <TabPanel>
        <div className="tab-content">
          <h3>Floor Plan</h3>
          <img
            src={floorPlan}
            alt="Property floor plan"
            className="floor-plan-image"
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="tab-content">
          <h3>Location</h3>
          <p style={{ marginBottom: '20px' }}>
            <strong>Address:</strong> {location}, {postcode}
          </p>
          <div className="map-container">
            <iframe
              src={getMapUrl()}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property location map"
            />
          </div>
        </div>
      </TabPanel>
    </Tabs>
  )
}

export default PropertyTabs