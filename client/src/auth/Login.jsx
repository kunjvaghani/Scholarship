import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaUserGraduate, FaBuilding } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL || '';

// Google Icon SVG
const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.08 29.613 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.841-5.841C34.553 6.08 29.613 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.22-11.303-7.583l-6.571 4.819A20.003 20.003 0 0 0 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.617 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);

// ─── Student Login Form ───────────────────────────────────────────────────────
const StudentLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleLogin}>
            {error && <p className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'} required value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all pr-11"
                        placeholder="••••••••"
                    />
                    <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-green-500 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-green-600 hover:text-green-500 font-medium">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-sm disabled:opacity-50">
                {loading ? 'Logging in…' : 'Log in as Student'}
            </button>

            <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-600 font-medium hover:text-green-500">Register here</Link>
            </p>
        </form>
    );
};

// ─── Partner Login Form ───────────────────────────────────────────────────────
const PartnerLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/auth/partner/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('partnerToken', data.token);
                localStorage.setItem('partnerOrgName', data.orgName);
                navigate('/');
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleLogin}>
            {error && <p className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Organization Email</label>
                <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="org@example.com"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'} required value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all pr-11"
                        placeholder="••••••••"
                    />
                    <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-green-500 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                </div>
            </div>

            <button type="submit" disabled={loading}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-sm disabled:opacity-50">
                {loading ? 'Logging in…' : 'Log in as Partner'}
            </button>

            <p className="text-center text-sm text-gray-500">
                Not registered yet?{' '}
                <Link to="/partner-register" className="text-green-600 font-medium hover:text-green-500">Register your organization</Link>
            </p>
        </form>
    );
};

// ─── Main Login Page ──────────────────────────────────────────────────────────
const LoginPage = () => {
    const [tab, setTab] = useState('student'); // 'student' | 'partner'

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50/40 px-4 py-10">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Tab Switcher */}
                    <div className="grid grid-cols-2">
                        <button
                            onClick={() => setTab('student')}
                            className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300 ${tab === 'student'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                        >
                            <FaUserGraduate size={16} />
                            Login as Student
                        </button>
                        <button
                            onClick={() => setTab('partner')}
                            className={`flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300 ${tab === 'partner'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                        >
                            <FaBuilding size={16} />
                            Login as Partner
                        </button>
                    </div>

                    {/* Form Area */}
                    <div className="p-8">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tab === 'student' ? 'Student Portal' : 'Partner Portal'}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {tab === 'student'
                                    ? 'Welcome back! Log in to explore scholarships.'
                                    : 'Welcome back! Log in to manage your scholarship programs.'}
                            </p>
                        </div>

                        {/* Google login only for students */}
                        {tab === 'student' && (
                            <>
                                <button
                                    type="button"
                                    className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all mb-5 shadow-sm"
                                >
                                    <GoogleIcon />
                                    Continue with Google
                                </button>
                                <div className="relative flex items-center justify-center mb-5">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <span className="relative px-3 bg-white text-xs text-gray-400">or continue with email</span>
                                </div>
                            </>
                        )}

                        {tab === 'student' ? <StudentLoginForm /> : <PartnerLoginForm />}
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-5">
                    By logging in you agree to our{' '}
                    <Link to="/terms" className="text-green-600 hover:underline">Terms & Conditions</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
