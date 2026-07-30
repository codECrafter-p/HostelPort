import React, { useState } from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./css/Profilepage.css";
import Navbar from "./Navbar";

function Profilepage() {
  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontWeight: "bold",
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  };

  const [selected, setSelected] = useState("personaldetails");

  // const location = useLocation();
  // const { email } = location.state || {};

  // const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load email from localStorage (runs once when page loads)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // setEmail(parsedUser.email);
      // setEmail(parsedUser.name);
      // setEmail(parsedUser.phoneno);
    } else {
      // If no user found, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user
    localStorage.removeItem("token"); // clear token if you stored it
    navigate("/login"); // go to login page
  };

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
          {/* <Link to="/home">Logout</Link> */}
          <li onClick={handleLogout}>Logout</li>
        </li>
      </ul>

      {/* Content based on selection */}
      <div className="box" style={{ marginTop: "20px" }}>
        {selected === "personaldetails" && user && (
          <div>
            <h2 className="heading">Personal Details</h2>
            {/* <input type="file" /> */}
            <p>Edit your Profile</p>
            {/* <h3>Name:  <i>{name}</i></h3> */}
            <h3>
              {/* Email: <i>{email}</i> */}
              <h3>
                Name: <i>{user?.name}</i>
              </h3>
              <h3>
                Email: <i>{user?.email}</i>
              </h3>
              <h3>
                Phone: <i>{user?.phoneno}</i>
              </h3>
            </h3>
            <Link to="/">Reset Padssword</Link>
          </div>
        )}

        {selected === "history" && (
          <div>
            <h2 className="heading">Booking History</h2>
            {(() => {
              const user = JSON.parse(localStorage.getItem("user"));
              const allHistory =
                JSON.parse(localStorage.getItem("history")) || {};
              const history = user ? allHistory[user.email] || [] : [];

              if (history.length === 0) {
                return <p>No past bookings yet.</p>;
              }

              return (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                      <th style={thStyle}>Title</th>
                      <th style={thStyle}>Check-in</th>
                      <th style={thStyle}>Check-out</th>
                      <th style={thStyle}>Persons</th>
                      <th style={thStyle}>Days</th>
                      <th style={thStyle}>Total Paid</th>
                      <th style={thStyle}>Payment ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid #ddd" }}
                      >
                        <td style={tdStyle}>{h.title || "N/A"}</td>
                        <td style={tdStyle}>
                          {h.checkIn
                            ? new Date(h.checkIn).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </td>
                        <td style={tdStyle}>
                          {h.checkOut
                            ? new Date(h.checkOut).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </td>

                        <td style={tdStyle}>{h.persons || 0}</td>
                        <td style={tdStyle}>{h.days || 0}</td>
                        <td style={tdStyle}>
                          ₹
                          {(Number(h.price) || 0) *
                            (h.days || 1) *
                            (h.persons || 1) +
                            300}
                        </td>
                        <td style={tdStyle}>{h.paymentId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })()}
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
