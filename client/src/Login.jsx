import React, { useState } from "react";
import "./css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// const API = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleChangeEmail = (event) => {
    setemail(event.target.value);
    console.log(event.target.value);
  };

  const handleChangePassword = (event) => {
    setpassword(event.target.value);
    console.log(event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    // const result = await axios.post(`${API}/login`, {
      // const result = await axios.post("http://localhost:5000/login", {
      const result = await axios.post("${import.meta.env.VITE_API_URL}/login", {
      email,
      password,
    });

    if (result.data.message === "success") {

      const userData = result.data.user;
        // Extract required fields for Razorpay prefill
      const loggedInUser = {
        name: userData.name,
        email: userData.email,
        phoneno: userData.phoneno, // make sure backend sends this
      };
     
     // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(result.data.user));

      localStorage.setItem("token", result.data.token);
      
        navigate(location.state?.from || "/home");
      // const userData = result.data.user;
      alert(result.data.message);

    } else if (result.data.message === "incorrect") {
      alert("Password is incorrect");
    } else if (result.data.message === "not exist") {
      alert("User not exist");
    }
  };
  return (
    <div className="login-container">
      
        <h1>Welcome Back <span><Link to="/home" style={{marginLeft:'70px', fontSize:'20px', color:'#e83e5a'}}><i class="bi bi-x-circle"></i></Link></span></h1>
        <p className="subtitle">ohai traveller, great to seee you again! </p>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={handleChangeEmail} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handleChangePassword} />
        <button onClick={handleClick}>Login</button>
        <div className="forgot-password">
         <a href="">Forgot Password </a> <h3>Login</h3>{" "}
        </div>
        <div className="signup-text">
          Don't have an account? <Link to="/signup">Create account</Link>
        </div>
       <div className="divider">
         <span className="line"></span>
        <span className="or">OR</span>
        <span className="line"></span>
       </div>
        <div className="social-buttons">
          <div className="gimg">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="google" />
        </div>
        <div className="fimg">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="facebook" />
        </div>
        </div>
      
    </div>
  );
}

export default Login;
