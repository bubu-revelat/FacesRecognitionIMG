import React from "react";
import Tilt from "react-parallax-tilt";
import './logo.css';
import logoBrain from './brain-logo.png'

function Logo() {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" style={{ max: '55', height:150, width:150}}>
                <div  >
                   <img alt='logo' src={logoBrain}></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;