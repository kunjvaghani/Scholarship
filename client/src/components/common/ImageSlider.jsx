import React, { useState, useEffect, useRef } from "react";

const images = ["/i1.webp", "/i2.webp", "/i3.webp", "/i4.webp", "/i5.webp"];

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearTimeout(timeoutRef.current);
    }, [current]);

    const goToSlide = (i) => { clearTimeout(timeoutRef.current); setCurrent(i); };
    const goToPrev = () => goToSlide((current - 1 + images.length) % images.length);
    const goToNext = () => goToSlide((current + 1) % images.length);

    return (
        <div className="w-full bg-gradient-to-b from-green-50/50 to-white py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Life-Changing <span className="text-green-600">Opportunities</span></h2>
                    <p className="text-gray-500 mt-2 text-base">Discover scholarships that shape futures across India</p>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white" style={{ minHeight: "420px" }}>
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Scholarship opportunity ${i + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                            style={{ opacity: i === current ? 1 : 0 }}
                        />
                    ))}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Arrows */}
                    <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all group" aria-label="Previous">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all group" aria-label="Next">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`rounded-full transition-all duration-300 ${current === i ? 'bg-green-500 w-6 h-2.5' : 'bg-white/70 hover:bg-white w-2.5 h-2.5'}`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
