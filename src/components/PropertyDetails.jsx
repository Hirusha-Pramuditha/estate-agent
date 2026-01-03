import PropertyImageGallery from './ImageGallery'
import PropertyTabs from './PropertyTabs'

/**
 * PropertyDetails Component
 * Displays full details of a selected property
 * @param {Object} property - Property data
 * @param {Function} onBack - Callback to return to search
 * @param {Function} onAddToFavourites - Callback to add to favourites
 * @param {boolean} isFavourite - Whether property is in favourites
 */
function PropertyDetails({ property, onBack, onAddToFavourites, isFavourite }) {
  return (
    <div className="property-details-page">
      {/* Back Button */}
      <button onClick={onBack} className="back-button" aria-label="Back to search results">
        ← Back to Search
      </button>

      {/* Property Header */}
      <div className="property-details-header">
        <div className="property-details-title">
          <h1>{property.type.charAt(0).toUpperCase() + property.type.slice(1)} for Sale</h1>
          <p className="property-details-location">📍 {property.location}</p>
          <div className="property-details-meta">
            <div className="meta-item">
              <strong>🛏️ Bedrooms:</strong> {property.bedrooms}
            </div>
            <div className="meta-item">
              <strong>🛁 Bathrooms:</strong> {property.bathrooms}
            </div>
            <div className="meta-item">
              <strong>📏 Size:</strong> {property.size} sq ft
            </div>
            <div className="meta-item">
              <strong>📅 Added:</strong> {new Date(property.dateAdded).toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>
        <div>
          <p className="property-details-price">£{property.price.toLocaleString()}</p>
          <button
            onClick={() => onAddToFavourites(property)}
            className={`btn-favourite ${isFavourite ? 'active' : ''}`}
            style={{ marginTop: '15px', padding: '12px 24px', fontSize: '1rem' }}
            disabled={isFavourite}
            aria-label={isFavourite ? 'Already in favourites' : 'Add to favourites'}
          >
            {isFavourite ? '❤️ Saved to Favourites' : '🤍 Save to Favourites'}
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <PropertyImageGallery images={property.images} location={property.location} />

      {/* Property Tabs */}
      <PropertyTabs
        description={property.fullDescription}
        floorPlan={property.floorPlan}
        location={property.location}
        postcode={property.postcode}
      />
    </div>
  )
}

export default PropertyDetails