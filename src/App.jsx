import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ChatPage from "./chat/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected */}
            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
