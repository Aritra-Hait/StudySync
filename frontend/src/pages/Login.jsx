import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import api from '../axios.js';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect to /notes if already logged in
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/notes");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/notes");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" text-white" >
            <div className="text-black">.</div>
            <h1 className="text-4xl font-semibold flex items-center justify-center mt-6 m-10 text-primary">StudySync</h1>
            <p className="italic text-2xl font-semibold flex items-center justify-center m-10 text-secondary mb-14">Study smarter. Sync better</p>
            <div className="flex h-screen  w-full items-baseline justify-center ">

                <form
                    onSubmit={handleLogin}
                    className="bg-slate-900 p-8 rounded-lg shadow-md w-full max-w-sm"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 rounded bg-slate-800 border border-slate-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-6 rounded bg-slate-800 border border-slate-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 transition-colors p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="mt-4 text-center text-sm text-slate-400">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-green-400 hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
