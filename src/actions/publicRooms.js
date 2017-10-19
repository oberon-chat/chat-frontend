import { getRoomsChannel } from '../reducers/rooms'
import { camelize, listToObject } from '../helpers/data'

export const fetchPublicRooms = (slug, message) => (dispatch, getState) => {
  const channel = getRoomsChannel(getState())

  return channel
    .push('rooms:public')
    .receive('ok', (data) => (
      dispatch(replacePublicRooms(data.rooms))
    ))
}

export const replacePublicRooms = (values) => {
  const cased = camelize(values)
  const asObject = listToObject(cased, 'slug')

  return {
    type: 'REPLACE_PUBLIC_ROOMS',
    rooms: asObject
  }
}
