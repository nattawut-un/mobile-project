export const USER_CHANGE = 'USER_CHANGE'

const initialState = {
  user: null
}

export const saveUser = user => {
  // console.log('saveUser HIT:', user)
  return { type: USER_CHANGE, user }
}

const userReducer = (state = initialState, action) => {
  // console.log('userReducer HIT:', action)
  switch (action.type) {
    case USER_CHANGE:
      return { user: action.user }
    default:
      return state
  }
}

export default userReducer
