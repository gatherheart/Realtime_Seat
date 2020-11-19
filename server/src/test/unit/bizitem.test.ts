import BizItem from '../../db/bizItem/bizItem.model'

BizItem.find = jest.fn()
BizItem.findOne = jest.fn()

describe('BizItem existence check', () => {
  test('This is a sample', () => {
    expect(true).toBe(true)
  })
})
