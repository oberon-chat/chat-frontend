import join from 'url-join'
import parser from 'url-parse'
import qs from 'qs'
import { isObject, trim } from 'lodash'

export const queryString = () => {
  const raw = parser(window.location).query || ''
  const trimmed = trim(raw, '?')

  return qs.parse(trimmed) || {}
}

export const url = (path = '/') => (
  join(parser(window.location).origin, path)
)

export const newRoomPath = () => '/new-room'

export const searchRoomsPath = (room) => join('/search-rooms')

export const roomPath = (room) => join('/rooms/', isObject(room) ? room.slug : room)

export const editMessagePath = (room, id) => (
  join(roomPath(room), '/messages/', id, '/edit')
)

export default url
