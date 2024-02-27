import React, { useState } from "react";
import './LoginSignup.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const LoginSignup = () => {
  const [errorAlert, setErrorAlert] = useState(null);
  const navigate = useNavigate(); 
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
    }
    );
    console.log(response);
    <Link to={`/mentor/${username}`} />
    if (response.status === 200 && response.data.role_id === 1) {
      navigate('/admin'); // Use navigate instead of history.push
    }
    if (response.status === 200 && response.data.role_id === 2) {
      navigate(`/mentor/${username}`); // Use navigate instead of history.push
    }
  } catch (error) {
    // Handle error here
    console.error('Error:', error.response ? error.response.data : error.message)
    setErrorAlert(error.response.data.message);
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
          setErrorAlert(error.response.data.message);
        }
      };
  return (
   
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLogin ? 'login' : 'signup'}`}> {isLogin ? 'Login Form' : 'Signup Form'}</div>
      </div>
      <div>
    {errorAlert && (
      <div className="alert alert-danger" role="alert">
        {errorAlert}
      </div>
    )}
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
    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
