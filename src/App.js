import './App.css';
import React, { useEffect } from 'react';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext/UserContext';




function App() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000');
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
    };
  }, []);









  return (
    <Router>
      <div className="App">
      <UserProvider>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
