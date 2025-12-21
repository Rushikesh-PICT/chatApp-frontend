import api from "../api/axios";

export const login = async (data) => {
    const res = await api.post("/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
};

export const signup = async (data) => {
    const res = await api.post("/api/auth/signup", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
};

export const logout = () => {
    localStorage.clear();
};
