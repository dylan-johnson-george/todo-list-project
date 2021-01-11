import googleImage from '../images/btn_google_signin_dark_normal_web.png'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'


const LoginCard = (props) => {

  const history = useHistory()
  const isUserLoggedIn = useSelector(state => state.isAuthenticated)
  
  useEffect(() => {
    if(isUserLoggedIn) {
      history.push('tasks')
    }
  })

  
  return (
    <div className='container text-center mt-5 pt-5 border shadow-sm bg-white'>
      <h1 className="display-4">{props.title}</h1>
      <p className='lead'>Log in now to create lists and easily manage your day!</p>
      <a href='/auth/google'>
        <img alt='google sign in button' src={googleImage} className='mb-5 cursor-pointer'/>
      </a>
    </div>
  )
}

export default LoginCard
