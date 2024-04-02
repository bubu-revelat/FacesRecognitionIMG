import './App.css';
import React from 'react';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

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
