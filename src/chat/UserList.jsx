export default function UserList({ users, selectedUser, onSelect }) {
    return (
        <div style={{
            width: 280,
            background: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            padding: 16
        }}>
            <h3 style={{ marginBottom: 12 }}>Chats</h3>

            {users.map(u => {
                const isSelected = selectedUser === u.username;

                return (
                    <div
                        key={u.id}
                        onClick={() => onSelect(u.username)}
                        style={{
                            padding: "10px 12px",
                            marginBottom: 6,
                            borderRadius: 8,
                            cursor: "pointer",
                            background: isSelected ? "#e0e7ff" : "#f8fafc",
                            border: isSelected ? "1px solid #6366f1" : "1px solid transparent",
                            fontWeight: isSelected ? 600 : 400
                        }}
                    >
                        {u.username}
                        {isSelected && (
                            <span style={{ float: "right", color: "#4f46e5" }}>
                                ●
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
