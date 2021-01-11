import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ListItem from '../components/ListItem'
import { fetchTodos } from '../redux/actions/index'
import { useDispatch, useSelector} from 'react-redux'

const TasksPage = () => {
  const dispatch = useDispatch()
  const [todoText, setTodoText] = useState('')

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newTodo = await axios({
        method: 'post',
        url: `http://localhost:4000/todos`,
        data: {
          title: todoText
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
      }
      })
      dispatch(fetchTodos())
    } catch(e) {
      
    }
  }

  const handleChange = (e) => {
    setTodoText(e.target.value)
  }


  const todos = useSelector(state => state.todos.todos)
  return (
    <div>
      <Navbar />
      <div className='container text-center mt-5 pt-5 border shadow-sm bg-white w-75'>
        <h2 className="text-muted">What's on today?</h2>
        <form className='form-inline' onSubmit={handleSubmit}>
          <div class="form-group mb-5 form-inline">
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Add task!" onChange={handleChange}/>
            <button type="submit" class="btn btn-primary  mt-2">Submit</button>
          </div>
        </form>
      </div>
      {todos.length > 0 &&  
      <ul className='container mt-5  border shadow-sm w-75 bg-white'>
        {todos.map((todoItem, key) => {
         return <ListItem key={key} id={todoItem._id} title={todoItem.title} completed={todoItem.completed}/>
        })}
      </ul>
      }
    </div>
  )
}


export default TasksPage

