const initialState = {}

export const roomUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROOM_USERS':
      return {
        ...state,
        [action.key]: action.users
      }
    default:
      return state
  }
}

export const getRoomUsers = (state, slug) => state.roomUsers[slug] || {}

export default roomUsersReducer
