import React from "react";
import { useNavigate } from 'react-router-dom';

function Navigation() {
    let navigate = useNavigate();
  
    const backToSignIn = () => {
      navigate('/');
    };


    return (
        <nav style={{display:'flex', justifyContent: 'flex-end'}}>
        <p onClick = {backToSignIn} className="f3 link dim black underline pa3 pointer">Sign Out</p>
        </nav>
    );
  }
  
  export default Navigation;
  