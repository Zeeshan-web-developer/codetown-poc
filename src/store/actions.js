import { CHAT_WITH, SET_USER, SET_USERS, SET_MESSAGES } from './types'

export const chatWith = (user) => ({
  type: CHAT_WITH,
  payload: user,
})
export const setUser = (payload) => ({
  type: SET_USER,
  payload,
})

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
})

export const setAllMEssages = (payload) => ({
  type: SET_MESSAGES,
  payload,
})
