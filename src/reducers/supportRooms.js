const initialState = {}

export const supportRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SUPPORT_ROOMS':
      return action.rooms
    default:
      return state
  }
}

export const getSupportRooms = (state) => state.rooms || {}
export const getSupportRoom = (state, key) => getSupportRooms(state)[key]

export default supportRoomsReducer
