import React from "react";
import { useState } from "react";
import "./css/PaymentPage.css";
import { Link } from "react-router-dom";
import mastercard from "./rooms/mastercard.svg";
import maestro from "./rooms/maestro.svg";
import visa from "./rooms/visa.svg";
import carteBancaire from "./rooms/carteBancaire.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [beds, setBeds] = useState(1);
  const [persons, setPersons] = useState(1);
  const [days, setDays] = useState(1);
  const [bookingday, setBookingDays] = useState(1);

  
  // handle date pickers
  const handleStartChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };
  const handleEndChange = (date) => {
    setEndDate(date);
  };    

  // handle beds/persons
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setBeds(value);
      setPersons(value);
    } else {
      alert("Minimum 1 bed required.");
    }
  };

  // handle days
  const handleDayChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setDays(value);
      setBookingDays(value);
    } else {
      alert("Minimum 1 day required.");
    }
  };

  // Load user and booking from localStorage (or fallback to location.state)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedBooking = localStorage.getItem("booking");
    if (storedBooking) {
      const b = JSON.parse(storedBooking);
      setBooking(b);
      setStartDate(b.checkIn ? new Date(b.checkIn) : null);
      setEndDate(b.checkOut ? new Date(b.checkOut) : null);
      setBeds(b.bed || 1);
      setPersons(b.persons || 1);
      setBookingDays(b.days || 1);
    } else if (location.state) {
      const { checkIn, checkOut,title,price, bed } = location.state;
      // const b = { checkIn, checkOut, title,price, bed, days: 1, persons: 1 };

       const b = { 
     checkIn: checkIn ? new Date(checkIn).toISOString() : null,
    checkOut: checkOut ? new Date(checkOut).toISOString() : null,
    title,
    price,
  bed: bed || 1,
  days: location.state?.days || 1,
  persons: location.state?.persons || 1
  };

      setBooking(b);
      setStartDate(checkIn ? new Date(checkIn) : null);
      setEndDate(checkOut ? new Date(checkOut) : null);
      setBeds(b.bed);
      setPersons(b.persons);
      setBookingDays(b.days);
       // also save to localStorage so it persists after login
    localStorage.setItem("booking", JSON.stringify(b));
    }
  }, [location.state]);

  useEffect(() => {
  if (startDate && endDate) {
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      setDays(diffDays);
      setBookingDays(diffDays);

      // ✅ also update booking in localStorage
      const updatedBooking = {
        ...booking,
        startDate,
        endDate,
        days: diffDays,
        persons,
      };
      setBooking(updatedBooking);
      localStorage.setItem("booking", JSON.stringify(updatedBooking));
    }
  }
}, [startDate, endDate, persons]);

