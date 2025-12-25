import { useState } from "react";
import { signup } from "./AuthService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const submit = async () => {
        try {
            await signup(form);
            navigate("/chat");
        } catch {
            alert("Signup failed");
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div className="card">
                <h2>Signup</h2>

                <input
                    placeholder="Username"
                    onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                    }
                />

                <br /><br />

                <input
                    placeholder="Email"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <br /><br />

                <button
                    style={{ width: "100%" }}
                    onClick={submit}          // ✅ FIX
                >
                    Signup
                </button>

                <button
                    style={{
                        width: "100%",
                        marginTop: 10,
                        background: "#e5e7eb",
                        color: "#000"
                    }}
                    onClick={() => navigate("/")}
                >
                    Back
                </button>
            </div>
        </div>
    );
}
