import React from 'react';
import Tilt from 'react-tilt';
const Navigation = ({onRouteChange,isSignedIn}) => {
       if(isSignedIn)
       {
           return (
        <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Tilt  className="Tilt ma3 br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
         <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} alt="logo" src="https://img.icons8.com/cotton/100/000000/brain-3.png"/> </div>
       </Tilt>  
            <p 
            onClick = {() => onRouteChange('signout')}
            className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
           );
       }
       else
       {
           return (
        <nav style={{display: 'flex', justifyContent: 'space-between'}}>
        <Tilt  className="Tilt ma3 br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
       <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} alt="logo" src="https://img.icons8.com/cotton/100/000000/brain-3.png"/> </div>
       </Tilt>  
       <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p 
            onClick = {() => onRouteChange('signin')}
            className='f3 link dim black underline pa3 pointer'>Sign In</p>
            <p 
            onClick = {() => onRouteChange('register')}
            className='f3 link dim black underline pa3 pointer'>Register</p>
        </div>
        </nav>

           );
       }
}

export default Navigation;