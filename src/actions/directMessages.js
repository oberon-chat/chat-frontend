import { getRoomsChannel } from '../reducers/rooms'

export const createDirectMessage = (userId, onSuccess, onError) => (dispatch, getState) => {
  const channel = getRoomsChannel(getState())

  return channel
    .push('rooms:create', {'type': 'direct', 'user_id': userId})
    .receive('ok', (response) => onSuccess && onSuccess(response))
    .receive('error', (response) => onError && onError(response))
}
