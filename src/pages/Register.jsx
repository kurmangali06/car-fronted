import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Layout from '../componets/Layout'


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ username, setUsername] = useState()
  const [ password, setPassword] = useState()
  const [ confimPassword, setConfimPassword] = useState()
  


  const submitHandler =  async (e) => {
    e.preventDefault()
    
    dispatch({type: "LOADING", payload: true})

    if(password !== confimPassword) {
      toast.error('Password doesdnt mathc!')
      return;
    }

    try {
      
      await axios.post("https://car-server-node.vercel.app/api/users/register", {
        username,
        password,
      })
      toast.success('Registration Successfull!')
      dispatch({type: "LOADING", payload: false})
      navigate('/login')
    } catch (error) {
      console.log(error);
      toast.error("Error, Try again!")
      dispatch({type: "LOADING", payload: false})
    }
  }
  useEffect(() => {
    if(localStorage.getItem('userinfo')) {
      localStorage.getItem("userinfo");
      navigate('/')
    }
  })
  
  return (
    <Layout>
            <div className="form-container">
        <div className="form-groups">
          <form className='form' onSubmit={submitHandler} >
            <h3 className='form-title'>Rigister</h3>
            <div className="form-group">
            <label htmlFor="username">Username</label>
              <input type="text" onChange={e => setUsername(e.target.value)} id='username' required  className='input' />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"  onChange={e => setPassword(e.target.value)} id='password' className='input' required />
              </div>
              <div className="form-group">
              <label htmlFor="rpassword">Retype Password</label>
              <input type="password"  onChange={e => setConfimPassword(e.target.value)} id='rpassword' className='input' required />
              </div>
              <div className="form-group">
              <button  className='rent-now'>Rigister</button>
              </div>
              <div className="form-group">
              <p>You have an account? <a className='form-link' href="/login">Here for Login</a></p>
              </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register