// reset only dates
const handleResetDates = () => {
  
  setStartDate(null);
  setEndDate(null);

   const calculatedDays = 1;


  // update booking in state and localStorage
  const updatedBooking = {
    ...booking,
    checkIn: null,
    checkOut: null,
    days: calculatedDays,  // reset to default
  };
  setBooking(updatedBooking);
  localStorage.setItem("booking", JSON.stringify(updatedBooking));
};

  const loadrazorpay = () => {

     if (!user) {

      // Save booking details before redirecting to login
      const bookingData = {
        checkIn: startDate ? startDate.toISOString() : null,
        checkOut: endDate ? endDate.toISOString() : null,
        price: booking?.price,
        title: booking?.title,
        bed: beds,
        days: bookingday,
        persons: persons,
      };
      localStorage.setItem("booking", JSON.stringify(bookingData));

      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    var options = {
      key: "rzp_test_1HcwRaiHACThCc", // Enter the Key ID generated from the Dashboard
      amount:  ((Number(booking?.price) || 0) * bookingday * persons + 300) * 100, // Amount is in currency subunits.
      currency: "INR",
      name: user?.name, //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);

         const user = JSON.parse(localStorage.getItem("user")); 
  if (!user) {
    alert("User not logged in!");
    return;
  }

  const completedBooking = {
    ...booking,
    checkIn: startDate ? startDate.toISOString() : booking?.checkIn || null,
    checkOut: endDate ? endDate.toISOString() : booking?.checkOut || null,
    persons,
    days: days,
    bed: beds,
    paymentId: response.razorpay_payment_id,
    date: new Date().toISOString(),
  };

  // ✅ load history for all users
  const allHistory = JSON.parse(localStorage.getItem("history")) || {};

  // ✅ add booking for this user
  if (!allHistory[user.email]) {
    allHistory[user.email] = [];
  }
  allHistory[user.email].push(completedBooking);

  localStorage.setItem("history", JSON.stringify(allHistory));

         localStorage.removeItem("booking"); // clear booking after payment
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phoneno,
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

    <h1 style={{marginLeft:'60px'}}>Book Now...<span><Link to="/home" style={{marginLeft:'164px', fontSize:'25px', color:'#e83e5a'}}><i class="bi bi-x-circle"></i></Link></span></h1>

      <div className="dates">
        {/* <h1>{users}</h1> */}
        <div>
          <p style={{ marginTop: "12px" }}>Dates</p>
          {startDate && endDate ? (
            <>
              <p style={{ fontSize: "12px",marginTop:'20px' }}>
                <strong>
                  {/* {checkIn}-{checkOut} */}
                   {startDate.toDateString()} - {endDate.toDateString()}
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
              <div className="box box2" style={{backgroundColor:'transparent',width:'110px',height:'70px',padding:'4px 6px'}}>
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
           {/* ✅ Reset button only appears when both dates are selected */}
  {(startDate && endDate) && (
    <button 
      onClick={handleResetDates} 
      style={{
        marginLeft:"32px",
        background:"#e83e5a",
        color:"white",
        border:"none",
        borderRadius:"6px",
        padding:"2px 12px",
        cursor:"pointer"
      }}
    >
      Reset
    </button>
  )}
        </div>
        {/* <hr style={{ width: "1px", marginLeft: "50px" }} /> */}
        <div className="bedday">
          <p style={{ marginTop: "12px" }}>Bed</p>
          <input
            style={{width:'52px',height:'12px',border:'none',borderRadius:'4px',textAlign:'center',color:'black',fontWeight:'bold'}}
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
             <p style={{ marginTop: "12px" }}>Days</p>
            <p style={{ fontWeight: "bold" }}>{days || 0}</p>
        </div>
      </div>
      <div className="total">
        <h2 >{booking?.title || "No rooms selected"}</h2>
        <Link to="/home" style={{ color: "#e83e5a" }}   onClick={() => localStorage.removeItem("booking")}>
          <i class="bi bi-trash3"></i>
        </Link>
        {/* <p className='personno'>{users3} Person</p> */}
       
        {booking ? (
    <>
         <p className="personno">Total Persons: {persons}</p>
        <div>
          {/* <span>₹{booking.rooms }</span> x <span>{bookingday} Day</span> x{" "} */}
          <span>₹{Number(booking.price) || 0}</span> x{" "} <span>{days || 0} Day</span> x{" "}
          <span>{persons} Bed</span>
        </div>
        <div> ₹{(Number(booking.price) || 0) * days * persons}</div>
        <h2>Total</h2>
        <div>₹{(Number(booking.price) || 0) * (days || 1) * persons + 300}</div>
        <h2>Payable now</h2>
        <h2> ₹{(Number(booking.price) || 0) * (days || 1) * persons + 300}</h2>
        </>
  ) : (
    <p>No booking details available</p>
  )}
      </div>
      <button className="booknow" onClick={loadrazorpay} disabled={!user} backgroundColor="#55a78041">
         {user ? "Book Now" : "Login to Book"}
      </button>

         {!user && (
          <button
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
            style={{
              backgroundColor: "#e83e5a",
              color: "#fff",
              padding: "8px 20px",
              margin:"12px",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        )} 

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
