import { withChannel } from '../reducers/channels'
import { camelize, listToObject } from '../helpers/data'

export const fetchPublicRooms = () => (dispatch, getState) => {
  return withChannel(getState, 'rooms', (channel) => {
    return channel
      .push('rooms:public')
      .receive('ok', (data) => (
        dispatch(replacePublicRooms(data.rooms))
      ))
  })
}

export const addPublicRoom = (room) => ({
  type: 'ADD_PUBLIC_ROOM',
  room: camelize(room)
})

export const replacePublicRooms = (values) => {
  const cased = camelize(values)
  const asObject = listToObject(cased, 'slug')

  return {
    type: 'REPLACE_PUBLIC_ROOMS',
    rooms: asObject
  }
}
