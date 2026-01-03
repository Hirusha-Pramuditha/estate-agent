import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

/**
 * SearchForm Component
 * Provides a comprehensive search interface with React widgets and auto-search
 * @param {Object} searchCriteria - Current search criteria
 * @param {Function} onSearchChange - Callback function when search criteria changes
 * @param {Function} onResetFilters - Callback function to reset all filters
 */
function SearchForm({ searchCriteria, onSearchChange, onResetFilters }) {
  /**
   * Handle input changes with auto-search
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    onSearchChange({
      ...searchCriteria,
      [name]: value
    })
  }

  /**
   * Handle date changes from DatePicker with auto-search
   * @param {Date} date - Selected date
   * @param {string} field - Field name
   */
  const handleDateChange = (date, field) => {
    onSearchChange({
      ...searchCriteria,
      [field]: date
    })
  }

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = () => {
    return searchCriteria.type !== '' ||
           searchCriteria.minPrice !== '' ||
           searchCriteria.maxPrice !== '' ||
           searchCriteria.minBedrooms !== '' ||
           searchCriteria.maxBedrooms !== '' ||
           searchCriteria.dateAddedFrom !== '' ||
           searchCriteria.dateAddedTo !== '' ||
           searchCriteria.postcode !== ''
  }

  return (
    <div className="search-form-container">
      <div className="search-form-header">
        <h2>Search Properties</h2>
        {hasActiveFilters() && (
          <button
            onClick={onResetFilters}
            className="btn-reset-filters"
            aria-label="Reset all filters"
          >
            🔄 Reset Filters
          </button>
        )}
      </div>
      
      <div className="search-form">
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={searchCriteria.type}
            onChange={handleChange}
            aria-label="Select property type"
          >
            <option value="">Any Type</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
            <option value="apartment">Apartment</option>
            <option value="bungalow">Bungalow</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minPrice">Minimum Price (£)</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={searchCriteria.minPrice}
              onChange={handleChange}
              placeholder="e.g. 100000"
              min="0"
              step="1000"
              aria-label="Enter minimum price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxPrice">Maximum Price (£)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={searchCriteria.maxPrice}
              onChange={handleChange}
              placeholder="e.g. 500000"
              min="0"
              step="1000"
              aria-label="Enter maximum price"
            />
          </div>
        </div>

        {/* Bedrooms Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minBedrooms">Minimum Bedrooms</label>
            <select
              id="minBedrooms"
              name="minBedrooms"
              value={searchCriteria.minBedrooms}
              onChange={handleChange}
              aria-label="Select minimum bedrooms"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="maxBedrooms">Maximum Bedrooms</label>
            <select
              id="maxBedrooms"
              name="maxBedrooms"
              value={searchCriteria.maxBedrooms}
              onChange={handleChange}
              aria-label="Select maximum bedrooms"
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6+</option>
            </select>
          </div>
        </div>

        {/* Date Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateAddedFrom">Added After</label>
            <div className="date-picker-wrapper">
              <DatePicker
                id="dateAddedFrom"
                selected={searchCriteria.dateAddedFrom}
                onChange={(date) => handleDateChange(date, 'dateAddedFrom')}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select start date"
                maxDate={new Date()}
                isClearable
                aria-label="Select property added after date"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dateAddedTo">Added Before</label>
            <div className="date-picker-wrapper">
              <DatePicker
                id="dateAddedTo"
                selected={searchCriteria.dateAddedTo}
                onChange={(date) => handleDateChange(date, 'dateAddedTo')}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select end date"
                maxDate={new Date()}
                minDate={searchCriteria.dateAddedFrom}
                isClearable
                aria-label="Select property added before date"
              />
            </div>
          </div>
        </div>

        {/* Postcode */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={searchCriteria.postcode}
            onChange={handleChange}
            placeholder="e.g. BR1, NW1, SW1"
            maxLength="4"
            aria-label="Enter postcode area"
          />
        </div>

        <div className="search-info">
          <p>💡 Results update automatically as you adjust filters</p>
        </div>
      </div>
    </div>
  )
}

export default SearchForm