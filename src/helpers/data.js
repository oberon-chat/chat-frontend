import { camelizeKeys } from 'humps'
import { isArray, map, reduce } from 'lodash'

const camelizeObject = (data) => camelizeKeys(data, {})
const camelizeList = (data) => map(data, (item) => camelizeObject(item))

export const camelize = (data) => isArray(data) ? camelizeList(data) : camelizeObject(data)

export const listToObject = (list) => (
  reduce(list, (acc, item) => {
    acc[item.id] = item

    return acc
  }, {})
)
