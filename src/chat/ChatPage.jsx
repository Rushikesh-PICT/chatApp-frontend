import { useEffect, useState } from "react";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import api from "../api/axios";

export default function ChatPage() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        api.get("/api/users").then(res => setUsers(res.data));
    }, []);

    return (
        <div style={{
            display: "flex",
            height: "100vh",
            background: "#f8fafc"
        }}>
            <UserList
                users={users}
                selectedUser={selectedUser}
                onSelect={setSelectedUser}
            />

            {selectedUser ? (
                <ChatWindow receiver={selectedUser} />
            ) : (
                <div style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: "#64748b"
                }}>
                    👈 Select a user to start chatting
                </div>
            )}
        </div>
    );
}
