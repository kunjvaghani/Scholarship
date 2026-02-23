import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaQuestionCircle, FaLightbulb, FaTools, FaFileAlt, FaSearch } from 'react-icons/fa';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const faqCategories = [
        {
            title: "General Information",
            icon: <FaQuestionCircle className="text-blue-500" />,
            questions: [
                {
                    q: "What is the Scholarship Portal?",
                    a: "The Scholarship Portal is a comprehensive platform designed to connect students with various financial aid opportunities from government agencies, private foundations, and international organizations. We simplify the search, eligibility checking, and application process to ensure no deserving student is left behind."
                },
                {
                    q: "Is there any fee to use this portal?",
                    a: "No, the portal is absolutely free for all students. We believe in providing equal access to education and financial aid without any barriers."
                },
                {
                    q: "How do I create an account?",
                    a: "You can create an account by clicking the 'Register' button in the navigation bar. You'll need to provide some basic details and verify your email to get started."
                }
            ]
        },
        {
            title: "Eligibility & Schemes",
            icon: <FaLightbulb className="text-yellow-500" />,
            questions: [
                {
                    q: "How can I find scholarships I'm eligible for?",
                    a: "Once you log in and complete your profile, our smart filtering system will automatically suggest scholarships that match your academic background, income level, and other personal details. You can also use the 'Scholarship Filter' toggle in the navbar to browse manually."
                },
                {
                    q: "Can I apply for multiple scholarships?",
                    a: "Yes, you can apply for as many scholarships as you qualify for. However, please read the terms of each scholarship, as some might have restrictions on receiving funds from multiple sources concurrently."
                },
                {
                    q: "What happens if I forget my password?",
                    a: "You can easily reset your password using the 'Forgot Password' link on the login page. We'll send a reset link to your registered email address."
                }
            ]
        },
        {
            title: "Application Process",
            icon: <FaFileAlt className="text-green-500" />,
            questions: [
                {
                    q: "What documents are required for application?",
                    a: "The required documents vary by scholarship but typically include: Aadhaar Card, Income Certificate, Caste Certificate (if applicable), Marksheets of previous examinations, and Proof of Admission to your current institution."
                },
                {
                    q: "How can I check my application status?",
                    a: "You can track the progress of all your applications in the 'Dashboard' section of your profile. Statuses range from 'Under Review' to 'Approved' or 'Disbursed'."
                }
            ]
        },
        {
            title: "Technical Support",
            icon: <FaTools className="text-purple-500" />,
            questions: [
                {
                    q: "I'm having trouble uploading documents, what should I do?",
                    a: "Ensure your files are in PDF or JPEG format and do not exceed 2MB per file. If the problem persists, try clearing your browser cache or using a different browser. You can also contact our support team for assistance."
                }
            ]
        }
    ];

    const toggleFAQ = (id) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <header className="relative py-20 bg-green-700 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-extrabold text-white mb-6 animate-fade-in-down">
                        How can we <span className="text-green-300">help you?</span>
                    </h1>
                    <p className="text-xl text-green-50 max-w-2xl mx-auto mb-10 opacity-90">
                        Everything you need to know about finding and applying for your dream scholarship.
                    </p>

                    {/* Search Bar (Visual Only) */}
                    <div className="max-w-xl mx-auto relative group">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search your question..."
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border-none shadow-2xl focus:ring-2 focus:ring-green-400 text-gray-800 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* FAQ Content Section */}
            <main className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left: Illustration & Promo */}
                    <div className="lg:col-span-5 space-y-10 sticky top-24">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group transition-transform hover:-translate-y-1">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                alt="Students Studying"
                                className="w-full h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-2xl font-bold text-white">Empowering Education</h3>
                                <p className="text-gray-200 mt-2">Find the support you need to reach your goals.</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg border-b-4 border-green-500">
                            <h4 className="text-xl font-bold text-gray-800 mb-4">Still need help?</h4>
                            <p className="text-gray-600 mb-6 font-medium">Our support team is available from 9:00 AM to 5:30 PM (Mon-Fri) to assist you with any queries.</p>
                            <Link to="/contact" className="inline-flex items-center justify-center w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all hover:shadow-xl active:scale-95">
                                Contact Support
                            </Link>
                        </div>
                    </div>

                    {/* Right: FAQ Accordions */}
                    <div className="lg:col-span-7 space-y-12">
                        {faqCategories.map((category, catIndex) => (
                            <section key={catIndex} className="animate-fade-in-right" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-2xl">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight underline decoration-green-300 decoration-4 underline-offset-8">
                                        {category.title}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {category.questions.map((faq, index) => {
                                        const uniqueId = `${catIndex}-${index}`;
                                        const isOpen = openIndex === uniqueId;

                                        return (
                                            <div
                                                key={index}
                                                className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${isOpen ? 'ring-2 ring-green-100 shadow-md' : 'hover:border-green-200'}`}
                                            >
                                                <button
                                                    onClick={() => toggleFAQ(uniqueId)}
                                                    className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                                                >
                                                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-green-700' : 'text-gray-800'}`}>
                                                        {faq.q}
                                                    </span>
                                                    <FaChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-500' : ''}`} />
                                                </button>

                                                <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
                                                    <div className="px-6 pb-6 pt-0">
                                                        <div className="w-full h-px bg-gray-50 mb-4" />
                                                        <p className="text-gray-600 font-medium leading-relaxed">
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s ease-out forwards;
                }
                .animate-fade-in-right {
                    animation: fade-in-right 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default FAQPage;
