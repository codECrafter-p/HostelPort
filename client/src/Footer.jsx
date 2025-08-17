import React from "react";
import "./css/Footer.css";
import { Link } from "react-router-dom";
import logo from "./icons/logoHostel.png";
// import { useNavigate } from "react-router-dom";

function Footer() {
  // const navigate=useNavigate();
  // console.log("navigate function: ", navigate);
  return (
    <div className="footer1">
      <div className="dest-section">
        <div className="dest-heading">DESTINATION</div>
        <div className="dest-line"></div>
      </div>
      <div className="dest">
        <ul>
          <li>
            {/* <button onClick={()=>navigate('/desthostel',{ state:{hostelCity:"Bokaro" } })}> Bokaro</button> */}
            <Link to="/desthostel">Bokaro</Link>
          </li>
          <li>
            <Link to="/desthostel"> Dhanbad</Link>
          </li>
          <li>
            <Link to="/desthostel"> Hazaribagh</Link>
          </li>
          <li>
            <Link to="/desthostel"> Jamshedpur</Link>
          </li>
          <li>
            <Link to="/desthostel"> Ranchi</Link>
          </li>
        </ul>
      </div>

      <div className="footer2">
        <div className="list1">
          <div>
            <a href="">
              <img src={logo} alt="" className="hotelLogo" />
            </a>
          </div>
          <div className="sm">
            <a href="">
              <i class="bi bi-envelope"></i>
            </a>
            <a href="">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="">
              <i class="bi bi-youtube"></i>
            </a>
            <a href="">
              <i class="bi bi-instagram"></i>
            </a>
          </div>
        </div>
        <hr />
        <div className="list2">
          <div className="c1">
            <h3>Accomodations</h3>
            <Link to="/desthostel">Destinations</Link>
            <Link to="/namehostel">Hostels</Link>
            <Link to="/namehostel">WorkSpace</Link>
          </div>
          <div className="c2">
            <h3>Important Links</h3>
            <Link to="/">Developers & owners</Link>
            <Link to="/">Influencer</Link>
            <Link to="/">Media</Link>
          </div>
          <div className="c3">
            <h3 style={{ marginTop: "30px" }}>Policies</h3>
            <Link to="/">Guest Policies</Link>
            <Link to="/">Privacy Policies</Link>
            <Link to="/">refund Policy</Link>
            <Link to="/">Terms & Conditions</Link>
          </div>
          <div className="c4">
            <h3 style={{ marginTop: "20px" }}>Contact details</h3>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact us</Link>
            <Link to="/">
              <i class="bi bi-whatsapp"></i> <i class="bi bi-telephone"></i> +91
              2345678901
              <br />
              (Timing: 10am - 12am)
            </Link>
          </div>
        </div>
        <hr />
        <div className="res">
          <p>
            The Hostelport Hospitality Private Limited &copy 2025 All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
