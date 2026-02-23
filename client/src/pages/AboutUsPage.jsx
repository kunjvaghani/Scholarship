import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaHandHoldingHeart, FaShieldAlt, FaLightbulb, FaUsers } from 'react-icons/fa';

const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-50">
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="rgba(34, 197, 94, 0.05)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10 animate-fade-in-up">
                    <h2 className="text-green-600 font-black uppercase tracking-[0.3em] text-sm mb-6 drop-shadow-sm">About Scholarship Portal</h2>
                    <h1 className="text-5xl sm:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                        Empowering Aspirations, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Transforming Lives.</span>
                    </h1>
                    <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed font-medium">
                        We believe that financial constraints should never stand in the way of talent. Our platform is dedicated to connecting ambitious students with life-changing opportunities.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group animate-fade-in-left">
                            <div className="absolute -inset-4 bg-green-100 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                                alt="Students collaborating"
                                className="relative rounded-[2rem] shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        </div>

                        <div className="space-y-12 animate-fade-in-right">
                            <div className="space-y-4">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 font-bold text-sm border border-green-100 uppercase tracking-widest shadow-sm">Our Vision</div>
                                <h3 className="text-4xl font-black text-gray-900 leading-tight">Creating a World of Equal Educational Access</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our vision is a future where every student, regardless of their background, has the resources to pursue higher education. We are building the infrastructure for a more equitable educational landscape.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm border border-blue-100 uppercase tracking-widest shadow-sm">Our Mission</div>
                                <h3 className="text-4xl font-black text-gray-900 leading-tight">Digitalizing Scholarship Delivery</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We aim to bridge the gap between financial aid providers and deserving students through a transparent, secure, and user-friendly digital ecosystem that ensures no talent is left behind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 animate-fade-in-up">
                        <h2 className="text-4xl font-black text-gray-900">The Pillars of Our Portal</h2>
                        <div className="w-24 h-2 bg-green-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {pillars.map((pillar, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-2xl transition-all duration-300 group-hover:rotate-6 ${pillar.color}`}>
                                    {pillar.icon}
                                </div>
                                <h4 className="text-2xl font-black text-gray-900 mb-4">{pillar.title}</h4>
                                <p className="text-gray-600 leading-relaxed font-medium">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-24 px-4 bg-green-600 relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500 rounded-full opacity-50"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="space-y-2 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="text-5xl font-black text-white leading-none">{stat.value}</div>
                                <div className="text-green-100 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="py-24 bg-white px-4">
                <div className="max-w-7xl mx-auto">
                    <p className="text-center text-gray-400 font-bold uppercase tracking-[0.4em] text-xs mb-12">Proudly Supported By</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                        <img src="/f1.png" alt="Digital India" className="h-16 object-contain" />
                        <img src="/f2.png" alt="NIC" className="h-16 object-contain" />
                        <img src="/f3.png" alt="Education" className="h-16 object-contain" />
                        <img src="/f4.png" alt="MeitY" className="h-16 object-contain" />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-gray-900 to-green-900 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl animate-fade-in-up">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
                            Ready to take the <br />
                            <span className="text-green-400">next step?</span>
                        </h2>
                        <p className="text-gray-300 text-xl max-w-2xl mx-auto font-medium">
                            Join thousands of students who have already transformed their futures. Explore scholarships tailored for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                            <Link to="/register" className="bg-green-500 hover:bg-green-400 text-white font-black py-5 px-10 rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 text-lg uppercase tracking-widest">
                                Join Now
                            </Link>
                            <Link to="/" className="bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-500/10 font-black py-5 px-10 rounded-2xl transition-all text-lg uppercase tracking-widest">
                                Explore Portal
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Styles */}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                .animate-fade-in-left { animation: fade-in-left 1s ease-out forwards; }
                .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; }
            `}</style>
        </div>
    );
};

const pillars = [
    {
        icon: <FaShieldAlt />,
        title: "Transparency",
        desc: "Complete visibility into the selection and disbursement process, ensuring trust for all stakeholders.",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: <FaLightbulb />,
        title: "Innovation",
        desc: "Using cutting-edge digital infrastructure to streamline applications and eliminate red tape.",
        color: "bg-yellow-50 text-yellow-600"
    },
    {
        icon: <FaUsers />,
        title: "Empowerment",
        desc: "Focusing on the student's journey, providing not just funds but a path to professional success.",
        color: "bg-green-50 text-green-600"
    }
];

const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "₹10Cr+", label: "Disbursed" },
    { value: "200+", label: "Portals Linked" },
    { value: "98%", label: "Satisfaction" }
];

export default AboutUsPage;
