import './App.css';
import React, { useEffect, useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {

// Define state to store fetched data
const [data, setData] = useState(null);
  
useEffect(() => {
  // Define async function to fetch data
  const fetchData = async () => {
    try {
      // Make the fetch request
      const response = await fetch('http://localhost:3000');
      console.log(response);
      //const jsonData = await response.json();
      // Update state with fetched data
      //setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the async function to fetch data when component mounts
  fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup (if needed)
    };
  }, []); 









  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
            
        </Routes>
      </div>
    </Router>
  );
}

export default App;
