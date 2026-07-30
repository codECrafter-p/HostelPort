import React from 'react'
import { Routes , Route } from "react-router-dom";
import App from './App';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import Cart from './Cart';
import Footer from './Footer';
import Signup from './Signup';
import Front from './Front';
// import Home from './Home';
import Login from './Login';
import Hazaribagh from './Extra/Hazaribagh';
import Hostelroom from './Extra/Hostelroom';

import HostelDetailsPage from './HostelDetailsPage';
import Explore from './Explore';
import PaymentPage from './PaymentPage';

import Contact from './Contact';
import About from './About';
import Desthostel from './Desthostel';
import Profilepage from './Profilepage';
import Namehostel from './Namehostel';
import Searchhostel from './Extra/Searchhostel';
import AdminPage from './AdminPage';


function Routerpage() {
  return (
    <div>
        
        <Routes>
            <Route path="/" element={<Explore/>}/>
            <Route path="/home" element={<Cart/>}/>
            <Route path="/main" element={<App/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/hzb" element={<Hazaribagh/>}/>
            <Route path="/hr" element={<Hostelroom/>}/>
            <Route path="/footer" element={<Footer/>}/>
            <Route path="/front" element={<Front/>}/>
            <Route path="/navbar" element={<Navbar/>}/>
            <Route path="/navbar1" element={<Navbar1/>}/>
            <Route path="/details/:hostelid" element={<HostelDetailsPage/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/paymentpage" element={<PaymentPage/>}/>
            <Route path="/desthostel" element={<Desthostel/>}/>
            <Route path="/profile" element={<Profilepage/>}/>
            <Route path="/namehostel" element={<Namehostel/>}/>
            <Route path="/search" element={<Searchhostel/>}/>
            <Route path="/admin" element={<AdminPage/>} />

       
        </Routes>
    </div>
  );
}

export default Routerpage;