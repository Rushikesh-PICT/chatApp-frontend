import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWS = (onMessage) => {
    const token = localStorage.getItem("token");

    stompClient = new Client({
        webSocketFactory: () =>
            new SockJS("http://localhost:8080/ws"),

        connectHeaders: {
            Authorization: `Bearer ${token}`
        },

        onConnect: () => {
            stompClient.subscribe(
                "/user/queue/messages",
                (msg) => onMessage(JSON.parse(msg.body))
            );
        }
    });

    stompClient.activate();
};

export const sendWSMessage = (message) => {
    if (!stompClient?.connected) return;

    stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(message)
    });
};
