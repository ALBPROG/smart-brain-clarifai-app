import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
  <div className='ma4 mt0'>
       <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
       <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} alt="logo" src="https://img.icons8.com/cotton/100/000000/brain-3.png"/> </div>
       </Tilt>
  </div>
    )
}

export default Logo;