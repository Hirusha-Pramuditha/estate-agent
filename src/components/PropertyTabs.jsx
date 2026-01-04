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
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    
    if (!apiKey) {
      console.error('Google Maps API key not found. Add VITE_GOOGLE_MAPS_API_KEY to .env file')
      return null
    }
    
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${address}&zoom=15`
  }

  const mapUrl = getMapUrl()

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
          {mapUrl ? (
            <div className="map-container">
              <iframe
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property location map"
              />
            </div>
          ) : (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px'
            }}>
              <p>⚠️ Map unavailable. Please check your .env file.</p>
            </div>
          )}
        </div>
      </TabPanel>
    </Tabs>
  )
}

export default PropertyTabs