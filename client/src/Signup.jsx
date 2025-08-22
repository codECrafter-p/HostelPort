import React, { useState } from "react";
import "./css/Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";

// const API = process.env.REACT_APP_API_BASE_URL;

function Signup() {
  const [name, setname] = useState();
  const [phoneno, setphoneno] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const handleChangeName = (event) => {
    setname(event.target.value);
    console.log(event.target.value);
  };

  const handleChangePhoneno = (event) => {
    setphoneno(event.target.value);
    console.log(event.target.value);
  };

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

    // const signData = await axios.post(`${API}/signup`, {
    const signData = await axios.post("http://localhost:5000/signup", {
      name,
      phoneno,
      email,
      password,
    });
    alert("sign up successfully");
  };

  return (
    <div className="signup-container">
      
        <h1>Create account</h1>
        <p>Sign up for the best prices,offers and rewards</p>

       <form action="" className="signup-form">
         <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={handleChangeName} />
        <label htmlFor="phone">Phone Number</label>
        <input type="number" id="phone" onChange={handleChangePhoneno} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={handleChangeEmail} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={handleChangePassword} />
        <button className="signup-button" onClick={handleClick}>SIGN UP</button>
       </form>

        <p className="login-text">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
        
        <div className="divider">
         
        <span>OR</span>
      
       </div>
        <div className="social-buttons">
          <button className="google-btn">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="google" />
        </button>
        <button className="facebook-btn">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="facebook" />
        </button>
        </div>
     
      <p className="term-text">
        By registering, you agree with our <span className="link">terms and conditions</span> and
        <span className="link">privacy policy</span>.
      </p>
    </div>
  );
}

export default Signup;
