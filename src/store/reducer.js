import { combineReducers } from 'redux'
import { CHAT_WITH, SET_USER, SET_USERS, SET_MESSAGES } from './types'

const initialState = {
  chatWith: null,
  user: null,
  loading: false,
  users: [],
  messages: [],
}

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHAT_WITH:
      return {
        ...state,
        chatWith: payload,
      }
    case SET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      }
    case SET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      }
    case SET_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false,
      }

    default:
      return state
  }
}

const RootReducer = combineReducers({
  user,
})
export default RootReducer
