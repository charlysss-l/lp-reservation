
import {NavLink} from 'react-router-dom'
import './Login.css'
const Login = () => {
  return (
    <div className="login-container">
       <h1 className="login-title">Login</h1>
       <input type="text" name="username" className="login-input" placeholder="username" required />
       <input type="text" name="password" className="login-input"  placeholder="password" required />
       <div className="button">
            <NavLink to={'/home'} className="login-button">Login</NavLink>
            </div>
    </div>
  )
}

export default Login