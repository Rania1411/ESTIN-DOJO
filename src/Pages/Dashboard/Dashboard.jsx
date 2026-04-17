import { useState, useEffect } from "react";
import { Flame, Trophy, CircleCheck } from "lucide-react";
import Header from "../../Components/Header/Header";

export default function Dashboard(
    {
  timerTime,
  setTimerTime,
  timerRunning,
  setTimerRunning,
  timerMode,
  setTimerMode,
  timerModule,
  setTimerModule,
  setHasStarted,}
) {
  const [year, setYear] = useState("");

  const modulesByYear = {
    "1CP": ["Algebra", "Analysis", "Intro to OS", "Algo & Data structures", "Computer Architecture", "BEW", "Electricity", "French", "Electronics", "Particle mechanics", "English"],
    "2CP": ["Algebra", "Analysis", "Computer architecture", "ProbaStat", "SFSD", "Electronics", "Economy", "ISI", "Mathematical logic", "OOP", "OOE", "English"],
    "1CS": ["ANG", "BDD", "GL", "PAFA", "RO", "RX", "SE", "THL", "ADCI", "ANUM", "ESTN", "IA", "MF", "SEC"],
    "2CS": ["ANAD", "ANG", "BDA", "CLD", "COMP", "CPRJ", "FDS", "IGL"],
  };

  const modeTimes = {
    "Pomodoro": 1500,
    "Short Break": 300,
    "Long Break": 900,
  };

const handleModeChange = (mode) => {
  setTimerRunning(false);
  setTimerMode(mode);
  setTimerTime(modeTimes[mode] || 1500);
  setTimerModule(""); // 👈 reset module (optional but clean)
};
const toggleRunning = () => {
  if (!timerModule && !timerRunning) {
    alert("Please select a module first!");
    return;
  }

  if (!timerRunning) {
    setHasStarted(true);
  }

  setTimerRunning((prev) => !prev);
};

  const formatTime = (seconds) => {
    const s = typeof seconds === "number" ? seconds : 0;
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#112250] text-[#F5F0E9] p-6  mt-24 sm:p-8   w-[94%] mx-auto flex flex-col gap-8">

        {/* MAIN CARD */}
        <div className="bg-[#3C507D]/60 backdrop-blur-xl border border-[#E0C58F]/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 shadow-2xl">

          {/* LEFT */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex bg-[#112250]/80 rounded-full p-1.5 border border-[#E0C58F]/20 mb-10">
              {["Pomodoro", "Short Break", "Long Break"].map((m) => (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                    timerMode === m
                      ? "bg-[#E0C58F] text-[#112250]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <h1 className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums drop-shadow-lg">
              {formatTime(timerTime)}
            </h1>

            <p className="mt-4 text-[#E0C58F] tracking-[0.5em] font-bold text-sm uppercase opacity-80">
              {timerMode}
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-96 bg-[#112250]/60 p-8 rounded-[2rem] border border-[#E0C58F]/10 flex flex-col gap-6">

            {/* YEAR */}
            <div>
              <label className="text-[10px] font-black text-[#E0C58F] tracking-widest">YEAR</label>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setTimerModule("");
                }}
                className="w-full bg-[#3C507D] p-4 rounded-2xl"
              >
                <option value="">Select Year</option>
                {Object.keys(modulesByYear).map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* MODULE */}
            <div>
              <label className="text-[10px] font-black text-[#E0C58F] tracking-widest">MODULE</label>
              <select
                value={timerModule}
                onChange={(e) => setTimerModule(e.target.value)}
                disabled={!year}
                className="w-full bg-[#3C507D] p-4 rounded-2xl"
              >
                <option value="">Choose Module</option>
                {year &&
                  modulesByYear[year].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
              </select>
            </div>

            {/* BUTTON */}
            <button
              onClick={toggleRunning}
              className={`w-full py-4 rounded-2xl font-black text-lg ${
                timerRunning
                  ? "bg-white/10 text-white"
                  : "bg-[#E0C58F] text-[#112250]"
              }`}
            >
              {timerRunning ? "PAUSE" : "START"}
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { i: <Flame />, v: "4.5h", l: "TOTAL FOCUS" },
            { i: <CircleCheck />, v: "8", l: "COMPLETED" },
            { i: <Trophy />, v: "#12", l: "RANKING" },
          ].map((s, i) => (
            <div key={i} className="bg-[#3C507D]/40 p-6 rounded-[2rem] flex items-center gap-6">
              <div className="text-[#E0C58F]">{s.i}</div>
              <div>
                <div className="text-3xl font-black">{s.v}</div>
                <div className="text-[10px] text-white/40">{s.l}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}