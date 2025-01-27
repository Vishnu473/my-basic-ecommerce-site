import React, { useEffect, useRef } from 'react';
import {checkUserCred} from '../Services/LoginApiService';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const usernameRef = useRef('');
  const pswdRef = useRef('');
  const navigator = useNavigate();

    const callLoginAPI = async(usernameVal, passwordVal) =>{
      try {
        console.log(usernameVal.value);
        console.log(passwordVal.value);

        // const result = await checkUserCred();
        fetch('https://dummyjson.com/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            
            username: usernameVal.value,
            password: passwordVal.value
          }),
        })
        .then(res => res.json())
        .then(console.log)
        .then(alert('Successfully logged in'))
        .then(navigator('/my-basic-ecommerce-site/'));
        
      } catch (error) {
        console.log(error);
      }
    };


    const handleLogin = (e) =>{
      console.log(e);
      console.log("validating.....");
      e.preventDefault();
      const user = usernameRef.current;
      const pwd = pswdRef.current;
      if(user && pwd){
        const result = callLoginAPI(user,pwd);
        if(!result){
          console.log("Success logged in");
          alert('Successfully logged in as ',result.username);
        }
      }
    }

  return (
    <>
    <div>
      <div>
        <h1>Login form</h1>
        <p>Login to get access to site:</p>
      </div>
      <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>UserName:</label>
        <input type='text' id='username' ref={usernameRef} placeholder='Vishnu Kishore' />
      </div>
      <div>
        <label htmlFor='pswd'>Password:</label>
        <input type='password' id='pswd' ref={pswdRef} placeholder='********' />
      </div>
      <div>
        <input type='submit' value='Login' />
      </div>
      </form>
    </div>
    </>
  )
}

export default Login