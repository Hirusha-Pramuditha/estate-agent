import { filterProperties, sortPropertiesByPrice, getPropertyStats } from '../src/utils/searchUtils'

describe('Search Utils', () => {
  const mockProperties = [
    {
      id: 1,
      type: 'house',
      price: 450000,
      bedrooms: 4,
      bathrooms: 3,
      location: 'Bromley',
      postcode: 'BR1 3QD',
      dateAdded: '2024-12-15'
    },
    {
      id: 2,
      type: 'flat',
      price: 325000,
      bedrooms: 2,
      bathrooms: 2,
      location: 'Westminster',
      postcode: 'NW1 7HJ',
      dateAdded: '2024-12-20'
    },
    {
      id: 3,
      type: 'house',
      price: 675000,
      bedrooms: 5,
      bathrooms: 4,
      location: 'Chelsea',
      postcode: 'SW3 2LP',
      dateAdded: '2024-11-28'
    }
  ]

  test('filterProperties filters by type correctly', () => {
    const criteria = { type: 'house' }
    const result = filterProperties(mockProperties, criteria)
    expect(result.length).toBe(2)
    expect(result.every(p => p.type === 'house')).toBe(true)
  })

  test('filterProperties filters by price range correctly', () => {
    const criteria = { minPrice: '300000', maxPrice: '500000' }
    const result = filterProperties(mockProperties, criteria)
    expect(result.length).toBe(2)
    expect(result.every(p => p.price >= 300000 && p.price <= 500000)).toBe(true)
  })

  test('filterProperties filters by bedrooms correctly', () => {
    const criteria = { minBedrooms: '3', maxBedrooms: '4' }
    const result = filterProperties(mockProperties, criteria)
    expect(result.length).toBe(1)
    expect(result[0].bedrooms).toBe(4)
  })

  test('filterProperties filters by postcode correctly', () => {
    const criteria = { postcode: 'BR1' }
    const result = filterProperties(mockProperties, criteria)
    expect(result.length).toBe(1)
    expect(result[0].postcode).toContain('BR1')
  })

  test('sortPropertiesByPrice sorts ascending correctly', () => {
    const result = sortPropertiesByPrice(mockProperties, 'asc')
    expect(result[0].price).toBeLessThan(result[1].price)
    expect(result[1].price).toBeLessThan(result[2].price)
  })

  test('sortPropertiesByPrice sorts descending correctly', () => {
    const result = sortPropertiesByPrice(mockProperties, 'desc')
    expect(result[0].price).toBeGreaterThan(result[1].price)
    expect(result[1].price).toBeGreaterThan(result[2].price)
  })

  test('getPropertyStats calculates statistics correctly', () => {
    const stats = getPropertyStats(mockProperties)
    expect(stats.count).toBe(3)
    expect(stats.minPrice).toBe(325000)
    expect(stats.maxPrice).toBe(675000)
    expect(stats.averagePrice).toBe(483333.3333333333)
  })
})