import { sanitizeInput, validateEmail, validatePostcode, validatePrice, validateBedrooms } from '../src/utils/security'

describe('Security Utils', () => {
  test('sanitizeInput removes HTML tags', () => {
    const input = '<script>alert("xss")</script>Hello'
    const result = sanitizeInput(input)
    expect(result).not.toContain('<script>')
    expect(result).toContain('&lt;script&gt;')
  })

  test('sanitizeInput handles special characters', () => {
    const input = '"><script>alert(1)</script>'
    const result = sanitizeInput(input)
    expect(result).toBe('&quot;&gt;&lt;script&gt;alert(1)&lt;&#x2F;script&gt;')
  })

  test('validateEmail validates correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user.name@domain.co.uk')).toBe(true)
  })

  test('validateEmail rejects invalid email', () => {
    expect(validateEmail('invalid.email')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
    expect(validateEmail('test@')).toBe(false)
  })

  test('validatePostcode validates correct UK postcode', () => {
    expect(validatePostcode('BR1 3QD')).toBe(true)
    expect(validatePostcode('NW1 7HJ')).toBe(true)
    expect(validatePostcode('SW3 2LP')).toBe(true)
  })

  test('validatePrice validates correct prices', () => {
    expect(validatePrice('450000')).toBe(true)
    expect(validatePrice(325000)).toBe(true)
    expect(validatePrice('0')).toBe(true)
  })

  test('validatePrice rejects invalid prices', () => {
    expect(validatePrice('-100')).toBe(false)
    expect(validatePrice('abc')).toBe(false)
  })

  test('validateBedrooms validates correct bedroom counts', () => {
    expect(validateBedrooms('1')).toBe(true)
    expect(validateBedrooms(4)).toBe(true)
    expect(validateBedrooms('10')).toBe(true)
  })

  test('validateBedrooms rejects invalid bedroom counts', () => {
    expect(validateBedrooms('0')).toBe(false)
    expect(validateBedrooms('25')).toBe(false)
    expect(validateBedrooms('abc')).toBe(false)
  })
})