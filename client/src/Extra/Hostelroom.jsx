// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Hostelroom() {
//   const [data, setdata] = useState([]);

//   const getData = async () => {
//     const result = await axios.get("http://localhost:5000/hostelroom");
//     setdata(result.data);
//     console.log(result.data);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const loadrazorpay = () => {
//     var options = {
//       key: "rzp_test_1HcwRaiHACThCc", // Enter the Key ID generated from the Dashboard
//       amount: "50000", // Amount is in currency subunits.
//       currency: "INR",
//       name: "Acme Corp", //your business name
//       description: "Test Transaction",
//       image: "https://example.com/your_logo",
//       handler:function (response){
//         alert(`Payment ID: ${response.razorpay_payment_id}`);
//       },
//       prefill: {
//         //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//         name: "Gaurav Kumar", //your customer's name
//         email: "gaurav.kumar@example.com",
//         contact: "+919876543210", //Provide the customer's phone number for better conversion rates
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
//     var rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   return (
//     <div>
//       {data.map((room, i) => (
//         <div key={i} className="single-card">
//           <img src={room.hostelRoomImage} alt="" />
//           <h1>{room.hostelRoomNo}</h1>
//           <h2>Rs {room.hostelRoomPrice}</h2>
//           <button onClick={loadrazorpay}>Pay</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Hostelroom;
