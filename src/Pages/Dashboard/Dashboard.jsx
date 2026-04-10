import { useState } from "react";
import { Play, Trophy, Flame, CircleCheck, Pause } from "lucide-react";
import Header from '../../Components/Header/Header.jsx'
export default function Dashboard({ year, setYear }) {
  console.log("Dashboard is rendering");

  const [mode, setMode] = useState("Pomodoro");
  const [module, setModule] = useState("");
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const modulesByYear = {
    "1CP": ["Algebra","Analysis","Intro to OS","Algo & Data structures","Computer Architecture","BEW","Electricity","French","Electronics","Particle mechanics","English"],
    "2CP": ["Algebra","Analysis","Computer architecture","ProbaStat","SFSD","Electronics","Economy","ISI","Mathematical logic","OOP","OOE","English"],
    "1CS": ["ANG","BDD","GL","PAFA","RO","RX","SE","THL","ADCI","ANUM","ESTN","IA","MF","SEC"],
    "2CS": ["ANAD","ANG","BDA","CLD","COMP","CPRJ","FDS","IGL"],
  };

  const modeTimes = {
    Pomodoro: 25 * 60,
    "Short Break": 5 * 60,
    "Long Break": 15 * 60,
  };

  const handleClick = () => {
    setIsRunning((prev) => !prev);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTime(modeTimes[newMode]);
  };

  return (
    <>
    <Header> </Header>
    <div className="p-6 pt-28 min-h-screen text-white">
      <div className="bg-[#f5e0e9]/10 rounded-3xl p-6 border border-[#f5e0e9]/20">
        <div className="rounded-3xl p-6 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex flex-col items-center pl-20">

            {/* Mode selector */}
            <div className="flex flex-col justify-center mb-6">
              <div className="flex bg-[#112250]/10 rounded-full p-1 border border-[#f5e0e9]/20">
                {["Pomodoro", "Short Break", "Long Break"].map((m) => (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`px-4 py-1 text-sm transition-all ${
                      mode === m
                        ? "bg-[#f5e0e9]/90 text-[#3a345a] rounded-full"
                        : "text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              <h1 className="text-7xl font-bold">
                {Math.floor(time / 60).toString().padStart(2, "0")}:
                {(time % 60).toString().padStart(2, "0")}
              </h1>
              <p className="text-[#f5e0e9]/60">
                {mode === "Pomodoro" ? "Focus session" : "Break time"}
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div>
            <div className="bg-[#112250]/10 p-4 rounded-xl w-64 border border-[#f5e0e9]/20">
              
              {/* Year */}
              <p className="text-[#f5e0e9] text-sm">Year of study</p>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-[#112250]/80 text-[#f5e0e9] p-2 rounded-lg border border-gray-600"
              >
                <option value="" disabled hidden>Select Year</option>
                <option value="1CP">1CP</option>
                <option value="2CP">2CP</option>
                <option value="1CS">1CS</option>
                <option value="2CS">2CS</option>
              </select>

              <div className="h-3"></div>

              {/* Module */}
              <p className="text-[#f5e0e9] text-sm">Module</p>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                disabled={!year}
                className="w-full bg-[#112250]/80 text-[#f5e0e9] p-2 rounded-lg border border-gray-600"
              >
                <option value="" disabled hidden>Select Module</option>
                {year &&
                  modulesByYear[year].map((mod, i) => (
                    <option key={i} value={mod}>
                      {mod}
                    </option>
                  ))}
              </select>

              <div className="h-6"></div>

              {/* Button */}
              <button
                onClick={handleClick}
                className="flex items-center justify-center gap-2 w-full bg-[#dfb259]/90 text-[#112250] rounded-md p-2 font-semibold"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start Focus
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-6 h-40 text-sm">
        <div className="bg-[#f5e0e9]/10 p-4 rounded-xl border border-[#f5e0e9]/20">
          <Flame className="w-6 h-6 text-[#dfb259] mb-2" />
          <h2 className="text-2xl font-bold">4.5h</h2>
          <p className="text-[#f5e0e9]/60">Daily Focus</p>
        </div>

        <div className="bg-[#f5e0e9]/10 p-4 rounded-xl border border-[#f5e0e9]/20">
          <CircleCheck className="w-6 h-6 text-[#dfb259] mb-2" />
          <h2 className="text-2xl font-bold">8</h2>
          <p className="text-[#f5e0e9]/60">Pomodoros Completed</p>
        </div>

        <div className="bg-[#f5e0e9]/10 p-4 rounded-xl border border-[#f5e0e9]/20">
          <Trophy className="w-6 h-6 text-[#dfb259] mb-2" />
          <h2 className="text-2xl font-bold">#12</h2>
          <p className="text-[#f5e0e9]/60">Current Rank</p>
        </div>
      </div>
    </div>
 </> );
}