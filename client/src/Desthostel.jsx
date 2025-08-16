import React from "react";
import "./css/Cart.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_BASE_URL;

function Desthostel() {
  const [data, setdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const getData = async () => {
    const result = await axios.get("${API}/hosteldetails");
    setdata(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const goToDetailsPage = (hostelid) => {
    navigate(`/details/${hostelid}`);
  };

  const filteredData = data.filter((hostel) =>
    hostel.hostelCity?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {/* <h1 className="pop">HostelPort New Launches</h1> */}
      {/* 🔍 Search Bar */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search by city name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            border: "1px solid gray",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />
      </div>
      <div className="collection">
        {filteredData.map((hostel, i) => (
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
    </div>
  );
}

export default Desthostel;