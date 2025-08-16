import React from "react";
import './css/About.css'
import aboutbanner from './images/AboutusBanner-.svg';
import Footer from "./Footer";
import Navbar from "./Navbar";


function About() {
  return (
    <div className="about-container">
      <Navbar/>
      <div className="main">
        <h1>India's most preferred backpacker hostel chain</h1>
        <p>
          The Hostelport began in 2025 with a simple vision - to create amazing,
          affordable & accessible backpacker hostels all around India for 'young
          at heart' travellers. We work towards building experiences for our
          community of travellers thereby creating ever lasting backpacking
          memories.
        </p>
      </div>
      <div className="image-container">
      
          <img src={aboutbanner} alt="" /> 
      </div>
      <Footer/>
    </div>
  );
}

export default About;
