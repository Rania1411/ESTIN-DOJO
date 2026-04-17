import { Send, MonitorDot } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header/Header.jsx";

export default function Chat({ selectedYear }) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Ahlem",
      text: "Does anyone have a clean summary for Analysis ?",
      time: "10:14 AM",
      isMe: false,
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "You",
      text: "I can share a cheat sheet after my timer ends.",
      time: "10:18 AM",
      isMe: true,
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: "You",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <>
      <Header year={selectedYear} />

      <div
        className="min-h-screen p-6 pt-28 text-white"
        style={{
          background:
            "linear-gradient(135deg, #0d1b3e 0%, #112250 60%, #0d1b3e 100%)",
        }}
      >
        <div
          className="rounded-3xl p-5 flex flex-col"
          style={{
            height: "82vh",
            background: "rgba(217,203,194,0.06)",
            border: "0.5px solid rgba(217,203,194,0.18)",
          }}
        >
          <div
            className="pb-4"
            style={{
              borderBottom: "0.5px solid rgba(217,203,194,0.12)",
            }}
          >
            <h2
              className="mb-3"
              style={{
                color: "var(--sand)",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {selectedYear ? `${selectedYear} Main Room` : "Main Room"}
            </h2>

            <div className="flex gap-2">
              <span
                className="flex items-center gap-2 text-xs px-4 py-1 rounded-full"
                style={{
                  background: "rgba(224,197,143,0.2)",
                  color: "#0d1b3e",
                  fontWeight: "500",
                }}
              >
                <MonitorDot size={12} />
                28 online now
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isMe ? "justify-end" : "items-end gap-2"
                }`}
              >
                {!msg.isMe && (
                  <>
                    <img
                      src={msg.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full"
                      style={{
                        border: "1.5px solid rgba(217,203,194,0.2)",
                      }}
                    />

                    <div style={{ maxWidth: "65%" }}>
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(217,203,194,0.5)" }}
                      >
                        {msg.name}
                      </div>

                      <div
                        className="px-4 py-2 text-sm"
                        style={{
                          background: "rgba(217,203,194,0.13)",
                          border: "0.5px solid rgba(217,203,194,0.18)",
                          borderRadius: "18px 18px 18px 5px",
                          color: "#D9CBC2",
                        }}
                      >
                        {msg.text}
                      </div>

                      <div
                        className="text-xs mt-1"
                        style={{ color: "rgba(217,203,194,0.32)" }}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </>
                )}

                {msg.isMe && (
                  <div
                    className="flex flex-col items-end"
                    style={{ maxWidth: "65%" }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{ color: "rgba(217,203,194,0.5)" }}
                    >
                      {msg.name}
                    </div>

                    <div
                      className="px-4 py-2 text-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #1a3068, #0d1b3e)",
                        border: "0.5px solid rgba(224,197,143,0.25)",
                        borderRadius: "18px 18px 5px 18px",
                        color: "#D9CBC2",
                      }}
                    >
                      {msg.text}
                    </div>

                    <div
                      className="text-xs mt-1"
                      style={{ color: "rgba(217,203,194,0.32)" }}
                    >
                      {msg.time}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div ref={bottomRef}></div>
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 mt-2 rounded-full"
            style={{
              background: "rgba(217,203,194,0.08)",
              border: "0.5px solid rgba(217,203,194,0.18)",
            }}
          >
            <input
              type="text"
              placeholder={`Message ${selectedYear || "general"} room...`}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#D9CBC2" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              className="flex items-center justify-center rounded-full hover:scale-105 transition"
              style={{
                width: "36px",
                height: "36px",
                background: input.trim()
                  ? "linear-gradient(135deg, #c9a96e, #E0C58F)"
                  : "rgba(217,203,194,0.08)",
                color: input.trim()
                  ? "#0d1b3e"
                  : "rgba(217,203,194,0.25)",
                cursor: input.trim() ? "pointer" : "not-allowed",
              }}
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
 
