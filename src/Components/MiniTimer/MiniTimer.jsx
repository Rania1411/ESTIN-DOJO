import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatTime = (seconds) => {
  const s = typeof seconds === "number" ? seconds : 0;
  return `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
};

export default function MiniTimer({
  time = 0,
  isRunning = false,
  toggleRunning = () => {},
  mode = "Pomodoro",
  moduleName = "",
  onDelete = () => {}, // ✅ NEW PROP
}) {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, originX: 0, originY: 0 });

 
  useEffect(() => {
    const initialX = window.innerWidth - 260;
    const initialY = window.innerHeight - 180;
    setPosition({ x: initialX, y: initialY });
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (event) => {
      setPosition({
        x:
          dragStartRef.current.originX +
          (event.clientX - dragStartRef.current.x),
        y:
          dragStartRef.current.originY +
          (event.clientY - dragStartRef.current.y),
      });
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const startDrag = (event) => {
    event.preventDefault();
    setDragging(true);
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      originX: position.x,
      originY: position.y,
    };
  };

  return (
    <div
      className="fixed z-50 w-60 rounded-3xl bg-[#1e3667]/95 border border-white/10 p-3 shadow-xl backdrop-blur-sm"
      style={{
        left: position.x,
        top: position.y,
        cursor: dragging ? "grabbing" : "default",
      }}
    >
   
      <div
        onMouseDown={startDrag}
        className="flex items-start justify-between gap-3 cursor-move"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Timer
          </p>
          <p className="text-lg font-semibold text-white">{mode}</p>
        </div>

        <div className="flex gap-2">
        
          <button
            onClick={toggleRunning}
            className="rounded-full bg-[#dfb259] p-2 text-[#112250] hover:brightness-110"
          >
            {isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

        
          <button
          
            onClick={()=>{
              console.log(" clicked");
              onDelete();}}
            className="rounded-full bg-red-500 p-2 text-white hover:brightness-110"
          >
            ✕
          </button>
        </div>
      </div>

      {/* TIME */}
      <p className="mt-3 text-4xl font-bold text-white">
        {formatTime(time)}
      </p>

      {/* MODULE */}
      <p className="text-sm text-white/60">
        {moduleName ? `Module: ${moduleName}` : "No module selected"}
      </p>

      {/* NAVIGATION */}
      <button
        onClick={() => navigate("/Dashboard")}
        className="mt-4 w-full rounded-full bg-[#dfb259] px-4 py-2 text-sm font-semibold text-[#112250] hover:brightness-110"
      >
        Open full timer
      </button>
    </div>
  );
}