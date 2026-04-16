import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatTime = (seconds) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

export default function MiniTimer({
  time,
  isRunning,
  toggleRunning,
  mode,
  moduleName,
}) {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, originX: 0, originY: 0 });

  useEffect(() => {
    const initialX = window.innerWidth - 240 - 16;
    const initialY = window.innerHeight - 176 - 16;
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

    const handleMouseUp = () => {
      setDragging(false);
    };

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
      className="fixed z-50 w-60 rounded-3xl bg-[#1e3667]/95 border-2 border-[#112250]/70 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm"
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
          <p className="text-xs uppercase tracking-[0.2em] text-[#f5e0e9]/70">
            Timer
          </p>
          <p className="text-lg font-semibold text-white">{mode}</p>
        </div>
        <button
          onClick={toggleRunning}
          className="rounded-full bg-[#dfb259]/90 p-2 text-[#112250] transition hover:bg-[#e0c58f]/95"
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      </div>

      <p className="mt-3 text-4xl font-bold text-white">{formatTime(time)}</p>
      <p className="text-sm text-[#f5e0e9]/70">
        {moduleName ? `Module: ${moduleName}` : "Open Timer to select module"}
      </p>

      <button
        onClick={() => navigate("/Timer")}
        className="mt-4 w-full rounded-full bg-[#dfb259]/90 px-4 py-2 text-sm font-semibold text-[#112250] transition hover:bg-[#e0c58f]/95 cursor-pointer"
      >
        Open full timer
      </button>
    </div>
  );
}
