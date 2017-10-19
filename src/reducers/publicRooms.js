const initialState = {}

export const publicRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REPLACE_PUBLIC_ROOMS':
      return action.rooms
    default:
      return state
  }
}

export const getPublicRooms = (state) => state.publicRooms
export const getPublicRoom = (state, key) => state.publicRooms[key] || {}

export default publicRoomsReducer
