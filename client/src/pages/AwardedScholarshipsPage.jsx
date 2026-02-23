import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiAward, FiArrowRight, FiCheckCircle, FiSearch, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AwardedScholarshipsPage = () => {
    const [awardedScholarships, setAwardedScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAwardedScholarships = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Not authenticated");
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/api/users/my-applications', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Filter for 'Awarded' status
                const awarded = (response.data || []).filter(app => app.status === 'Awarded' && app.scholarshipId);
                setAwardedScholarships(awarded);
            } catch (err) {
                console.error("Failed to fetch awarded scholarships:", err);
                setError("Failed to load your awards. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAwardedScholarships();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <FiAward className="text-6xl text-green-300 mb-4" />
                <p className="text-xl font-bold text-gray-500">Loading your awards...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 p-8 rounded-2xl text-center">
                <p className="text-red-700 font-bold text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header Section */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-green-50 relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full opacity-50 blur-3xl"></div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-extrabold uppercase tracking-wider">
                                Success Dashboard
                            </span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Your <span className="text-green-600">Awards</span>
                        </h1>
                        <p className="text-gray-600 mt-2 text-lg font-medium">
                            Congratulations {user?.firstName}! Here are all the scholarships you have been awarded.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center bg-green-50 px-6 py-4 rounded-3xl border border-green-100">
                        <div className="p-3 bg-white rounded-2xl shadow-sm text-green-600 text-2xl mr-4">
                            <FiAward />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-green-700 uppercase">Total Awards</p>
                            <p className="text-3xl font-black text-gray-900">{awardedScholarships.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* List of Awarded Scholarships */}
            {awardedScholarships.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {awardedScholarships.map((app, index) => (
                        <div
                            key={app._id}
                            className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row animate-fade-in-right"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Decorative side bar */}
                            <div className="md:w-3 bg-green-500"></div>

                            <div className="p-8 flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 text-green-600">
                                        <FiCheckCircle className="text-xl" />
                                        <span className="text-sm font-bold uppercase tracking-widest">Officially Awarded</span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors">
                                            {app.scholarshipId.title}
                                        </h3>
                                        <p className="text-gray-500 font-bold text-lg mt-1">
                                            {app.scholarshipId.organization}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center text-gray-600 font-semibold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                            <FiDollarSign className="mr-2 text-green-600" />
                                            Award: {app.scholarshipId.award}
                                        </div>
                                        <div className="flex items-center text-gray-600 font-semibold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                            <FiCalendar className="mr-2 text-blue-500" />
                                            Awarded on: {new Date(app.appliedDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 md:mt-0">
                                    <Link
                                        to={`/scholarship/${app.scholarshipId._id}`}
                                        className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-green-600 transition-all shadow-lg hover:shadow-green-200 group/btn"
                                    >
                                        View Details
                                        <FiArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-16 rounded-[3rem] shadow-xl border border-dashed border-gray-200 text-center flex flex-col items-center">
                    <div className="p-6 bg-gray-50 rounded-full text-gray-300 text-6xl mb-6">
                        <FiSearch />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">No Awards Found</h2>
                    <p className="text-gray-500 max-w-md mx-auto text-lg font-medium mb-10">
                        You haven't been awarded any scholarships yet. Keep applying! Your hard work will pay off soon.
                    </p>
                    <Link
                        to="/services"
                        className="inline-flex items-center px-10 py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-xl hover:scale-105 active:scale-95"
                    >
                        Explore Scholarships
                        <FiArrowRight className="ml-2" />
                    </Link>
                </div>
            )}

            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .animate-fade-in-right {
                    animation: fade-in-right 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default AwardedScholarshipsPage;
