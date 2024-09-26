import { describe, it, expect } from 'vitest'
import { add } from './math'

describe('add', () => {
  it('should return correct sum', () => {
    expect(add(2, 6)).toBe(8)
  })
})
