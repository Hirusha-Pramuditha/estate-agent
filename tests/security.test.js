import { sanitizeInput, validateEmail, validatePostcode } from '../src/utils/security'

describe('Security Utils - Critical Functions', () => {
  test('sanitizeInput prevents XSS attacks by encoding HTML', () => {
    const maliciousInput = '<script>alert("xss")</script>Hello'
    const result = sanitizeInput(maliciousInput)
    expect(result).not.toContain('<script>')
    expect(result).toContain('&lt;script&gt;')
  })

  test('validateEmail correctly validates email format', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('invalid.email')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
  })

  test('validatePostcode validates UK postcode format', () => {
    expect(validatePostcode('BR1 3QD')).toBe(true)
    expect(validatePostcode('NW1 7HJ')).toBe(true)
    expect(validatePostcode('INVALID')).toBe(false)
  })
})