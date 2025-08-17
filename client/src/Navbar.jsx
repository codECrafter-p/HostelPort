import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import { useState } from "react";
// import logo from "./icons/logoHostel.png";
// import logo from './icons/hotel-sign-svgrepo-com.svg'

{
  /* <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/> */
}

function Navbar() {
  //  const [showHostelDropdown, setShowHostelDropdown] = useState(false);

  //   const hostelDropdown = () => {
  //     setShowHostelDropdown(!showHostelDropdown);
  //   };

  //   const [showDestDropdown, setShowDestDropdown] = useState(false);

  //   const destinationDropdown = () => {
  //     setShowDestDropdown(!showDestDropdown);
  //   };

  //     const [showSettingDropdown, setShowSettingDropdown] = useState(false);

  //   const settingDropdown = () => {
  //     setShowSettingDropdown(!showSettingDropdown);
  //   };

  //    const [showSharingDropdown, setShowSharingDropdown] = useState(false);

  //   const sharingDropdown = () => {
  //     setShowSharingDropdown(!showSharingDropdown);
  //   };
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };
  return (
    <div className="navbar">
      <div>
        <h1 className="logo">HostelPort</h1>
      </div>
      <nav>
        <ul>
          <li className="dropdown">
            <button onClick={() => toggleDropdown("hostel")}>
              hostels <i class="bi bi-chevron-down"></i>
            </button>
            {openDropdown === "hostel" && (
              <div className="dropdown-menu">
                <div className="column">
                  <Link to="/details/68899ada79a2298386c2e275">Amit Lodge</Link>
                  <Link to="/details/6889a77279a2298386c2e276">Anna Lodge</Link>
                  <a href="">Aakashdip Boys Hostel</a>
                </div>
                <div className="column">
                  <a href="">Dr. Bhimrao Ambedkar</a>
                  <a href="">Guru Kripa Niketan</a>
                  <a href="">Gupta Lodge</a>
                </div>
                <div className="column">
                  <a href="">Impact Girls Hostel</a>
                  <a href="">Kumar Boy's Hostel</a>
                  <a href="">Maa Bhadrakali Boys Hostel</a>
                </div>
              </div>
            )}
          </li>

          <li className="dropdown">
            <button onClick={() => toggleDropdown("destination")}>
              Destination <i class="bi bi-chevron-down"></i>
            </button>
            {openDropdown === "destination" && (
              <div className="dropdown-menu">
                <div className="column">
                  <Link to="/desthostel">Hazaribagh</Link>
                  <Link to="/">Dhanbad</Link>
                  <Link to="/">Ranchi</Link>
                  <Link to="/">bokaro</Link>
                  <Link to="/">Jamshedpur</Link>
                </div>
              </div>
            )}
          </li>

          <li>
            <button>
              <Link to="/about">About Us</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/contact">Contact Us</Link>
            </button>
          </li>

          <li className="dropdown twoicon">
            <button onClick={() => toggleDropdown("setting")}>
              <i class="bi bi-list" style={{ margin: "3px" }}></i>
              <i class="bi bi-person-circle"></i>

              {openDropdown === "setting" && (
                <div className="dropdown-menu">
                  <div className="column">
                    <Link to="/profile">Profile</Link>
                    <hr />
                    <Link to="/signup">SignUp</Link>
                    <Link to="/login">Login</Link>
                  </div>
                </div>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;