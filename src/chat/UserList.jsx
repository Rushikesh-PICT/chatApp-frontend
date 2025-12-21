export default function UserList({ users, onSelect }) {
    return (
        <div style={{ width: 200, borderRight: "1px solid #ccc" }}>
            <h3>Users</h3>
            {users.map(u => (
                <div
                    key={u.id}
                    onClick={() => onSelect(u.username)}
                    style={{ padding: 8, cursor: "pointer" }}
                >
                    {u.username}
                </div>
            ))}
        </div>
    );
}
