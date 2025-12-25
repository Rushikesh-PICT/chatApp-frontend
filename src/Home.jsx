import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div className="card" style={{ textAlign: "center" }}>
                <h1>Chat App</h1>
                <p>Secure real-time messaging</p>

                <button style={{ width: "100%", marginTop: 16 }}
                        onClick={() => navigate("/login")}>
                    Login
                </button>

                <button style={{
                    width: "100%",
                    marginTop: 12,
                    background: "#22c55e"
                }}
                        onClick={() => navigate("/signup")}>
                    Signup
                </button>
            </div>
        </div>
    );
}
