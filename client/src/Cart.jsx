import React from "react";
import "./css/Cart.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import cartImage from "./images/cart1.png";
import cartImage2 from "./images/cart2.png";
import cartImage3 from "./images/cart3.png";
import cartImage4 from "./images/cart4.png";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Navbar1 from "./Navbar1";
import Front from "./Front";
import Footer from "./Footer";

const API = process.env.REACT_APP_API_BASE_URL;

function Cart() {

  const [data, setdata] = useState([]);

  const navigate = useNavigate();


  const getData = async () => {
    // const result = await axios.get(`${API}/hosteldetails/`);
    const result = await axios.get(`http://localhost:5000/hosteldetails/`);
    setdata(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    getData();
  }, []);



  const goToDetailsPage = (hostelid) => {
    navigate(`/details/${hostelid}`);
  };



  return (
    <div>

      <Navbar />
      <Front />
      <Navbar1 />
      <h1 className="pop">HostelPort New Launches</h1>
      <div className="collection">
        {data.map((hostel, i) => (
          <div
            className="hostelDiv"
            id="1"
            onClick={() => {
              goToDetailsPage(hostel._id);
            }}
          >
            <div
              className="hostelImage i1"
              style={{ backgroundImage: `url(${hostel.hostelImage})` }}
            >
              <div className="l">New Launch</div>
              <div>
                <i class="bi bi-box-arrow-in-down"></i>
              </div>
            </div>
            <div className="downArrow">
              <div>
                <h3>{hostel.hostelTitle}</h3>
                <h3>{hostel.hostelCity}</h3>

                <p>{hostel.hostelPrice}</p>
              </div>
              <div>
                <i class="bi bi-arrow-up-right-circle-fill"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1>OFFERS FOR YOU</h1>
      <div className="collection2">
        <div>
          <img src={cartImage} alt="cart1" />
        </div>

        <div>
          <img src={cartImage2} alt="cart2" />
        </div>
        <div></div>
      </div>

      <h1>GROW WITH US</h1>
      <div className="collection3">
        <div>
          <img src={cartImage3} alt="cart3" />
        </div>

        <div>
          <img src={cartImage4} alt="cart4" />
        </div>
        <div></div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
