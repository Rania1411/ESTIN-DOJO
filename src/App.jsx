import { useState } from 'react'
import Header from './Components/Header/Header.jsx' 
import Landing from './Pages/Landing/Landing.jsx'
import Login from './Pages/Login/Login.jsx'
import Leaderboard from "./Pages/Leaderboard/Leaderboard.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Chat from "./Pages/Chat/Chat.jsx";
import Resources from './Pages/Resources/Resources.jsx'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
          <Route path="/Leaderboard" element={<Leaderboard/>} />
          <Route path="/Chat" element={<Chat/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
           <Route path="/Resources" element={<Resources/>} />
         


      </Routes>
    </>
  )
}

export default App
