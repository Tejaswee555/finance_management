import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import SetAvatar from './Pages/Avatar/setAvatar';

const App = () => {
  return (
    <div className="App" style={{
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(40,167,69,0.15) 100%)'
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
