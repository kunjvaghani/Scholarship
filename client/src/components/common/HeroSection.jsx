import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const rotatingWords = ["Scholarship", "Opportunity", "Dream", "Future"];

const HeroSection = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlipping(true);
            setTimeout(() => {
                setWordIndex((prev) => (prev + 1) % rotatingWords.length);
                setIsFlipping(false);
            }, 400);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-green-50/40 to-emerald-50/60">

            {/* Animated floating background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large gradient orbs */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl hero-float" />
                <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-gradient-to-tr from-green-100/40 to-teal-200/20 rounded-full blur-3xl hero-float-reverse" />
                <div className="absolute top-[20%] left-[15%] w-[200px] h-[200px] bg-green-200/15 rounded-full blur-2xl hero-float-slow" />

                {/* Floating 3D geometric shapes */}
                <div className="absolute top-[15%] right-[12%] hero-float-slow">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/10 rounded-2xl border border-green-200/30 backdrop-blur-sm hero-rotate-3d shadow-lg" />
                </div>
                <div className="absolute bottom-[25%] left-[8%] hero-float">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/15 to-green-500/10 rounded-xl border border-green-200/20 backdrop-blur-sm hero-rotate-3d-reverse shadow-md" />
                </div>
                <div className="absolute top-[60%] right-[20%] hero-float-reverse">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-300/20 to-green-400/10 rounded-lg border border-green-100/30 backdrop-blur-sm hero-rotate-3d shadow-sm" />
                </div>
                <div className="absolute top-[10%] left-[10%] hero-float">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-300/15 to-emerald-400/10 rounded-3xl border border-green-200/20 backdrop-blur-sm hero-rotate-3d shadow-md" style={{ animationDelay: '2s' }} />
                </div>
                <div className="absolute bottom-[10%] right-[15%] hero-float-slow">
                    <div className="w-20 h-20 bg-gradient-to-tr from-emerald-300/10 to-teal-400/5 rounded-[2rem] border border-green-100/20 backdrop-blur-sm hero-rotate-3d-reverse shadow-xl" style={{ animationDelay: '1.5s' }} />
                </div>
                <div className="absolute top-[40%] right-[5%] hero-float-reverse">
                    <div className="w-8 h-8 bg-gradient-to-bl from-green-200/20 to-teal-300/10 rounded-lg border border-green-200/40 backdrop-blur-[2px] hero-rotate-3d shadow-sm" style={{ animationDelay: '3s' }} />
                </div>
                <div className="absolute bottom-[50%] left-[5%] hero-float-slow">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-200/15 to-green-300/10 rounded-[1.5rem] border border-green-100/30 backdrop-blur-sm hero-rotate-3d shadow-lg" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Subtle depth shapes */}
                <div className="absolute top-[25%] right-[35%] opacity-20 hero-float">
                    <div className="w-32 h-32 border-2 border-green-500/20 rounded-full hero-rotate-3d-slow" />
                </div>
                <div className="absolute bottom-[15%] left-[30%] opacity-20 hero-float-reverse">
                    <div className="w-24 h-24 border-2 border-emerald-500/15 rounded-[1rem] hero-rotate-3d-slow-reverse" />
                </div>

                <div className="absolute top-[30%] left-[30%] hero-float-slow">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full hero-pulse-glow" />
                </div>
                <div className="absolute bottom-[40%] right-[35%] hero-float">
                    <div className="w-4 h-4 bg-emerald-400/25 rounded-full hero-pulse-glow" style={{ animationDelay: '1s' }} />
                </div>
                <div className="absolute top-[70%] left-[45%] hero-float-reverse">
                    <div className="w-3 h-3 bg-teal-400/30 rounded-full hero-pulse-glow" style={{ animationDelay: '2.5s' }} />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">

                {/* Badge */}
                <div className="hero-fade-in mb-6 mt-5">
                    <span className="inline-flex items-center gap-2 text-green-700 font-semibold text-xs tracking-widest uppercase bg-green-100/80 backdrop-blur-sm px-5 py-2 rounded-full border border-green-200/50 shadow-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        India's Leading Scholarship Platform
                    </span>
                </div>

                {/* Headline with 3D rotating word */}
                <h1 className="hero-fade-in text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6" style={{ animationDelay: '0.15s' }}>
                    Your Future Starts
                    <br />
                    with the Right
                    <br />
                    <span className="inline-block relative" style={{ perspective: '600px' }}>
                        <span
                            className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 transition-all duration-400 ${isFlipping ? 'hero-flip-out' : 'hero-flip-in'}`}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {rotatingWords[wordIndex]}
                        </span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-fade-in text-gray-500 text-base sm:text-lg max-w-xl mb-10 leading-relaxed" style={{ animationDelay: '0.3s' }}>
                    Discover thousands of scholarships tailored to your profile.
                    Register, apply, and track — all in one place.
                </p>

                {/* CTA Buttons */}
                <div className="hero-fade-in flex flex-col sm:flex-row gap-4 mb-14" style={{ animationDelay: '0.45s' }}>
                    <Link to="/services" className="group relative bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-green-200/50 text-sm overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                            Explore Scholarships
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </span>
                    </Link>
                    <Link to="/register" className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 border border-gray-200 hover:border-green-300 text-sm shadow-sm hover:shadow-md">
                        Register Free
                    </Link>
                </div>

                {/* Trust ribbon */}
                <div className="hero-fade-in w-full max-w-2xl mb-5" style={{ animationDelay: '0.6s' }}>
                    <div className="flex items-center justify-center gap-6 sm:gap-10 bg-white/60 backdrop-blur-md rounded-2xl py-4 px-6 border border-green-100/50 shadow-sm">
                        {[
                            { value: "15,000+", label: "Scholarships" },
                            { value: "10M+", label: "Students" },
                            { value: "₹600Cr+", label: "Funds Managed" }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="text-lg sm:text-xl font-bold text-green-600">{item.value}</div>
                                <div className="text-[11px] sm:text-xs text-gray-400 font-medium">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes hero-fade-in {
                    from { opacity: 0; transform: translateY(25px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .hero-fade-in {
                    animation: hero-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }

                @keyframes hero-float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-10px) translateX(-5px); }
                    75% { transform: translateY(-25px) translateX(5px); }
                }
                .hero-float { animation: hero-float 8s ease-in-out infinite; }

                @keyframes hero-float-reverse {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(15px) translateX(-10px); }
                    50% { transform: translateY(5px) translateX(8px); }
                    75% { transform: translateY(20px) translateX(-5px); }
                }
                .hero-float-reverse { animation: hero-float-reverse 10s ease-in-out infinite; }

                @keyframes hero-float-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                .hero-float-slow { animation: hero-float-slow 6s ease-in-out infinite; }

                @keyframes hero-rotate-3d {
                    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                    100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg); }
                }
                .hero-rotate-3d { animation: hero-rotate-3d 20s linear infinite; }

                @keyframes hero-rotate-3d-reverse {
                    0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                    100% { transform: rotateX(-360deg) rotateY(-180deg) rotateZ(-90deg); }
                }
                .hero-rotate-3d-reverse { animation: hero-rotate-3d-reverse 25s linear infinite; }

                @keyframes hero-rotate-3d-slow {
                    0% { transform: rotateX(0deg) rotateY(0deg); }
                    100% { transform: rotateX(180deg) rotateY(360deg); }
                }
                .hero-rotate-3d-slow { animation: hero-rotate-3d-slow 40s linear infinite; }

                @keyframes hero-rotate-3d-slow-reverse {
                    0% { transform: rotateX(0deg) rotateY(0deg); }
                    100% { transform: rotateX(-180deg) rotateY(-360deg); }
                }
                .hero-rotate-3d-slow-reverse { animation: hero-rotate-3d-slow-reverse 45s linear infinite; }

                @keyframes hero-pulse-glow {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.8); opacity: 0.15; }
                }
                .hero-pulse-glow { animation: hero-pulse-glow 4s ease-in-out infinite; }

                @keyframes hero-flip-out {
                    0% { transform: rotateX(0deg); opacity: 1; }
                    100% { transform: rotateX(90deg); opacity: 0; }
                }
                @keyframes hero-flip-in {
                    0% { transform: rotateX(-90deg); opacity: 0; }
                    100% { transform: rotateX(0deg); opacity: 1; }
                }
                .hero-flip-out { animation: hero-flip-out 0.4s ease-in forwards; }
                .hero-flip-in { animation: hero-flip-in 0.4s ease-out forwards; }
            `}</style>
        </section>
    );
};

export default HeroSection;
