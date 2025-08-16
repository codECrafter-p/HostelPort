import React from 'react'
import './css/Explore.css'
import { Link } from 'react-router-dom';
import hosteltour from './video/hosteltour.mp4'

function Explore() {
  return (
    <div className='container'>

        <video autoPlay loop muted plays-inline className='background-clip'>
          <source src={hosteltour} type='video/mp4' />
        </video>

        <div className="content">
          <h1><span>E</span>xplore</h1>
          <Link to="/home">Start Finding</Link>
        </div>
    </div>
   
  )
}

export default Explore;