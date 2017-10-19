import { map, some } from 'lodash'

export const searchRooms = (rooms, search, limit = 5) => {
  if (!search) {
    return rooms
  }

  const keys = ['name', 'slug']
  const regExp = new RegExp(search, 'i')
  const test = (room) => (
    some(keys, (key) => regExp.test(room[key]))
  )

  let results = []

  map(rooms, (room) => {
    if (test(room)) {
      results.push(room)
    }

    if (results.length >= limit) {
      return results
    }
  })

  return results
}
