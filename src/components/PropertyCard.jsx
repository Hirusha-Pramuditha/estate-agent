import { useDrag } from 'react-dnd'

/**
 * PropertyCard Component
 * Displays a property in card format with drag-and-drop functionality
 * @param {Object} property - Property data
 * @param {Function} onView - Callback to view property details
 * @param {Function} onAddToFavourites - Callback to add to favourites
 * @param {boolean} isFavourite - Whether property is in favourites
 */
function PropertyCard({ property, onView, onAddToFavourites, isFavourite }) {
  // Drag and drop functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: property,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  /**
   * Handle add to favourites button click
   */
  const handleFavouriteClick = (e) => {
    e.stopPropagation()
    onAddToFavourites(property)
  }

  /**
   * Handle view property button click
   */
  const handleViewClick = (e) => {
    e.stopPropagation()
    onView(property)
  }

  return (
    <div
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        src={property.images[0]}
        alt={`${property.type} in ${property.location}`}
        className="property-image"
        loading="lazy"
      />
      <div className="property-content">
        <span className="property-type">{property.type}</span>
        <h3 className="property-price">£{property.price.toLocaleString()}</h3>
        <p className="property-location">📍 {property.location}</p>
        
        <div className="property-details">
          <span>🛏️ {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
          <span>🛁 {property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}</span>
        </div>

        <p className="property-description">{property.shortDescription}</p>

        <div className="property-actions">
          <button
            onClick={handleViewClick}
            className="btn-view"
            aria-label={`View details for property at ${property.location}`}
          >
            View Details
          </button>
          <button
            onClick={handleFavouriteClick}
            className={`btn-favourite ${isFavourite ? 'active' : ''}`}
            aria-label={isFavourite ? 'Already in favourites' : 'Add to favourites'}
            disabled={isFavourite}
          >
            {isFavourite ? '❤️ Saved' : '🤍 Favourite'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard