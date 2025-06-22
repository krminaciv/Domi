import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleHome from "./pages/SingleHome";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import AddHome from './pages/AddHome';
import AllHomes from './pages/AllHomes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homes/:id" element={<SingleHome />} />
        <Route path="/homes" element={<AllHomes />} />
        <Route 
          path="/add-home" 
          element={
            <PrivateRoute>
               <AddHome />
            </PrivateRoute>
          } />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App
