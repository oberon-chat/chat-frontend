import { reduce } from 'lodash'

export const listToObject = (list) => (
  reduce(list, (acc, item) => {
    acc[item.id] = item

    return acc
  }, {})
)
