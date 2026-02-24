import React from "react";
import AnimatedNumber from "./AnimatedText";
import { Link } from "react-router-dom";

const stats = [
    {
        icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
        label: "Scholarships",
        value: 15000,
        format: v => v.toLocaleString() + "+"
    },
    {
        icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        label: "Students",
        value: 10000000,
        format: v => (v / 1000000).toFixed(1) + "M+"
    },
    {
        icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        label: "Students Helped",
        value: 128306,
        format: v => v.toLocaleString() + "+"
    },
    {
        icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        label: "Fund Managed",
        value: 600,
        format: v => `₹${v}+ Cr`
    },
];

const StatsSection = () => (
    <div className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="bg-green-50 rounded-2xl p-8 sm:p-10 border border-green-100">

                <div className="text-center mb-8">
                    <span className="inline-block text-green-600 font-semibold text-sm tracking-wider uppercase bg-green-100 px-4 py-1.5 rounded-full mb-3">Our Impact</span>
                    <h2 className="text-3xl font-bold text-gray-800">#ScholarshipsForYou</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-50">
                            <div className="flex justify-center mb-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                                <AnimatedNumber value={stat.value} duration={2500} format={stat.format} />
                            </div>
                            <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/services" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-sm">
                        Find Schemes For You
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default StatsSection;
