import { useEffect } from 'react'
import { logIn, logOut } from './redux/actions'
import { useDispatch, useSelector} from 'react-redux'
import LoginPage from '../src/containers/LoginPage'
import axios from 'axios'
import { Route, Switch, useHistory } from 'react-router-dom' 
import TasksPage from './containers/TasksPage'
import serverDomain from './utils.js/serverDomain'

function App() {  
  const isUserLoggedIn = useSelector(state => state.isAuthenticated)
// Come back to look into how to fix the dependency warning
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userStatus = await axios.get(`/current_user`, {
          withCredentials: true,
        })
        
        if(userStatus.data.googleId && !isUserLoggedIn) {
          dispatch(logIn()) 
        } else {
          dispatch(logOut())
          history.push('/')
        }
      } catch(e) {
         console.log(e)
      } 
    }
    checkAuthentication()
  }, [])


  return (
    <div className="App">
      <Switch>
        <Route path='/' component={LoginPage} exact /> 
        <Route path='/tasks' component={TasksPage} />
      </Switch>
    </div>
  );
}

export default App;
