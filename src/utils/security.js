/**
 * Security Utilities
 * Functions for sanitizing input and protecting against XSS attacks
 */

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input
  }

  // HTML encode special characters
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return input.replace(/[&<>"'/]/g, (char) => map[char])
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate postcode format (UK)
 * @param {string} postcode - Postcode string
 * @returns {boolean} True if valid UK postcode format
 */
export function validatePostcode(postcode) {
  const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i
  return postcodeRegex.test(postcode)
}

/**
 * Validate price input
 * @param {string|number} price - Price value
 * @returns {boolean} True if valid price
 */
export function validatePrice(price) {
  const numPrice = parseFloat(price)
  return !isNaN(numPrice) && numPrice >= 0
}

/**
 * Validate number of bedrooms
 * @param {string|number} bedrooms - Number of bedrooms
 * @returns {boolean} True if valid bedroom count
 */
export function validateBedrooms(bedrooms) {
  const numBedrooms = parseInt(bedrooms)
  return !isNaN(numBedrooms) && numBedrooms >= 1 && numBedrooms <= 20
}

/**
 * Strip HTML tags from string
 * @param {string} html - HTML string
 * @returns {string} String without HTML tags
 */
export function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Escape special characters for use in regex
 * @param {string} string - String to escape
 * @returns {string} Escaped string
 */
export function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}