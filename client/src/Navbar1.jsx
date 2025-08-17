import React from "react";
import "./css/Navbar1.css";
import hostel from "./icons/hostel-icon.svg";
import hostelDest from "./icons/hostel-dest.svg";
import colive from "./icons/colive.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const API = process.env.REACT_APP_API_BASE_URL;

function Navbar1() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };
  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleBooking = () => {
    if (!startDate && !endDate) {
      // if (!bookedStartDate || !bookedEndDate) {
      alert("Please choose check-in and check-out dates first.");
      return;
    }
    if (!selectedHostelId) {
      alert("Please select a hostel first.");
      return;
    }

    const bookedStartDate = startDate.toDateString();
    const bookedEndDate = endDate.toDateString();

    alert(
      "Booked Start date " +
        bookedStartDate +
        " Booked End Date" +
        bookedEndDate
    );

    // Navigate to hostel detail page with state
    navigate(`/details/${selectedHostelId}`, {
      state: {
        checkIn: bookedStartDate,
        checkOut: bookedEndDate,
      },
    });

    // }
  };

  const [selected, setSelected] = useState("hostel");

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [selectedHostelId, setSelectedHostelId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/hosteldetails/`)
      .then((res) => setHostels(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    const filtered = hostels.filter((h) =>
      h.hostelTitle.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);

    const filtered2 = hostels.filter((h) =>
      h.hostelCity.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions2(filtered2);
  };

  const handleSuggestionClick = (hostel) => {
    setSearchTerm(hostel.hostelTitle);
    setSelectedHostelId(hostel._id);
    setSuggestions([]);
    // navigate(`/details/${hostelId}`);
  };

  const handleSuggestion2Click = (hostel) => {
    setSearchTerm(hostel.hostelCity);
    setSelectedHostelId(hostel._id);
    setSuggestions2([]);
  };

  return (
    <div className="navbar1">
      <button onClick={() => setSelected("hostel")}>
        <img src={hostel} alt="" />
        Hostels
      </button>
      <button onClick={() => setSelected("destination")}>
        <img src={hostelDest} alt="" />
        Destination
      </button>
      <button onClick={() => setSelected("colive")}>
        <img src={colive} alt="" />
        Colive
      </button>

      {selected === "hostel" && (
        <div>
          <div className="wdiv">
            <div className="box box1">
              <h3>Select Your Hostel</h3>
              <input
                type="text"
                placeholder="E.g:Hzb"
                value={searchTerm}
                onChange={handleSearchChange}
              />

              {searchTerm && suggestions.length > 0 && (
                <ul className="suggestion-list">
                  {suggestions.map((s, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(s)}
                      style={{
                        cursor: "pointer",
                        padding: "2px 5px",
                        width: "auto",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        listStyle: "none",
                        borderBottom: "1px solid #ccc",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ddd")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      {s.hostelTitle}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="box box2">
              <h3>Check in</h3>
              <DatePicker
                selected={startDate}
                onChange={handleStartChange}
                startDate={startDate}
                placeholderText="select start date"
                minDate={new Date()}
              />
            </div>
            <div className="box box3">
              <h3>Check out</h3>
              <DatePicker
                selected={endDate}
                onChange={handleEndChange}
                startDate={startDate}
                endDate={endDate}
                placeholderText="select end date"
                minDate={startDate || new Date()}
                disabled={!startDate}
              />
            </div>
            <div className="box box4">
              <button onClick={handleBooking}>Book</button>
            </div>
          </div>
        </div>
      )}

      {selected === "destination" && (
        <div>
          <div className="wdiv">
            <div className="box box1">
              <h3>Select Your Destination</h3>
              <input
                type="text"
                placeholder="E.g:Hzb"
                value={searchTerm}
                onChange={handleSearchChange}
              />

              {searchTerm && suggestions2.length > 0 && (
                <ul className="suggestion-list">
                  {suggestions2.map((s, index) => (
                    <li key={index} onClick={() => handleSuggestion2Click(s)}    style={{
                        cursor: "pointer",
                        padding: "2px 5px",
                        width: "auto",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        listStyle: "none",
                        borderBottom: "1px solid #ccc",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ddd")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }>
                      {s.hostelCity}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="box box2">
              <h3>Check in</h3>
              <DatePicker
                selected={startDate}
                onChange={handleStartChange}
                startDate={startDate}
                placeholderText="select start date"
                minDate={new Date()}
              />
            </div>
            <div className="box box3">
              <h3>Check out</h3>
              <DatePicker
                selected={endDate}
                onChange={handleEndChange}
                startDate={startDate}
                endDate={endDate}
                placeholderText="select end date"
                minDate={startDate || new Date()}
                disabled={!startDate}
              />
            </div>
            <div className="box box4">
              <button onClick={handleBooking}>Book</button>
            </div>
          </div>
        </div>
      )}

      {selected === "colive" && (
        <div>
          <div className="wdiv">
            <div className="box box1">
              <h3>Select Your Hostel</h3>
              <input type="text" placeholder="E.g:Hzb" />
            </div>
            <div className="box box2">
              <h3>Check in</h3>
              <DatePicker
                selected={startDate}
                onChange={handleStartChange}
                startDate={startDate}
                placeholderText="select start date"
                minDate={new Date()}
              />
            </div>
            <div className="box box3">
              <h3>Check out</h3>
              <DatePicker
                selected={endDate}
                onChange={handleEndChange}
                startDate={startDate}
                endDate={endDate}
                placeholderText="select end date"
                minDate={startDate || new Date()}
                disabled={!startDate}
              />
            </div>
            <div className="box box4">
              <button onClick={handleBooking}>Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar1;
