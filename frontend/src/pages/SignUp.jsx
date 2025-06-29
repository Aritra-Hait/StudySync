import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import api from '../axios.js';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Optional: redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/notes");
        }
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/signup", { name, email, password });

            // Optional: auto-login after signup (if backend returns token + user)
            const loginRes = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", loginRes.data.token);
            localStorage.setItem("user", JSON.stringify(loginRes.data.user));

            navigate("/notes");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="  text-white">
            <div className="text-black">.</div>
            <h1 className="text-4xl font-semibold flex items-center justify-center mt-6 m-10 text-primary">StudySync</h1>
            <p className="italic text-2xl font-semibold flex items-center justify-center m-10 text-secondary mb-14">Study smarter. Sync better</p>
            <div className="flex h-screen w-full items-baseline justify-center">
                <form
                    onSubmit={handleSignup}
                    className="bg-slate-900 p-8 rounded-lg shadow-md w-full max-w-sm"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 mb-4 rounded bg-slate-800 border border-slate-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    <p className="mt-4 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <a href="/" className="text-green-400 hover:underline">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
