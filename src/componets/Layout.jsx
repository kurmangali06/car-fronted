import React from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Layout = (props) => {
  const navigate = useNavigate()
  const userInfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null

  const logoutHandler = () => {
    localStorage.removeItem('userinfo');
    toast.success('You have successfull logged out')
    navigate('/login')
  }
  return (
    <>
    <div className='header'>
      <div className='col'>
      <a href="/" className='logo'>Blog APP</a>
      </div>
      <div className='col'>
      <span className='name'>{userInfo?.username}</span>
      {userInfo ? ( 
        <span onClick={logoutHandler} className='logout'>Logout</span>
      ) : (<a href="/login" className='login'>Login</a>)}
      
      </div>
      
      
    </div>
    <div className='main'>
      {props.children}
    </div>
    <div className='footer'>
      <p>
        &copy;2022. All rights reserved. Powered  by Kurmangali
      </p>
    </div>
    </>
  )
}

export default Layout;