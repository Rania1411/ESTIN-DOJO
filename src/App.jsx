
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from './Components/Header/Header.jsx' 
import Landing from './Pages/Landing/Landing.jsx'
import Login from './Pages/Login/Login.jsx'
import Leaderboard from "./Pages/Leaderboard/Leaderboard.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Chat from "./Pages/Chat/Chat.jsx";
import Resources from './Pages/Resources/Resources.jsx'
import MiniTimer from "./Components/MiniTimer/MiniTimer.jsx";

function App() {
  const [time, setTime] = useState(1500);
const [isRunning, setIsRunning] = useState(false);
const [mode, setMode] = useState("Pomodoro");
const [moduleName, setModuleName] = useState("");
const [hasStarted, setHasStarted] = useState(false);
useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setTime((prev) => {
    if (prev <= 1) {
  setIsRunning(false);
  setHasStarted(false); 
  return 0;
}
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isRunning]);
  return (
    <>
   {hasStarted && (
  <MiniTimer
    time={time}
    isRunning={isRunning}
    toggleRunning={() => {
      setIsRunning((prev) => !prev);
      setHasStarted(true);
    }}
    mode={mode}
    moduleName={moduleName}
     onDelete={() => setHasStarted(false)}
  />
)}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Chat" element={<Chat />} />

      <Route
  path="/Dashboard"
  element={
    <Dashboard
      timerTime={time}
      setTimerTime={setTime}
      timerRunning={isRunning}
      setTimerRunning={setIsRunning}
      timerMode={mode}
      setTimerMode={setMode}
      timerModule={moduleName}
      setTimerModule={setModuleName}
      setHasStarted={setHasStarted}
    />
  }
/>
        <Route path="/Resources" element={<Resources />} />
      </Routes>
    </>
  )
}

export default App
