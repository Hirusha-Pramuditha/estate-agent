import { filterProperties, sortPropertiesByPrice } from '../src/utils/searchUtils'

describe('Search Utils - Critical Functions', () => {
  const mockProperties = [
    {
      id: 1,
      type: 'house',
      price: 450000,
      bedrooms: 4,
      postcode: 'BR1 3QD'
    },
    {
      id: 2,
      type: 'flat',
      price: 325000,
      bedrooms: 2,
      postcode: 'NW1 7HJ'
    },
    {
      id: 3,
      type: 'house',
      price: 675000,
      bedrooms: 5,
      postcode: 'SW3 2LP'
    }
  ]

  test('filterProperties filters by property type', () => {
    const criteria = { type: 'house' }
    const result = filterProperties(mockProperties, criteria)
    expect(result.length).toBe(2)
    expect(result.every(p => p.type === 'house')).toBe(true)
  })

  test('filterProperties filters by price range', () => {
    const criteria = { minPrice: '300000', maxPrice: '500000' }
    const result = filterProperties(mockProperties, criteria)
    expect(result.length).toBe(2)
    expect(result.every(p => p.price >= 300000 && p.price <= 500000)).toBe(true)
  })

  test('filterProperties filters by bedroom count', () => {
    const criteria = { minBedrooms: '3', maxBedrooms: '4' }
    const result = filterProperties(mockProperties, criteria)
    expect(result.length).toBe(1)
    expect(result[0].bedrooms).toBe(4)
  })

  test('sortPropertiesByPrice sorts correctly', () => {
    const ascending = sortPropertiesByPrice(mockProperties, 'asc')
    expect(ascending[0].price).toBe(325000)
    expect(ascending[2].price).toBe(675000)
    
    const descending = sortPropertiesByPrice(mockProperties, 'desc')
    expect(descending[0].price).toBe(675000)
    expect(descending[2].price).toBe(325000)
  })
})