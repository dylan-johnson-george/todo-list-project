
const initialState = {
  todos: [],
  loading: false,
  error: ''
}

const getTodosReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_TODOS_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_TODOS_SUCCESS':
      return {
        ...state,
        todos: action.payload,
        error: ''
      }
    case 'FETCH_TODOS_ERROR':
      return {
        loading: false,
        todos: [],
        error: action.payload
      }
    default: return state
  }
}


export default getTodosReducer