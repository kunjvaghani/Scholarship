import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const [exploreOpen, setExploreOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const userMenuRef = useRef(null);
    const exploreMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
            if (exploreMenuRef.current && !exploreMenuRef.current.contains(e.target)) setExploreOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/'); };

    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Student Services", to: "/services" },
        { label: "Become Partner", to: "/create-scholarship" },
        { label: "Notice Board", to: "/notice" }
    ];

    return (
        <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}`} style={{ minHeight: "64px" }}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 select-none">
                    <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <span className="font-bold text-xl text-gray-800">Scholarship<span className="text-green-600">Portal</span></span>
                </Link>

                {/* Center Nav */}
                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((item) => (
                        <Link key={item.label} to={item.to} className="text-gray-600 hover:text-green-600 font-medium px-4 py-2 rounded-lg transition-colors duration-200 text-[15px]">
                            {item.label}
                        </Link>
                    ))}
                    {!isAuthenticated && (
                        <div className="relative" ref={exploreMenuRef}>
                            <button onClick={() => setExploreOpen((v) => !v)} className="flex items-center text-gray-600 hover:text-green-600 font-medium px-4 py-2 rounded-lg transition-colors duration-200 text-[15px]">
                                Explore
                                <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {exploreOpen && (
                                <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-30 py-1 animate-fade-in">
                                    <Link to="/register" className="block px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg mx-1 transition text-sm font-medium">Register</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right: Auth */}
                <div className="flex items-center space-x-3">
                    {loading ? (
                        <div className="w-7 h-7 border-3 border-dashed rounded-full animate-spin border-green-500"></div>
                    ) : (
                        <>
                            {!isAuthenticated ? (
                                <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md">
                                    Login
                                </Link>
                            ) : (
                                <div className="relative" ref={userMenuRef}>
                                    <button onClick={() => setUserMenuOpen((v) => !v)} className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition cursor-pointer">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </button>
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-30 py-1 animate-fade-in">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="font-semibold text-sm text-gray-800">Hello, {user?.firstName} {user?.lastName}</p>
                                            </div>
                                            <Link to="/dashboard" className="block px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50 transition text-sm font-medium">Dashboard</Link>
                                            <Link to="/settings" className="block px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50 transition text-sm font-medium">Settings</Link>
                                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-b-xl transition text-sm font-medium">Logout</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
                .animate-fade-in { animation: fade-in 0.2s ease-out; }
            `}</style>
        </nav>
    );
};

export default NavBar;
