import { useEffect, useRef, useState } from "react";
import { connectWS, sendWSMessage } from "./websocket";
import api from "../api/axios";

export default function ChatWindow({ receiver }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    const sender = localStorage.getItem("username");
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        api.get(`/api/messages/${receiver}`)
            .then(res => setMessages(res.data))
            .finally(() => setLoading(false));
    }, [receiver]);

    // WebSocket connection
    useEffect(() => {
        connectWS(msg => {
            setMessages(prev => [...prev, msg]);
        });
    }, []);

    // Auto-scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = () => {
        if (!text.trim()) return;

        sendWSMessage({ receiver, content: text });
        setText("");
        inputRef.current?.focus();
    };

    return (
        <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)"
        }}>
            {/* Header */}
            <div style={{
                padding: 16,
                borderBottom: "1px solid #e5e7eb",
                background: "#ffffff",
                fontWeight: 600
            }}>
                Chat with {receiver}
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                padding: 16,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column"
            }}>
                {loading && (
                    <div style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        marginTop: 40
                    }}>
                        Loading chat...
                    </div>
                )}

                {!loading && messages.length === 0 && (
                    <div style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        marginTop: 40
                    }}>
                        No messages yet. Say hi 👋
                    </div>
                )}

                {messages.map((m, i) => {
                    const isMe = m.sender.username === sender;
                    const prev = messages[i - 1];
                    const sameSender =
                        prev && prev.sender.username === m.sender.username;

                    return (
                        <div
                            key={i}
                            style={{
                                alignSelf: isMe ? "flex-end" : "flex-start",
                                background: isMe ? "#6366f1" : "#ffffff",
                                color: isMe ? "#ffffff" : "#000000",
                                padding: "10px 14px",
                                borderRadius: 14,
                                marginTop: sameSender ? 2 : 10,
                                maxWidth: "70%",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                            }}
                        >
                            <div style={{
                                fontSize: 11,
                                opacity: 0.7,
                                marginBottom: 2
                            }}>
                                {isMe ? "You" : receiver}
                            </div>

                            <div>{m.content}</div>

                            {m.timestamp && (
                                <div style={{
                                    fontSize: 11,
                                    opacity: 0.6,
                                    marginTop: 4,
                                    textAlign: "right"
                                }}>
                                    {new Date(m.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
                padding: 12,
                display: "flex",
                gap: 8,
                background: "#ffffff",
                borderTop: "1px solid #e5e7eb"
            }}>
                <input
                    ref={inputRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid #cbd5f5"
                    }}
                    onKeyDown={e => e.key === "Enter" && send()}
                />

                <button
                    onClick={send}
                    disabled={!text.trim()}
                    style={{
                        padding: "10px 16px",
                        borderRadius: 8,
                        background: text.trim() ? "#6366f1" : "#c7d2fe",
                        color: "#ffffff",
                        border: "none",
                        cursor: text.trim() ? "pointer" : "not-allowed"
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

