import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Layout from '../componets/Layout'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')

  const submitHandler =  async (e) => {
    e.preventDefault()
    
    dispatch({type: "LOADING", payload: true})

    try {
      
       const {data} = await axios.post("https://car-server-node.vercel.app/api/users/login", {
        username,
        password,
      })
      localStorage.setItem('userinfo', JSON.stringify(data))
      toast.success('Login Successfull!')
      dispatch({type: "LOADING", payload: false})
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error("Invalid password or Username!")
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
          <form className='form ' onSubmit={submitHandler}>
            <h3 className='form-title'>Login</h3>
            <div className="form-group">
            <label htmlFor="username">Username</label>
              <input type="text" id='username' onChange={e => setUsername(e.target.value)} required  className='input' />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' onChange={e => setPassword(e.target.value)} className='input' required />
              </div>
              <div className="form-group">
              <button className='rent-now'>Login</button>
              </div>
              <div className="form-group">
              <p>Dont have an account? <a className='form-link' href="/register">Here for Register</a></p>
              </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login