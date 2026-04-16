import { Play, Pause, Trophy, Flame, CircleCheck } from "lucide-react";

export default function Timer({
  year,
  setYear,
  timerMode,
  setTimerMode,
  timerModule,
  setTimerModule,
  timerTime,
  setTimerTime,
  timerRunning,
  setTimerRunning,
}) {
  const modulesByYear = {
    "1CP": ["Algebra","Analysis","Intro to OS","Algo & Data structures","Computer Architecture","BEW","Electricity","French","Electronics","Particle mechanics","English",],
    "2CP": ["Algebra","Analysis","Computer architecture","ProbaStat","SFSD","Electronics","Economy","ISI","Mathematical logic","OOP","OOE","English",],
    "1CS": ["ANG","BDD","GL","PAFA","RO","RX","SE","THL","ADCI","ANUM","ESTN","IA","MF", "SEC",],
    "2CS": ["ANAD", "ANG", "BDA", "CLD", "COMP", "CPRJ", "FDS", "IGL"],
  };

  const modeTimes = {
    "Pomodoro": 25 * 60,
    "Short Break": 5 * 60,
    "Long Break": 15 * 60,
  };

  const handleModeChange = (newMode) => {
    setTimerMode(newMode);
    setTimerTime(modeTimes[newMode]);
    setTimerRunning(false);
  };

  const toggleRunning = () => setTimerRunning((prev) => !prev);

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const showSessionView = timerRunning && timerModule;

  return (
    <div className="flex flex-col gap-6 p-6 text-[#112250]">
      {/* Timer Card */}
      <div
        className={`bg-[#D9CBC2]/80 rounded-3xl p-6 flex flex-col ${
          showSessionView
            ? "items-center"
            : "md:flex-row justify-between items-center"
        } gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.4)_inset]`}
      >
        {/* Timer display */}
        <div
          className={`flex flex-col items-center ${showSessionView ? "w-full" : "flex-1"}`}
        >
          {!showSessionView && (
            <div className="flex gap-1 bg-[#3c507d]/80 rounded-full border-2 border-[#112250]/40 p-1 mb-6 font-medium">
              {["Pomodoro", "Short Break", "Long Break"].map((m) => (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`px-4 py-1 text-sm rounded-full transition-all ${
                    timerMode === m
                      ? "bg-[#e0c58f]/90 text-[#112250]"
                      : "text-white hover:text-[#f5e0e9]/90"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          <h1
            className={`${showSessionView ? "text-7xl md:text-8xl" : "text-6xl md:text-7xl"} font-bold`}
          >
            {formatTime(timerTime)}
          </h1>
          <p className="text-[#112250]/80 mt-1 font-medium text-center">
            {timerMode === "Pomodoro" ? "Focus session" : "Break time"}
          </p>

          {showSessionView && (
            <button
              onClick={toggleRunning}
              className="mt-6 rounded-full bg-[#dfb259]/90 px-6 py-3 text-sm font-semibold text-[#112250] transition hover:bg-[#e0c58f]/95 cursor-pointer "
            >
              <Pause className="w-4 h-4 inline-block  " /> Pause
            </button>
          )}
        </div>

        {!showSessionView && (
          <div className="bg-[#3c507d]/80 p-4 rounded-xl w-64 border-2 border-[#112250]/40 flex flex-col gap-4">
            <div>
              <p className="text-sm text-[#f5e0e9] mb-1 font-medium">
                Year of study
              </p>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-[#112250]/80 text-[#f5e0e9] p-2 rounded-lg border-2 border-[#112250]/40 cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select Year
                </option>
                {["1CP", "2CP", "1CS", "2CS"].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-sm text-[#f5e0e9] mb-1 font-medium">Module</p>
              <select
                value={timerModule}
                onChange={(e) => setTimerModule(e.target.value)}
                disabled={!year}
                className="w-full bg-[#112250]/80 text-[#f5e0e9] p-2 rounded-lg border-2 border-[#112250]/40 cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select Module
                </option>
                {year &&
                  modulesByYear[year].map((mod) => (
                    <option key={mod} value={mod}>
                      {mod}
                    </option>
                  ))}
              </select>
            </div>

            <button
              onClick={toggleRunning}
              disabled={!timerModule}
              className={`flex items-center justify-center gap-2 w-full rounded-md p-2 font-semibold transition-all ${
                !timerModule
                  ? "bg-[#f5e0e9]/60 cursor-not-allowed text-[#112250]"
                  : "bg-[#dfb259] text-[#112250] hover:scale-105 cursor-pointer"
              }`}
            >
              {timerRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {timerRunning ? "Pause" : "Start Focus"}
            </button>
          </div>
        )}
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-[#D9CBC2]/80 rounded-xl p-6 flex flex-col items-start gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.4)_inset]">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#dfb259]/80">
            <Flame className="w-6 h-6 text-[#112250]" />
          </div>
          <h2 className="text-2xl font-bold mt-2">4.5h</h2>
          <p className="text-[#112250]/80 font-medium">Daily Focus</p>
        </div>
        <div className="bg-[#D9CBC2]/80 rounded-xl p-4 flex flex-col items-start gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.4)_inset]">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#dfb259]/80">
            <CircleCheck className="w-6 h-6 text-[#112250]" />
          </div>
          <h2 className="text-2xl font-bold mt-2">8</h2>
          <p className="text-[#112250]/80 font-medium">Pomodoros Completed</p>
        </div>
        <div className="bg-[#D9CBC2]/80 rounded-xl p-4 flex flex-col items-start gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.4)_inset]">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#dfb259]/80">
            <Trophy className="w-6 h-6 text-[#112250]" />
          </div>
          <h2 className="text-2xl font-bold mt-2">#12</h2>
          <p className="text-[#112250]/80 font-medium">Current Rank</p>
        </div>
      </div>
    </div>
  );
}
