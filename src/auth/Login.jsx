import { useState } from "react";
import { login } from "./AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const submit = async () => {
        try {
            await login(form);
            navigate("/chat");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Login</h2>

            <input
                placeholder="Username"
                value={form.username}
                onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                }
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <br /><br />

            <button onClick={submit}>Login</button>
        </div>
    );
}
