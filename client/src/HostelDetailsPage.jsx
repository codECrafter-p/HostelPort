import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Container.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import lamp from "./rooms/lamp.svg";
import book from "./rooms/book.svg";
import charger from "./rooms/charger.svg";
import dustbin from "./rooms/dustbin.svg";
import locker from "./rooms/locker.svg";
import scratch from "./rooms/scratch.svg";
import offer from "./rooms/offer.svg";
import summary from "./rooms/summary.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

function HostelDetailsPage() {
  const [det, setDetails] = useState(null);

  const navigate = useNavigate();

  const { hostelid } = useParams();
  console.log(hostelid);

  const getData = async () => {
    try {
      const resulthostel = await axios.get(
        `http://localhost:5000/roomdetails/${hostelid}/details`
      );
      if (resulthostel.data) {
        setDetails(resulthostel.data);
        console.log(resulthostel.data);
      } else {
        console.log("No data is found with this id");
      }
    } catch (error) {
      console.log("Error fetching hostel details", error);
    }
  };

  useEffect(() => {
    if (hostelid) {
      getData();
    }
  }, [hostelid]);

  const handleBookingChange = (price, title, availablebed, personcount) => {
    navigate("/paymentpage", {
      state: {
        rooms: price,
        title: title,
        bed: availablebed,
        personcount: personcount,
        checkIn,
        checkOut,
      },
    });
  };

  const location = useLocation();
  const { checkIn, checkOut } = location.state || {};

  // const handleNext = () => {
  //    if (!checkIn || !checkOut) {
  //     alert("Dates are missing!");
  //     return;
  //   }
  //   navigate('/paymentpage', {
  //     state: {
  //       checkIn,
  //       checkOut
  //     }
  //   });
  // };

  return (
    <div>
      {/* <h1>{hostelid}</h1> */}
      {/* <h1>{det?.hostelTitle}</h1> */}

      {det?.details?.map((tdetail, i) => (
        <div>
          <Navbar />

          <div className="cont1">
            <div className="r1">
              <img src={tdetail.roomImage1} alt="" />
            </div>
            <div className="r2">
              <img src={tdetail.roomImage2} alt="" />
            </div>
            <div className="r3">
              <img src={tdetail.roomImage3} alt="" />
            </div>
            <div className="r4">
              <img src={tdetail.roomImage4} alt="" />
            </div>
          </div>
          <div className="cont2">
            <div className="intro">
              <h1>
                The HostelPort <i>{tdetail.roomDest}</i>
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque,
                nostrum dolores. Dolorum voluptates, nemo neque cumque ea soluta
                facere nesciunt! Quos reiciendis, eius mollitia provident,
                beatae culpa totam impedit dignissimos ad soluta dolorem
                consequuntur dolor. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit.{" "}
                <span>
                  <i class="bi bi-chevron-down"></i> Read more
                </span>{" "}
              </p>
            </div>
            <div className="view">
              <button>View Rooms</button>
            </div>
          </div>

          {/* bed section */}
          <div>
            <div className="cont3">
              <div className="roomlist">
                <div className="av">
                  <h1>Availability</h1>
                  {checkIn && checkOut ? (
                    <button>
                      <i class="bi bi-calendar"></i> {checkIn} - {checkOut}{" "}
                    </button>
                  ) : (
                    <button>
                      <i class="bi bi-calendar"></i> No dates selected{" "}
                    </button>
                  )}
                </div>
              </div>
              {/* <div className='summary'>
          <img src={summary} alt="" />  
      </div> */}
              <div
                style={{
                  marginLeft: "80px",
                  marginBottom: "0px",
                  textAlign: "center",
                }}
              >
                <address>
                  <p style={{ marginBottom: "12px" }}>
                    {det.hostelTitle || "Address not available"}
                  </p>
                </address>
                {tdetail.mapURL ? (
                  <iframe
                    src={tdetail.mapURL}
                    width="400"
                    height="350"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <p>No map available</p>
                )}
              </div>
            </div>

            <div>
              <div className="discount">
                <img src={scratch} alt="" />
                <h4>
                  Hurray! Book for 4 guests or more to get group booking
                  discount.
                </h4>
                <img src={offer} alt="" />
              </div>

              {det?.details?.map((room, i) =>
                room?.availableroom?.map((bed, j) => (
                  // <h1>{bed.price}</h1>

                  <div className="bed">
                    <img src={bed.bedimage} alt="" />
                    <div className="bedDetail">
                      <h2>{bed.bedtitle}</h2>
                      <h1 className="price">
                        {bed.bedprice}
                        <span className="perbed">Per Bed</span>
                      </h1>
                      <p>
                        <i class="bi bi-person"></i> x {bed.personcount} Person
                      </p>
                      <p className="duration">{bed.duration} Day</p>
                      <div className="facil">
                        <img src={lamp} alt="" />
                        <img src={book} alt="" />
                        <img src={charger} alt="" />
                        <img src={dustbin} alt="" />
                        <img src={locker} alt="" />
                      </div>
                      <h3 className="bed-available">
                        {bed.bedavailable}Beds Available
                      </h3>
                      <button
                        className="addbed"
                        onClick={() => {
                          handleBookingChange(
                            bed.bedtitle,
                            bed.bedprice,
                            bed.duration,
                            bed.personcount
                          );
                        }}
                      >
                        Add Bed
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <h1 className="similarheading">Similar Hostels</h1>
          <div className="similarhostels">
            <Link to="">
              <div className="similar similar1">
                <img src={tdetail.similarImage1} alt="" />
                <h2>{tdetail.similarName1}</h2>
              </div>
            </Link>
            <Link to="">
              <div className="similar similar1">
                <img src={tdetail.similarImage2} alt="" />
                <h2>{tdetail.similarName2}</h2>
              </div>
            </Link>
            <Link to="">
              <div className="similar similar1">
                <img src={tdetail.similarImage3} alt="" />
                <h2>{tdetail.similarName3}</h2>
              </div>
            </Link>
            <Link to="">
              <div className="similar similar1">
                <img src={tdetail.similarImage4} alt="" />
                <h2>{tdetail.similarName4}</h2>
              </div>
            </Link>
          </div>

          <Footer />
        </div>
      ))}
    </div>
  );
}

export default HostelDetailsPage;
