import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <h1>Welcome to Chat App</h1>

            <button
                style={{ width: 120, padding: 10 }}
                onClick={() => navigate("/login")}
            >
                Login
            </button>

            <button
                style={{ width: 120, padding: 10 }}
                onClick={() => navigate("/signup")}
            >
                Signup
            </button>
        </div>
    );
}
