import React from 'react'
import './css/Icons.css';
import icon1 from './icons/bed.svg'
import icon2 from './icons/customer-service-svgrepo-com.svg'
import icon3 from './icons/hostel-svgrepo-com.svg'
import icon4 from './icons/hotel-sign-svgrepo-com.svg'

function Icons() {
  return (
    <div className='iconsColl'>

    <div>
      <img src={icon1} alt="" />
    </div>
    <div>
        <img src={icon2} alt="" />
    </div>
    <div>
     <img src={icon3} alt="" />
    </div>
    <div>
     <img src={icon4} alt="" />
    </div>

    </div>
   
  );
}

export default Icons;