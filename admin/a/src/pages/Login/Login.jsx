import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.ok) {
        localStorage.setItem("token", result.token);
        console.log(result);
        navigate('/home');
        toast.success('🦄 Successfully logged in!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error('🦄 Invalid credentials!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <section className='container'>
        <div className="login-container">
          <div className="login-title">Login</div>
          <form onSubmit={handleSubmitButton}>
            <input
              type="email"
              name='email'
              placeholder='email'
              onChange={changeHandler}
              value={formData.email}
              className="login-input"
              required
            />
            <input
              type="password"
              name='password'
              placeholder='password'
              onChange={changeHandler}
              value={formData.password}
              className="login-input"
              required
            />
            <button type='submit' className="login-button">Login</button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
