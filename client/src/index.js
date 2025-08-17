import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Routerpage from './Routerpage';

// import Explore from './Explore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    
    {/* <Explore/> */}
     <Routerpage />

     
   </BrowserRouter>

);


