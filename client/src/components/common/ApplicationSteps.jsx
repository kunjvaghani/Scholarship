import React from "react";

const steps = [
    {
        gif: "https://d2w7l1p59qkl0r.cloudfront.net/static/images/newb4s-steps.gif",
        title: "Register and Create Profile",
        info: "Share a few quick details to register instantly. Unlock personalized options, expert guidance, and support."
    },
    {
        gif: "https://d2w7l1p59qkl0r.cloudfront.net/static/images/newb4s-steps2.gif",
        title: "Find Matching Scholarships",
        info: "Get personalized scholarship alerts tailored to your profile. Never miss an opportunity that matches your goals."
    },
    {
        gif: "https://d2w7l1p59qkl0r.cloudfront.net/static/images/newb4s-steps3.gif",
        title: "Apply and Track",
        info: "Explore over 10,000 scholarships. Apply with a few clicks and track your application status directly from your dashboard."
    }
];

const ApplicationSteps = () => (
    <div className="w-full bg-slate-50 py-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* --- Section Header --- */}
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    Getting a <span className="text-green-600">Scholarship</span> is Easy
                </h2>
                {/* --- FIX: Made subtitle larger and closer to the title --- */}
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                    Just follow these three simple steps to start your journey.
                </p>
            </div>

            {/* --- Steps Container with connecting lines --- */}
            {/* --- FIX: Increased gap between cards --- */}
            <div className="relative flex flex-col md:flex-row justify-center items-center md:items-stretch gap-12 lg:gap-24">

                {/* --- FIX: Added Dotted Connecting Lines --- */}
                {/* Line 1: From card 1 to card 2 */}
                <div aria-hidden="true" className="hidden md:block absolute top-1/4 left-0 w-full h-1/2">
                    <svg className="absolute top-0 left-[23%] w-[27%]" width="100%" height="100%">
                        <path d="M0 50 C 100 0, 200 0, 300 50" stroke="#a0aec0" fill="none" strokeWidth="3" strokeDasharray="6, 8" />
                    </svg>
                </div>
                {/* Line 2: From card 2 to card 3 */}
                <div aria-hidden="true" className="hidden md:block absolute top-1/4 left-0 w-full h-1/2">
                    <svg className="absolute top-0 left-[50%] w-[27%]" width="100%" height="100%">
                        <path d="M0 50 C 100 100, 200 100, 300 50" stroke="#a0aec0" fill="none" strokeWidth="3" strokeDasharray="6, 8" />
                    </svg>
                </div>


                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="relative z-10 flex-1 flex flex-col items-center bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-3 border border-transparent hover:border-green-500 max-w-sm"
                    >
                        {/* --- FIX: Step Number Removed --- */}

                        {/* --- GIF --- */}
                        <div className="w-40 h-40 mb-6 flex items-center justify-center bg-green-50 rounded-full p-2">
                            <img
                                src={step.gif}
                                alt={`${step.title} animation`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </div>

                        {/* --- Content --- */}
                        <h3 className="text-xl font-bold text-gray-800 text-center mb-3">{step.title}</h3>
                        <p className="text-gray-600 text-center text-base">{step.info}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ApplicationSteps;
