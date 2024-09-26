import { describe, it, expect } from 'vitest'
import { add } from './math'

describe('add', () => {
  it('should return correct sum', () => {
    expect(add(2, 3)).toBe(8)
  })
})
