const initialState = {
  clientType: null
}

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CLIENT_TYPE':
      return {
        ...state,
        clientType: action.clientType
      }
    default:
      return state
  }
}

export const getClientType = (state) => (state.client || {}).clientType
export const isClientType = (state, key) => getClientType(state) === key

export default clientReducer
