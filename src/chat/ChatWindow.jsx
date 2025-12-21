import { useEffect, useState } from "react";
import { connectWS, sendWSMessage } from "./websocket";
import api from "../api/axios";

export default function ChatWindow({ receiver }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const sender = localStorage.getItem("username");

    // Load history
    useEffect(() => {
        api.get(`/api/messages/${receiver}`)
            .then(res => setMessages(res.data));
    }, [receiver]);

    // WebSocket connect (once)
    useEffect(() => {
        connectWS(msg => {
            setMessages(prev => [...prev, msg]);
        });
    }, []);

    const send = () => {
        if (!text.trim()) return;

        sendWSMessage({
            sender,
            receiver,
            content: text
        });

        setText("");
    };

    return (
        <div style={{ flex: 1, padding: 20 }}>
            <h3>Chat with {receiver}</h3>

            <div style={{ height: 300, overflowY: "auto" }}>
                {messages.map((m, i) => (
                    <div key={i}>
                        <b>{m.sender}:</b> {m.content}
                    </div>
                ))}
            </div>

            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type message"
            />
            <button onClick={send}>Send</button>
        </div>
    );
}
