import React from "react";

const steps = [
    {
        gif: "https://d2w7l1p59qkl0r.cloudfront.net/static/images/newb4s-steps.gif",
        title: "Register & Create Profile",
        info: "Share a few quick details to register instantly. Unlock personalized options, expert guidance, and support.",
        step: "01"
    },
    {
        gif: "https://d2w7l1p59qkl0r.cloudfront.net/static/images/newb4s-steps2.gif",
        title: "Find Matching Scholarships",
        info: "Get personalized scholarship alerts tailored to your profile. Never miss an opportunity that matches your goals.",
        step: "02"
    },
    {
        gif: "https://d2w7l1p59qkl0r.cloudfront.net/static/images/newb4s-steps3.gif",
        title: "Apply & Track Progress",
        info: "Explore over 10,000 scholarships. Apply with a few clicks and track your application status from your dashboard.",
        step: "03"
    }
];

const ApplicationSteps = () => (
    <div className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">

            <div className="text-center mb-12">
                <span className="inline-block text-green-600 font-semibold text-sm tracking-wider uppercase bg-green-100 px-4 py-1.5 rounded-full mb-3">How it Works</span>
                <h2 className="text-3xl font-bold text-gray-800">Getting a <span className="text-green-600">Scholarship</span> is Easy</h2>
                <p className="mt-2 text-gray-500 text-base">Just follow these three simple steps to start your journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                    <div key={idx} className="group relative bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
                        {/* Step number */}
                        <span className="absolute top-4 right-4 text-green-200 font-bold text-4xl select-none group-hover:text-green-300 transition-colors">{step.step}</span>

                        {/* GIF */}
                        <div className="w-28 h-28 mx-auto mb-5 bg-green-50 rounded-2xl flex items-center justify-center p-3 group-hover:bg-green-100 transition-colors">
                            <img src={step.gif} alt={step.title} className="w-full h-full object-contain" loading="lazy" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.info}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ApplicationSteps;
