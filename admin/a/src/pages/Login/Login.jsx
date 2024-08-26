
import { NavLink } from 'react-router-dom';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
}

const handleSubmitButton = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    localStorage.setItem("token", result.token)
    console.log(result);
    navigate('/home');
    alert('successfully log (logged?) in')
  } catch (error) {
    console.error("Error: ", error);
    alert('invalid credentials')
  }
};

  return (
    <>
      <section className='containerr'>
        <div>Login</div>
        <div className="content">
        <form>
          <div className="input-box">
            <label htmlFor="">Email</label>
          <input type="email" name='email' placeholder='email' onChange={changeHandler} value={formData.email}/>
          </div>
          <div className="input-box">
            <label htmlFor="">Password</label>
          <input type="password" name='password' placeholder='password' onChange={changeHandler} value={formData.password}/>
          </div>
          {/* or navlink? IDK :< */}
          {/* {onClick={(e) => {handleSubmitButton(e)}} pwede sa button or sa form since submit type naman yung button basta nasa loob ng form} */}
          <button type='submit' onClick={(e) => {handleSubmitButton(e)}}>Login</button>
        </form>
        </div>
      </section>
    </>
  );
};

export default Login;


{/* <div className="container">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <input type="text" name="username" className="login-input" placeholder="Username" required />
        <input type="password" name="password" className="login-input" placeholder="Password" required />
        <div className="button">
          <NavLink to='/home' className="login-button">Login</NavLink>
        </div>
      </div>
    </div> */}