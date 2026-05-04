import { Send, MonitorDot } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header/Header.jsx";
import { io } from "socket.io-client";
import axios from "axios";
import { API_URL } from "../../api";

const socket = io(API_URL);

export default function Chat({ selectedYear }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const currentUserName = currentUser.name || "Anonymous";
  const token = currentUser.token || "";

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chat`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const history = res.data.map((m) => ({
          id: m._id,
          name: m.sender?.name || "Unknown",
          text: m.content,
          time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));
        setMessages(history);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
    if (token) loadHistory();
  }, [token]);


  useEffect(() => {
    socket.on("newMessage", (data) => {
      const normalized = {
        id: data._id || Date.now(),
        name: data.sender?.name || data.name || "Unknown",
        text: data.content || data.text || "",
        time: new Date(data.createdAt || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      // Deduplicate: skip if a message with this _id already exists (own message echoed back)
      setMessages((prev) => {
        if (data._id && prev.some((m) => m.id === data._id)) return prev;
        return [...prev, normalized];
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    try {
      // Persist to DB — the backend will also emit via socket
      await axios.post(
        `${API_URL}/api/chat`,
        { content: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to send message", err);
    }
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
            {messages.map((msg) => {
              const isMe = msg.name === currentUserName;
              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isMe ? "justify-end" : "items-end gap-2"
                  }`}
                >
                  {!isMe && (
                    <>
                      <img
                        src={msg.avatar || "https://i.pravatar.cc/40?img=3"}
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

                  {isMe && (
                    <div
                      className="flex flex-col items-end"
                      style={{ maxWidth: "65%" }}
                    >
                      <div
                        className="text-xs mb-1"
                        style={{ color: "rgba(217,203,194,0.5)" }}
                      >
                        You
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
              );
            })}

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
 
