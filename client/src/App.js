
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE_URL;

function App() {

   const [data,setData]=useState([]);
   const getData=async() => {
    const response=await axios.get('${API}/home');
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
