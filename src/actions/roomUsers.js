export const updateRoomUsers = (room, users) => ({
  type: 'UPDATE_ROOM_USERS',
  key: room,
  users: users
})
