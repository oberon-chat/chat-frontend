const initialState = {}

export const roomSubscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROOM_SUBSCRIPTIONS':
      return action.subscriptions
    default:
      return state
  }
}

export const getSubscriptions = (state) => state.roomSubscriptions || {}
export const getRooms = (state) => true
export const isSubscribed = (state, room) => true

export default roomSubscriptionsReducer

