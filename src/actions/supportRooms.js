import { Presence } from 'phoenix'
import { joinChannel } from './channels'
import { getSupportRoomsPresence } from '../reducers/supportRooms'

const updateSupportRooms = (rooms) => ({
  type: 'UPDATE_SUPPORT_ROOMS',
  rooms: rooms
})

export const joinSupportRoomsChannel = (onSuccess, onError) => (dispatch, getState) => {
  const key = 'support_rooms'
  const channelCallbacks = (channel) => {
    channel.on('support_rooms:state', (data) => {
      const current = getSupportRoomsPresence(getState())
      const updated = Presence.syncState(current, data)

      dispatch(updateSupportRooms(updated))
    })

    channel.on('support_rooms:diff', (data) => {
      const current = getSupportRoomsPresence(getState())
      const updated = Presence.syncDiff(current, data)

      dispatch(updateSupportRooms(updated))
    })

    return channel
  }

  return joinChannel(dispatch, getState, key, channelCallbacks, onSuccess, onError)
}
