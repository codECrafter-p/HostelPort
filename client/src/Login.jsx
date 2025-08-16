import React, { useState } from "react";
import "./css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

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
    const result = await axios.post(`${API}/login`, {
      email,
      password,
    });

    if (result.data.message === "success") {
           localStorage.setItem("token", result.data.token);
      const userData = result.data.user;
      // console.log("user information:",userData);
      alert(result.data.message);
      // navigate("/homee",{state:{user:userData}});

      // navigate("/home");
    

      navigate("/profile", {
        state: {
          email: email,
        },
       
      });
    } else if (result.data.message === "incorrect") {
      alert("Password is incorrect");
    } else if (result.data.message === "not exist") {
      alert("User not exist");
    }

   

  };

  return (
    <div className="login-container">
      
        <h1>Welcome Back</h1>
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
          Don't have an account? <a href="">Create account</a>
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
