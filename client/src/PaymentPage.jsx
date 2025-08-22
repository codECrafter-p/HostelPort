import React from "react";
import { useState } from "react";
import "./css/PaymentPage.css";
import { Link } from "react-router-dom";
import mastercard from "./rooms/mastercard.svg";
import maestro from "./rooms/maestro.svg";
import visa from "./rooms/visa.svg";
import carteBancaire from "./rooms/carteBancaire.svg";
import { useLocation } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PaymentPage() {


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


  const location = useLocation();
  const { checkIn, checkOut } = location.state || {};

  const [beds, setBeds] = useState(1); // default 1 bed
  const [persons, setPersons] = useState(1); // persons match beds

  const handleChange = (e) => {
    const value = parseInt(e.target.value);

    if (value >= 1) {
      setBeds(value);
      setPersons(value); // 1 bed = 1 person
    } else {
      alert("Minimum 1 bed required.");
    }
  };

  const [days, setDays] = useState(1);
  const [bookingday, setBookingDays] = useState(1);

  const handleDayChange = (e) => {
    const value = parseInt(e.target.value);

    if (value >= 1) {
      setDays(value);
      setBookingDays(value); // 1 bed = 1 person
    } else {
      alert("Minimum 1 day required.");
    }
  };

  //   const noofrooms=location.state?.roomno;
  const users = location.state?.rooms;
  const users1 = location.state?.title;
  const users2 = location.state?.bed;
  // const users3 = location.state?.checkIn;

  const loadrazorpay = () => {
    var options = {
      key: "rzp_test_1HcwRaiHACThCc", // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits.
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "<name>", //your customer's name
        email: "<email>",
        contact: "<phone>", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="paymentpage">

    <h1 style={{marginLeft:'60px'}}>Book Now...</h1>

      <div className="dates">
        {/* <h1>{users}</h1> */}
        <div>
          <p style={{ marginTop: "12px" }}>Dates</p>
          {checkIn && checkOut ? (
            <>
              <p style={{ fontSize: "12px",marginTop:'20px' }}>
                <strong>
                  {checkIn}-{checkOut}
                </strong>
              </p>
            </>
          ) : (
            // <input
            //   type="text"
            //   placeholder="E.g. 28 Jul - 31 Aug"
            //   style={{ width: "200px" }}
            // />

            <div className="inout">
              <div className="box box2"    style={{backgroundColor:'transparent',width:'110px',height:'70px',padding:'4px 6px'}}>
                            <h3>Check in</h3>
                            <DatePicker
                              selected={startDate}
                              onChange={handleStartChange}
                              startDate={startDate}
                              placeholderText="select start date"
                              minDate={new Date()}
                            />
                          </div>
                          <div className="box box3"  style={{backgroundColor:'transparent',width:'110px',height:'70px',padding:'4px 6px',marginLeft:'8px'}}>
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
            </div>

          )}
        </div>
        {/* <hr style={{ width: "1px", marginLeft: "50px" }} /> */}
        <div className="bedday">
          <p style={{ marginTop: "12px" }}>Bed</p>
          <input
            style={{width:'32px',border:'none',borderRadius:'4px',textAlign:'center',color:'black'}}
            type="number"
            placeholder="E.g. 1"
            min="1"
            value={beds}
            onChange={handleChange}
          />
        </div>
        {/* <hr
          style={{ width: "1px",height:'', marginBottom: "40px", marginLeft: "235px" }}
        /> */}
        <div>
          <p style={{ marginTop: "12px" }}>Day</p>
          <input
          style={{width:'32px',border:'none',borderRadius:'4px',textAlign:'center'}}
            type="number"
            placeholder="E.g. 1"
            min="1"
            value={days}
            onChange={handleDayChange}
          />
        </div>
      </div>
      <div className="total">
        <h2 >{users}</h2>
        <Link to="/home" style={{ color: "#e83e5a" }}>
          <i class="bi bi-trash3"></i>
        </Link>
        {/* <p className='personno'>{users3} Person</p> */}
        <p className="personno">Total Persons: {persons}</p>
        <div>
          <span>₹{users1}</span> x <span>{bookingday} Day</span> x{" "}
          <span>{persons} Person</span>
        </div>
        <div>₹{users1 * bookingday * persons}</div>
        <h2>Total</h2>
        <div>₹{users1 * users2 * persons + 300}</div>
        <h2>Payable now</h2>
        <h2>₹{users1 * users2 * persons + 300}</h2>
      </div>
      <button className="booknow" onClick={loadrazorpay} backgroundColor="#e83e5a">
        Book Now <i class="bi bi-arrow-right"></i>
      </button>
      <div className="paycards">
        <img src={mastercard} alt="" />
        <img src={maestro} alt="" />
        <img src={visa} alt="" />
        <img src={carteBancaire} alt="" />
      </div>
    </div>
  );
}

export default PaymentPage;
