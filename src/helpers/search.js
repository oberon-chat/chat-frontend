import { map, some } from 'lodash'

export const searchRooms = (rooms, value, limit = 10) => (
  search(rooms, value, ['name', 'slug'], limit)
)

export const searchUsers = (users, value, limit = 10) => (
  search(users, value, ['name', 'email'], limit)
)

export const search = (items, value, keys, limit) => {
  if (!value) {
    return items
  }

  const regExp = new RegExp(value, 'i')
  const test = (item) => (
    some(keys, (key) => regExp.test(item[key]))
  )

  let results = []

  map(items, (item) => {
    if (test(item)) {
      results.push(item)
    }

    if (results.length >= limit) {
      return results
    }
  })

  return results
}
