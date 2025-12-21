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
        <div style={{ display: "flex", height: "100vh" }}>
            <UserList users={users} onSelect={setSelectedUser} />
            {selectedUser && <ChatWindow receiver={selectedUser} />}
        </div>
    );
}
