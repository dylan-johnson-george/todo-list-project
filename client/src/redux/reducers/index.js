import isAuthenticatedReducer from './isAuthenticated'
import getTodosReducer from './getTodosReducer'
import  { combineReducers } from 'redux'

const allReducers = combineReducers({
  isAuthenticated: isAuthenticatedReducer,
  todos: getTodosReducer
})

export default allReducers
