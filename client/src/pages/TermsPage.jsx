import React from 'react';
import { FaGavel, FaUserShield, FaBalanceScale, FaInfoCircle, FaFileContract } from 'react-icons/fa';

const TermsPage = () => {
    const sections = [
        {
            title: "Acceptance of Terms",
            icon: <FaGavel className="text-green-600" />,
            content: "By accessing and using this Scholarship Portal, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services."
        },
        {
            title: "User Eligibility",
            icon: <FaUserShield className="text-blue-600" />,
            content: "To register on this portal, you must be a student currently enrolled in a recognized educational institution. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
            title: "Accuracy of Information",
            icon: <FaInfoCircle className="text-yellow-600" />,
            content: "Users are required to provide true, accurate, and complete information during registration and application. Any attempt to provide fraudulent information or forged documents will lead to immediate disqualification and potential legal action."
        },
        {
            title: "Scholarship Discretion",
            icon: <FaBalanceScale className="text-purple-600" />,
            content: "The final decision regarding scholarship awards rests solely with the respective scholarship providers. Our portal acts as a facilitator and does not guarantee the approval of any application."
        },
        {
            title: "Data Privacy",
            icon: <FaFileContract className="text-red-500" />,
            content: "Your data is handled according to our Privacy Policy. We collect necessary documents and personal information solely for the purpose of scholarship processing and verification with relevant authorities."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <header className="relative py-20 bg-green-700 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="90" cy="10" r="30" fill="white" />
                        <circle cx="10" cy="90" r="20" fill="white" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-extrabold text-white mb-6 animate-fade-in-down">
                        Terms <span className="text-green-300">& Conditions</span>
                    </h1>
                    <p className="text-xl text-green-50 max-w-2xl mx-auto mb-10 opacity-90">
                        Please read these terms carefully before using the Scholarship Portal.
                    </p>
                </div>
                {/* Wave effect */}
                <div className="absolute bottom-0 left-0 w-full h-16 text-gray-50">
                    <svg viewBox="0 0 1440 120" fill="currentColor" className="w-full h-full">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </header>

            {/* Content Section */}
            <main className="max-w-5xl mx-auto px-4 py-20">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-gray-100">
                    <div className="prose prose-lg max-w-none text-gray-600">
                        <p className="text-xl font-medium text-gray-800 mb-12 border-l-4 border-green-500 pl-6 py-2 bg-green-50/50 rounded-r-xl">
                            Welcome to our Scholarship Portal. These Terms and Conditions govern your use of our platform and services.
                        </p>

                        <div className="space-y-16">
                            {sections.map((section, index) => (
                                <section key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="p-3 bg-gray-50 rounded-2xl text-3xl shadow-sm border border-gray-100">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-gray-900 m-0 tracking-tight">
                                            {index + 1}. {section.title}
                                        </h2>
                                    </div>
                                    <p className="text-lg leading-relaxed font-medium pl-14">
                                        {section.content}
                                    </p>
                                </section>
                            ))}
                        </div>

                        <div className="mt-20 p-8 bg-yellow-50 rounded-3xl border-2 border-yellow-100 animate-pulse-subtle">
                            <h4 className="text-xl font-bold text-yellow-800 mb-2">Important Notice</h4>
                            <p className="text-yellow-700 m-0 font-medium">
                                We reserves the right to modify these terms at any time. Continued use of the portal after such changes constitutes your acceptance of the new terms.
                            </p>
                        </div>

                        <div className="mt-16 text-center text-gray-400 text-sm font-bold">
                            Last Updated: February 23, 2026
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-subtle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.9; }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
                .animate-pulse-subtle {
                    animation: pulse-subtle 4s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default TermsPage;
