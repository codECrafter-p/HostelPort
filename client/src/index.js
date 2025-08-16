import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Routerpage from './Routerpage';
import Signup from './Signup';
import Login from './Login';
// import Hazaribagh from './Hazaribagh';
import PaymentPage from './PaymentPage';
import Front from './Front';
// import Home from './Home';
import Cart from './Cart';
// import Hostelroom from './Hostelroom';
import Explore from './Explore';
import Desthostel from './Desthostel';
import Profilepage from './Profilepage';
import Namehostel from './Namehostel';
import Searchhostel from './Extra/Searchhostel';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    
    {/* <Explore/> */}
     <Routerpage />
{/* <Searchhostel/> */}
          {/* <Login /> */}
            {/* <Signup/> */}
            {/* <Cart/> */}
          {/* <Hazaribagh/> */}
          {/* <PaymentPage/> */}
          {/* <Home/> */}
          {/* <Hostelroom/> */}
          {/* <Front/> */}
          {/* <Desthostel/> */}
          {/* <Profilepage/> */}
          {/* <Namehostel/> */}
     
   </BrowserRouter>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);


