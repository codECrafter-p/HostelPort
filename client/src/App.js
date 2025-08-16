
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

   const [data,setData]=useState([]);
   const getData=async() => {
    const response=await axios.get('http://localhost:5000/home');
    setData(response.data);
    console.log(response.data);
   }
   useEffect(()=>{
    getData();
   },[]
 );

  return (
    <div className="App">
     
    {
      data.map((cat,i)=>(
        <div>
          <img src={cat.hostelRoomImage}/>
          <h1>{cat.hostelTitle}</h1>
        </div>
      ))
    }

    </div>
  );
}

export default App;
