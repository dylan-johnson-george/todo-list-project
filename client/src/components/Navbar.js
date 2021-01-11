import '../index.css'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/actions/index'

const Navbar = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const logOutUser = async () => {
    try {
      const user = await axios.get('/logout', {
        withCredentials: true
      })
      if(user.data === '') {
        dispatch(logOut())
        history.push('/')
      }
    } catch(e) {
      console.log(e)
    }
  }

  const isUserLoggedIn = useSelector(state => state.isAuthenticated)

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm'>
      <div className='container-fluid'>
        <Link className="navbar-brand" to='/'>Task Manager</Link>
        {isUserLoggedIn &&
        <>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse justify-content-end' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item dropdown'>
                <a className='nav-link dropdown-toggle mr-5" href="#" id="navbarDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                  <i class='fas fa-users-cog user-icon'></i>
                </a>
                <ul class='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                  <li><Link to='/tasks' className='dropdown-item' >Tasks</Link></li>
                  <li className='dropdown-item' onClick={logOutUser}>Log out</li>
                </ul>
              </li>
            </ul>
          </div>
        </>
        }
      </div>
    </nav>    
  )
}

export default Navbar