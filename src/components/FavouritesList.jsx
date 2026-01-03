import { useDrop, useDrag } from 'react-dnd'

/**
 * FavouriteItem Component
 * Individual favourite property item with drag functionality
 */
function FavouriteItem({ property, onRemove, onView }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FAVOURITE',
    item: { id: property.id, property: property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      // This ensures the drag operation completes properly
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        // Item was not dropped in a valid zone
        return
      }
    }
  }), [property.id])

  return (
    <div
      ref={drag}
      className={`favourite-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="favourite-item-content" onClick={() => onView(property)}>
        <img
          src={property.images[0]}
          alt={property.location}
          className="favourite-item-image"
        />
        <div className="favourite-item-info">
          <p className="favourite-item-price">£{property.price.toLocaleString()}</p>
          <p className="favourite-item-location">{property.location}</p>
          <p className="favourite-item-type">{property.type} • {property.bedrooms} beds</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove(property.id)
        }}
        className="btn-remove-favourite"
        aria-label={`Remove ${property.location} from favourites`}
      >
        Remove
      </button>
    </div>
  )
}

/**
 * FavouritesList Component
 * Displays and manages the list of favourite properties
 * @param {Array} favourites - Array of favourite properties
 * @param {Function} onRemove - Callback to remove a favourite
 * @param {Function} onClear - Callback to clear all favourites
 * @param {Function} onView - Callback to view property details
 * @param {Function} onDrop - Callback when property is dropped
 */
function FavouritesList({ favourites, onRemove, onClear, onView, onDrop }) {
  // Drop zone for adding properties to favourites
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => {
      onDrop(item)
      return { added: true }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }), [onDrop])

  // Drop zone for removing properties from favourites
  const [{ isOverRemove }, dropRemove] = useDrop(() => ({
    accept: 'FAVOURITE',
    drop: (item) => {
      // Remove the specific item that was dragged
      console.log('Removing item with id:', item.id)
      onRemove(item.id)
      return { removed: true }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }), [onRemove])

  return (
    <div className="favourites-container">
      <div className="favourites-header">
        <h2>Favourites</h2>
        <span className="favourites-count">{favourites.length}</span>
      </div>

      {favourites.length > 0 && (
        <button
          onClick={onClear}
          className="btn-clear-favourites"
          aria-label="Clear all favourites"
        >
          Clear All
        </button>
      )}

      <div
        ref={drop}
        className={`favourites-drop-zone ${isOver ? 'drag-over' : ''}`}
      >
        {favourites.length > 0 ? (
          <div className="favourites-list">
            {favourites.map(property => (
              <FavouriteItem
                key={property.id}
                property={property}
                onRemove={onRemove}
                onView={onView}
              />
            ))}
          </div>
        ) : (
          <div className="empty-favourites">
            <div className="empty-favourites-icon">💝</div>
            <p>
              <strong>No favourites yet</strong><br />
              Drag properties here or click the Save button to add them to your favourites
            </p>
          </div>
        )}
      </div>

      {/* Remove drop zone - Drag items here to remove them one by one */}
      {favourites.length > 0 && (
        <div
          ref={dropRemove}
          className={`remove-drop-zone ${isOverRemove ? 'drag-over-remove' : ''}`}
        >
          <p>🗑️ Drag items here to remove</p>
        </div>
      )}
    </div>
  )
}

export default FavouritesList