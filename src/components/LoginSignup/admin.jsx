import React, { useState,useEffect } from "react";
import './LoginSignup.css'
import axios from "axios";
import Cookies from 'js-cookie';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  
    
    

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToSignup = () => {
    setIsLogin(false);
  };
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/signin', {
      Username: username,
      Password: password,
    });

    // Handle success response here
    console.log(response.data);

    Cookies.set('user_id', response.data.user_id);
    Cookies.set('role_id', response.data.role_id);

    // Redirect based on role_id
  

  } catch (error) {
    // Handle error here
    console.error('Error:', error.response.data);
  }
};

// Helper function to redirect based on role_id



    const handleSignup = async (e) => {
        e.preventDefault();
    
        // Additional signup logic if needed
    
        try {
          // Example: Call a signup API endpoint
          const response = await axios.post("http://localhost:5000/signup", {
            Username: username,
            Password: password,
          });
    
          // Handle success response for signup
          console.log("Signup Success:", response.data);
        } catch (error) {
          // Handle error for signup
          console.error("Signup Error:", error.response.data);
        }
      };
  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLogin ? 'login' : 'signup'}`}> {isLogin ? 'Login Form' : 'Signup Form'}</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={isLogin} onChange={switchToLogin} />
          <input type="radio" name="slide" id="signup" checked={!isLogin} onChange={switchToSignup} />
          <label htmlFor="login" className="slide login">Login</label>
          <label htmlFor="signup" className="slide signup">Signup</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form onSubmit={isLogin ? handleLogin : handleSignup} className={isLogin ? 'login' : 'signup'}>
          <div className="field">
    <input type="text" placeholder="Email Address" value={username} onChange={(e) => setUsername(e.target.value)} required />
  </div>
  <div className="field">
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  </div>
  {!isLogin && (
    <div className="field">
      <input type="password" placeholder="Confirm password"  required />
    </div>
  )}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value={isLogin ? 'Login' : 'Signup'} />
            </div>
            {!isLogin && (
              <div className="signup-link">Already a member? <a href="#" onClick={switchToLogin}>Login now</a></div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
