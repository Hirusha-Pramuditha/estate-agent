/**
 * Search Utilities
 * Functions for filtering properties based on search criteria
 */

/**
 * Filter properties based on search criteria
 * @param {Array} properties - Array of all properties
 * @param {Object} criteria - Search criteria object
 * @returns {Array} Filtered properties
 */
export function filterProperties(properties, criteria) {
  return properties.filter(property => {
    // Filter by type
    if (criteria.type && property.type !== criteria.type) {
      return false
    }

    // Filter by minimum price
    if (criteria.minPrice && property.price < parseFloat(criteria.minPrice)) {
      return false
    }

    // Filter by maximum price
    if (criteria.maxPrice && property.price > parseFloat(criteria.maxPrice)) {
      return false
    }

    // Filter by minimum bedrooms
    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
      return false
    }

    // Filter by maximum bedrooms
    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
      return false
    }

    // Filter by date added (from)
    if (criteria.dateAddedFrom) {
      const propertyDate = new Date(property.dateAdded)
      const fromDate = new Date(criteria.dateAddedFrom)
      if (propertyDate < fromDate) {
        return false
      }
    }

    // Filter by date added (to)
    if (criteria.dateAddedTo) {
      const propertyDate = new Date(property.dateAdded)
      const toDate = new Date(criteria.dateAddedTo)
      if (propertyDate > toDate) {
        return false
      }
    }

    // Filter by postcode area
    if (criteria.postcode) {
      const searchPostcode = criteria.postcode.toUpperCase().trim()
      const propertyPostcode = property.postcode.split(' ')[0].toUpperCase()
      if (!propertyPostcode.startsWith(searchPostcode)) {
        return false
      }
    }

    return true
  })
}

/**
 * Sort properties by price
 * @param {Array} properties - Array of properties
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted properties
 */
export function sortPropertiesByPrice(properties, order = 'asc') {
  return [...properties].sort((a, b) => {
    if (order === 'asc') {
      return a.price - b.price
    }
    return b.price - a.price
  })
}

/**
 * Sort properties by date added
 * @param {Array} properties - Array of properties
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted properties
 */
export function sortPropertiesByDate(properties, order = 'desc') {
  return [...properties].sort((a, b) => {
    const dateA = new Date(a.dateAdded)
    const dateB = new Date(b.dateAdded)
    if (order === 'asc') {
      return dateA - dateB
    }
    return dateB - dateA
  })
}

/**
 * Get property statistics
 * @param {Array} properties - Array of properties
 * @returns {Object} Statistics object
 */
export function getPropertyStats(properties) {
  if (properties.length === 0) {
    return {
      count: 0,
      averagePrice: 0,
      minPrice: 0,
      maxPrice: 0,
      averageBedrooms: 0
    }
  }

  const prices = properties.map(p => p.price)
  const bedrooms = properties.map(p => p.bedrooms)

  return {
    count: properties.length,
    averagePrice: prices.reduce((a, b) => a + b, 0) / prices.length,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    averageBedrooms: bedrooms.reduce((a, b) => a + b, 0) / bedrooms.length
  }
}