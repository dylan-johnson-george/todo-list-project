import axios from 'axios'
import '../index.css'
import { fetchTodos } from '../redux/actions/index'
import { useDispatch } from 'react-redux'

const ListItem = (props) => {

  const dispatch = useDispatch()

  const clickToComplete = async (e) => {    
    await axios({
      method: 'put',
      url: `/todos`,
      data: {
        id: props.id

      },
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
    }
  })
  dispatch(fetchTodos())
}


  const clickToDelete = async () => {
    try {
      await axios({
        method: 'delete',
        url: `/todos`,
        data: {
          id: props.id
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
      }
    })
    dispatch(fetchTodos())
    } catch(e) {
      console.log(e)
    }
  }

  return (
  <li className='list-unstyled bg-white border p-2 m-2 rounded list-item shadow-sm '>
    <div>
      {!props.completed && 
      <i className='fas fa-check-circle complete-icon cursor-pointer' onClick={clickToComplete}></i> 
      } 
      <div>
      <p className={props.completed ? 'm-3 line-through d-inline' : 'm-3 d-inline' }>
        {props.title}
      </p>
      </div>
      <i className='fas fa-trash-alt float-right  cursor-pointer delete-icon' onClick={clickToDelete} i> </i>
    </div>
  </li>
  )
}

export default ListItem