import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiClock, FiCalendar, FiCheckCircle, FiInfo, FiArrowRight, FiSearch } from 'react-icons/fi';

const NoticePage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const notices = {
        urgent: [
            "Post-Matric Scholarship for Minority Students (2025) ends in 3 days! Apply now.",
            "Revised income certificate requirements for Merit-cum-Means scholarship - check section 2.",
            "Results for Tata Trust Scholarship (2024-25) are now out. Click to view.",
            "Helpdesk available 24/7 during the last week of application window."
        ],
        present: [
            {
                id: 1,
                title: "Post-Matric Scholarship (Minority)",
                org: "Ministry of Minority Affairs",
                deadline: "2026-02-28",
                award: "Up to ₹12,000",
                status: "closing-soon"
            },
            {
                id: 2,
                title: "Central Sector Scheme (Univ/College)",
                org: "Department of Higher Education",
                deadline: "2026-03-15",
                award: "₹20,000 per annum",
                status: "open"
            },
            {
                id: 3,
                title: "Inspire Fellowship for Science",
                org: "Dept. of Science & Technology",
                deadline: "2026-03-31",
                award: "Full Tuition + Stipend",
                status: "open"
            }
        ],
        upcoming: [
            {
                id: 4,
                title: "Pre-Matric Scholarship (ST/SC)",
                org: "Ministry of Tribal Affairs",
                expectedIn: "April 2026",
                award: "₹5,000",
                status: "upcoming"
            },
            {
                id: 5,
                title: "ONGC Merit Scholarship",
                org: "ONGC Foundation",
                expectedIn: "May 2026",
                award: "₹48,000 per annum",
                status: "upcoming"
            }
        ],
        past: [
            {
                id: 6,
                title: "Merit-cum-Means Professional",
                org: "National Scholarship Portal",
                year: "2024-25",
                resultDate: "2025-01-15",
                status: "results-out"
            },
            {
                id: 7,
                title: "L'Oréal India For Young Women",
                org: "L'Oréal Foundation",
                year: "2024",
                resultDate: "2024-11-20",
                status: "completed"
            }
        ]
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'closing-soon':
                return <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-black uppercase rounded-full flex items-center"><FiClock className="mr-1" /> Ends Soon</span>;
            case 'open':
                return <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-black uppercase rounded-full flex items-center"><FiCheckCircle className="mr-1" /> Open</span>;
            case 'upcoming':
                return <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-black uppercase rounded-full flex items-center"><FiCalendar className="mr-1" /> Coming Soon</span>;
            case 'results-out':
                return <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-black uppercase rounded-full flex items-center"><FiInfo className="mr-1" /> Results Out</span>;
            default:
                return <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-black uppercase rounded-full">Archive</span>;
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfdfd] font-sans pb-20">
            {/* Urgent Alert Marquee */}
            <div className="bg-gray-900 overflow-hidden py-3 border-b-4 border-green-500">
                <div className="flex animate-marquee whitespace-nowrap">
                    {notices.urgent.map((text, i) => (
                        <div key={i} className="flex items-center mx-10 text-white font-bold tracking-wide">
                            <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
                            {text}
                        </div>
                    ))}
                    {/* Repeat for seamless loop */}
                    {notices.urgent.map((text, i) => (
                        <div key={`dup-${i}`} className="flex items-center mx-10 text-white font-bold tracking-wide">
                            <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Header */}
            <header className="max-w-7xl mx-auto px-4 pt-16 pb-8 text-center md:text-left md:flex md:items-end md:justify-between">
                <div>
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                        Notice <span className="text-green-600">Board</span>
                    </h1>
                    <p className="text-xl text-gray-500 mt-4 font-medium max-w-2xl">
                        Stay updated with the latest scholarship announcements, deadlines, and results in real-time.
                    </p>
                </div>
                <div className="mt-8 md:mt-0 relative w-full md:w-80 group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search notices..."
                        className="w-full pl-12 pr-6 py-4 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-green-400 text-gray-800 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 space-y-20 pt-10">

                {/* Present Scholarships */}
                <section>
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-green-600 text-2xl">
                            <FiBell />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Present Opportunities</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {notices.present.map((item, i) => (
                            <div key={item.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-50 group hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="mb-6 flex justify-between items-start">
                                    {getStatusBadge(item.status)}
                                    <span className="text-xs font-bold text-gray-400">ID: {item.id}0{item.id}</span>
                                </div>
                                <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors mb-2 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 font-bold mb-6 italic">{item.org}</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center text-gray-600 font-semibold bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <FiClock className="mr-3 text-red-500" />
                                        Deadline: {item.deadline}
                                    </div>
                                    <div className="flex items-center text-gray-600 font-semibold bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <span className="mr-3 text-green-600 text-lg font-black">₹</span>
                                        {item.award}
                                    </div>
                                </div>

                                <Link to={`/scholarship/${item.id}`} className="flex items-center justify-center w-full py-4 px-6 bg-gray-900 text-white font-bold rounded-2xl hover:bg-green-600 transition-all group-hover:shadow-lg">
                                    Apply Now <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Upcoming Scholarships */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-blue-600 text-2xl">
                                <FiCalendar />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Upcoming Schemes</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {notices.upcoming.map((item, i) => (
                            <div key={item.id} className="bg-white rounded-[2.5rem] p-10 shadow-sm border-l-8 border-blue-500 flex flex-col md:flex-row md:items-center justify-between hover:shadow-xl transition-all">
                                <div>
                                    <div className="flex items-center space-x-3 mb-4">
                                        {getStatusBadge(item.status)}
                                        <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs uppercase tracking-widest">
                                            Launching: {item.expectedIn}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-500 font-bold text-lg">{item.org}</p>
                                </div>
                                <div className="mt-8 md:mt-0 text-center md:text-right">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Award</p>
                                    <p className="text-3xl font-black text-blue-600">{item.award}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Past Scholarships */}
                <section>
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-purple-600 text-2xl">
                            <FiCheckCircle />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Past Archive & Results</h2>
                    </div>
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Scholarship Name</th>
                                        <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Batch</th>
                                        <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Results Date</th>
                                        <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {notices.past.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-8">
                                                <p className="font-extrabold text-gray-900 text-lg">{item.title}</p>
                                                <p className="text-sm text-gray-400 font-bold italic">{item.org}</p>
                                            </td>
                                            <td className="px-8 py-8 font-extrabold text-gray-600">{item.year}</td>
                                            <td className="px-8 py-8">{getStatusBadge(item.status)}</td>
                                            <td className="px-8 py-8 font-bold text-gray-500">{item.resultDate}</td>
                                            <td className="px-8 py-8 text-right">
                                                <button className="text-green-600 font-black flex items-center hover:bg-green-50 px-4 py-2 rounded-xl transition-all">
                                                    View Results <FiArrowRight className="ml-2" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default NoticePage;
