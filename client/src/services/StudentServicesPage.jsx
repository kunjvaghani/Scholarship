import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- Helper Components ---
// const imageUrlFallback = "../public/s1.jpg"
// Collapsible Filter Section for the Sidebar
const FilterSection = ({ title, options, filterKey, selectedValues, handleFilterChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-gray-200 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center">
                <span className="font-bold text-lg text-gray-800">{title}</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`mt-4 space-y-3 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                {options.map(option => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(option)}
                            className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            onChange={(e) => handleFilterChange(filterKey, option, e.target.checked)}
                        />
                        <span className="text-gray-700 text-base group-hover:text-green-600 transition-colors">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

// Scholarship Card Component
const ScholarshipCard = ({ scholarship }) => {
    const calculateRemainingDays = (deadline) => {
        const today = new Date();
        const endDate = new Date(deadline);
        // Set time to 0 to compare dates only
        today.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        if (endDate < today) return { text: "Closed", color: "bg-red-100 text-red-800" };

        const diffTime = endDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return { text: "Ends Today", color: "bg-orange-100 text-orange-800" };

        return { text: `${diffDays} days left`, color: "bg-yellow-100 text-yellow-800" };
    };

    const remaining = calculateRemainingDays(scholarship.endDate);

    return (
        <Link to={`/scholarship/${scholarship._id}`} className="block bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            <div className="relative">
                <img src={scholarship.imageUrl || 'https://placehold.co/600x400/e6f7f6/15803d?text=Scholarship'} alt={scholarship.title} className="w-full h-40 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e6f7f6/15803d?text=Scholarship'; }}
                />
                <div className={`absolute top-3 right-3 text-sm font-bold px-3 py-1 rounded-full ${remaining.color}`}>
                    {remaining.text}
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-green-600 transition-colors">{scholarship.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{scholarship.organization}</p>
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Award</p>
                        <p className="text-lg font-bold text-green-700">{scholarship.award}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-600">Level</p>
                        <p className="text-base text-gray-800 truncate max-w-[120px]">{scholarship.educationLevel}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};


// --- Main Student Services Page Component ---
const StudentServicesPage = () => {
    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeStatus, setActiveStatus] = useState('live');
    const [filters, setFilters] = useState({
        educationLevel: [],
        state: [],
        gender: [],
        course: [],
        category: [],
    });
    const [filterOptions, setFilterOptions] = useState({
        educationLevel: [],
        state: [],
        gender: [],
        course: [],
        category: [],
    });

    // Fetch scholarships from the database on component mount
    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/scholarships');
                setScholarships(response.data);

                // Extract unique filter options from the data
                const data = response.data;
                const options = {
                    educationLevel: [...new Set(data.map(item => item.educationLevel).filter(Boolean))].sort(),
                    state: [...new Set(data.map(item => item.state).filter(Boolean))].sort(),
                    gender: [...new Set(data.map(item => item.gender).filter(Boolean))].sort(),
                    course: [...new Set(data.map(item => item.course).filter(Boolean))].sort(),
                    category: [...new Set(data.map(item => item.category).filter(Boolean))].sort(),
                };
                setFilterOptions(options);
            } catch (error) {
                console.error("Failed to fetch scholarships:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchScholarships();
    }, []);

    // Apply filters whenever scholarships, activeStatus, or filters change
    useEffect(() => {
        let result = [...scholarships];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date

        // 1. Filter by Status (Live, Upcoming, Closed)
        if (activeStatus === 'live') {
            result = result.filter(s => s.endDate && new Date(s.endDate) >= today);
        } else if (activeStatus === 'upcoming') {
            // Check if it hasn't started yet
            result = result.filter(s => s.startDate && new Date(s.startDate) > today);
        } else if (activeStatus === 'closed') {
            result = result.filter(s => s.endDate && new Date(s.endDate) < today);
        }

        // --- FIX: IMPLEMENTED FUNCTIONAL SIDEBAR FILTERING ---
        const activeFilterKeys = Object.keys(filters).filter(key => filters[key].length > 0);

        if (activeFilterKeys.length > 0) {
            result = result.filter(scholarship => {
                // A scholarship must pass every active filter category (e.g., state AND gender)
                return activeFilterKeys.every(key => {
                    const filterValues = filters[key]; // e.g., ['Gujarat', 'Maharashtra']
                    const scholarshipValue = scholarship[key]; // e.g., 'Gujarat'

                    // If the scholarship's value is in the array of selected filters, it's a match.
                    return filterValues.includes(scholarshipValue);
                });
            });
        }

        setFilteredScholarships(result);
    }, [scholarships, activeStatus, filters]);

    const handleFilterChange = (filterKey, value, isChecked) => {
        setFilters(prev => {
            const newValues = isChecked
                ? [...prev[filterKey], value]
                : prev[filterKey].filter(item => item !== value);
            return { ...prev, [filterKey]: newValues };
        });
    };

    const clearFilters = () => {
        setFilters({
            educationLevel: [],
            state: [],
            gender: [],
            course: [],
            category: [],
        });
        // Note: Checkboxes won't visually uncheck unless we make them controlled by the filters state.
        // Let's ensure the checkboxes are controlled.
    };

    return (
        <div className="w-full font-sans" style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}>
            <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* --- Left Sidebar --- */}
                    <aside className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg h-fit">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-extrabold text-gray-800">Filters</h2>
                            <button
                                onClick={clearFilters}
                                className="text-sm font-semibold text-green-600 hover:text-green-800 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                        <FilterSection title="Educational Level" options={filterOptions.educationLevel} filterKey="educationLevel" selectedValues={filters.educationLevel} handleFilterChange={handleFilterChange} />
                        <FilterSection title="State" options={filterOptions.state} filterKey="state" selectedValues={filters.state} handleFilterChange={handleFilterChange} />
                        <FilterSection title="Gender" options={filterOptions.gender} filterKey="gender" selectedValues={filters.gender} handleFilterChange={handleFilterChange} />
                        <FilterSection title="Course" options={filterOptions.course} filterKey="course" selectedValues={filters.course} handleFilterChange={handleFilterChange} />
                        <FilterSection title="Category" options={filterOptions.category} filterKey="category" selectedValues={filters.category} handleFilterChange={handleFilterChange} />
                    </aside>

                    {/* --- Right Main Content --- */}
                    <main className="lg:col-span-3">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Scholarships for Indian Students</h1>

                        {/* Status Buttons */}
                        <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-gray-200 pb-4">
                            {['live', 'upcoming', 'closed'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setActiveStatus(status)}
                                    className={`px-6 py-3 font-bold text-lg rounded-full transition-all duration-300 ${activeStatus === status
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-green-50'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)} Scholarships
                                </button>
                            ))}
                        </div>

                        {/* Scholarship Grid */}
                        {loading ? (
                            <div className="text-center py-16"><p className="text-lg font-semibold text-gray-600">Loading scholarships...</p></div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredScholarships.map(scholarship => (
                                    <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
                                ))}
                            </div>
                        )}
                        {!loading && filteredScholarships.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                                <h3 className="text-2xl font-bold text-gray-700">No Scholarships Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or checking another category.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StudentServicesPage;
