import React, { useState } from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./css/Profilepage.css";
import Navbar from "./Navbar";

function Profilepage() {
  const [selected, setSelected] = useState("personaldetails");

  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div className="profile" style={{ padding: "0px" }}>
      <Navbar />

      {/* Clickable Words */}
      <ul
        className="click"
        style={{
          display: "flex",
          gap: "20px",
          listStyle: "none",
          cursor: "pointer",
        }}
      >
        <Link to="/home">
          <i class="bi bi-arrow-left"></i>
        </Link>
        <li onClick={() => setSelected("personaldetails")}>Personal Details</li>
        <li onClick={() => setSelected("history")}>History</li>
        <li onClick={() => setSelected("wishlist")}>WishList</li>
        <li>
          <Link to="/home">Logout</Link>
        </li>
      </ul>

      {/* Content based on selection */}
      <div className="box" style={{ marginTop: "20px" }}>
        {selected === "personaldetails" && (
          <div>
            <h2 className="heading">Personal Details</h2>
            {/* <input type="file" /> */}
            <p>Edit your Profile</p>
            {/* <h3>Name:  <i>{name}</i></h3> */}
            <h3>
              Email: <i>{email}</i>
            </h3>
            <Link to="/">Reset Padssword</Link>
          </div>
        )}
        {selected === "history" && (
          <div>
            <h2 className="heading">History</h2>
            <p>Your Booking History Here...</p>
          </div>
        )}
        {selected === "wishlist" && (
          <div>
            <h2 className="heading">WishList</h2>
            <p>Your wishlist here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profilepage;
