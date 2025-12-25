import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWS = (onMessage) => {
    if (stompClient?.connected) return;

    const token = localStorage.getItem("token");

    stompClient = new Client({
        brokerURL: "ws://localhost:8080/ws",
        connectHeaders: {
            token: token
        },

        debug: (str) => console.log("STOMP:", str),

        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,

        onConnect: () => {
            console.log("✅ STOMP CONNECTED");

            stompClient.subscribe(
                "/user/queue/messages",
                (msg) => onMessage(JSON.parse(msg.body))
            );
        },

        onWebSocketClose: () => {
            console.warn("⚠️ WebSocket closed");
        },

        onStompError: (frame) => {
            console.error("❌ STOMP error", frame);
        }
    });

    stompClient.activate();
};

export const sendWSMessage = (message) => {
    if (!stompClient?.connected) {
        console.warn("⚠️ Cannot send, WS not connected");
        return;
    }

    stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(message)
    });
};
