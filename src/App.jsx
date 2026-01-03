import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import PropertyCard from './components/PropertyCard'
import PropertyDetails from './components/PropertyDetails'
import FavouritesList from './components/FavouritesList'
import Footer from './components/Footer'
import propertiesData from './data/properties.json'
import { filterProperties } from './utils/searchUtils'
import { sanitizeInput } from './utils/security'
import './App.css'

/**
 * Main App Component
 * Manages the entire estate agent application state and routing
 */
function App() {
  // State management
  const [properties] = useState(propertiesData)
  const [filteredProperties, setFilteredProperties] = useState(propertiesData)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [favourites, setFavourites] = useState([])
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAddedFrom: '',
    dateAddedTo: '',
    postcode: ''
  })

  // Load favourites from localStorage on mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem('favouriteProperties')
    if (savedFavourites) {
      try {
        const parsed = JSON.parse(savedFavourites)
        setFavourites(parsed)
      } catch (error) {
        console.error('Error loading favourites:', error)
      }
    }
  }, [])

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favouriteProperties', JSON.stringify(favourites))
  }, [favourites])

  // Auto-search: Filter properties whenever search criteria changes
  useEffect(() => {
    const sanitizedCriteria = {
      type: sanitizeInput(searchCriteria.type),
      minPrice: sanitizeInput(searchCriteria.minPrice),
      maxPrice: sanitizeInput(searchCriteria.maxPrice),
      minBedrooms: sanitizeInput(searchCriteria.minBedrooms),
      maxBedrooms: sanitizeInput(searchCriteria.maxBedrooms),
      dateAddedFrom: searchCriteria.dateAddedFrom,
      dateAddedTo: searchCriteria.dateAddedTo,
      postcode: sanitizeInput(searchCriteria.postcode)
    }

    const results = filterProperties(properties, sanitizedCriteria)
    setFilteredProperties(results)
  }, [searchCriteria, properties])

  /**
   * Handle search criteria changes (auto-search)
   * @param {Object} criteria - Search criteria from the form
   */
  const handleSearchChange = (criteria) => {
    setSearchCriteria(criteria)
  }

  /**
   * Reset all search filters
   */
  const handleResetFilters = () => {
    setSearchCriteria({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAddedFrom: '',
      dateAddedTo: '',
      postcode: ''
    })
  }

  /**
   * Add property to favourites
   * Prevents duplicates
   * @param {Object} property - Property to add to favourites
   */
  const addToFavourites = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property])
    }
  }

  /**
   * Remove property from favourites
   * @param {number} propertyId - ID of property to remove
   */
  const removeFromFavourites = (propertyId) => {
    setFavourites(favourites.filter(fav => fav.id !== propertyId))
  }

  /**
   * Clear all favourites
   */
  const clearFavourites = () => {
    setFavourites([])
  }

  /**
   * View property details
   * @param {Object} property - Property to view
   */
  const viewProperty = (property) => {
    setSelectedProperty(property)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Go back to search results
   */
  const backToSearch = () => {
    setSelectedProperty(null)
  }

  // Check if property is in favourites
  const isFavourite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId)
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Premium Estate Agent</h1>
        <p>Find your dream property from our exclusive collection</p>
      </header>

      <div className="app-content-wrapper">
        {/* Main Content */}
        {selectedProperty ? (
          // Property Details View
          <PropertyDetails
            property={selectedProperty}
            onBack={backToSearch}
            onAddToFavourites={addToFavourites}
            isFavourite={isFavourite(selectedProperty.id)}
          />
        ) : (
          // Search and Results View
          <div className="main-content">
            <div className="search-section">
              {/* Search Form */}
              <SearchForm 
                searchCriteria={searchCriteria}
                onSearchChange={handleSearchChange}
                onResetFilters={handleResetFilters}
              />

              {/* Results Section */}
              <section className="results-section">
                <h2>Property Listings</h2>
                <p className="results-count">
                  Found {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
                </p>

                {filteredProperties.length > 0 ? (
                  <div className="properties-grid">
                    {filteredProperties.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onView={viewProperty}
                        onAddToFavourites={addToFavourites}
                        isFavourite={isFavourite(property.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No properties found</h3>
                    <p>Try adjusting your search criteria to find more properties</p>
                  </div>
                )}
              </section>
            </div>

            {/* Favourites Sidebar */}
            <aside className="favourites-sidebar">
              <FavouritesList
                favourites={favourites}
                onRemove={removeFromFavourites}
                onClear={clearFavourites}
                onView={viewProperty}
                onDrop={addToFavourites}
              />
            </aside>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App