import React from "react";
import { Link } from 'react-router-dom';

const BecomePartner = () => (
    <div className="w-full py-16 bg-green-50/50">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Left: Image */}
                <div className="flex items-center justify-center p-6">
                    <img src="/partner.jpg" alt="Partner with us" className="w-full max-w-md object-contain rounded-xl" loading="lazy" />
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-center p-8">
                    <span className="inline-block w-fit text-green-600 font-semibold text-sm tracking-wider uppercase bg-green-100 px-4 py-1.5 rounded-full mb-4">Partner Program</span>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Become a Partner</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Join our mission to create lasting opportunities for students. As a trusted partner of 200+ leading corporates and foundations, we are dedicated to advancing education through scholarship management, scholar tracking, personalized mentorship, and flexible education loans.
                    </p>

                    <Link to="/create-scholarship" className="inline-flex items-center w-fit bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-sm">
                        Get Started
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>

                    <div className="flex items-center space-x-4 mt-6 text-gray-400">
                        <span className="text-sm font-medium text-gray-500">Follow us:</span>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-600 transition-colors">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="6" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-green-600 transition-colors">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 5.92a8.38 8.38 0 01-2.36.65A4.13 4.13 0 0021.4 4.1a8.27 8.27 0 01-2.61 1A4.13 4.13 0 0012 8.13c0 .32.04.64.1.94A11.7 11.7 0 013 4.89a4.13 4.13 0 001.28 5.5A4.07 4.07 0 012.8 9.5v.05a4.13 4.13 0 003.31 4.05c-.2.05-.41.08-.62.08-.15 0-.3-.01-.45-.04a4.13 4.13 0 003.85 2.86A8.3 8.3 0 012 19.54a11.73 11.73 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0022 5.92z" fill="currentColor" /></svg>
                        </a>
                        <a href="mailto:info@example.com" aria-label="Mail" className="hover:text-green-600 transition-colors">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BecomePartner;
