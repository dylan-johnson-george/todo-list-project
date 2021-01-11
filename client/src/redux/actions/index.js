import axios from 'axios'

export const logIn = () => {
  return {
    type: 'LOGIN'
  }
}

export const logOut = () => {
  return {
    type: 'LOGOUT'
  }
}

export const fetchTodosRequest = () => {
  return {
    type: 'FETCH_TODOS_REQUEST'
  }
}


export const fetchTodosSuccess = todos => {
  return {
    type: 'FETCH_TODOS_SUCCESS',
    payload: todos
  }
}

export const fetchTodosError = error => {
  return {
    type: 'FETCH_TODOS_ERROR',
    payload: error
  }
}


export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(fetchTodosRequest)
    axios.get(`http://localhost:4000/todos`, {withCredentials: true})
    .then(response => {
      const todos = response.data
      dispatch(fetchTodosSuccess(todos))
    })
    .catch(error => {
      dispatch(fetchTodosError(error))
    })
  }
}