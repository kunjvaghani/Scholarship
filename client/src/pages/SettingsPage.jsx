import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
    const { refetchUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        gender: '',
        dateOfBirth: '',
        aadhaarNumber: '',
        address: {
            state: '',
            city: '',
            pinCode: '',
            fullAddress: '',
            domicileState: '',
        },
        guardian: {
            name: '',
            contactNumber: '',
        },
        academics: {
            qualification: '',
            courseName: '',
            stream: '',
            collegeSchoolName: '',
            rollNumber: '',
            currentYearSemester: '',
            boardUniversity: '',
            cgpaOrPercentage: '',
        },
        documents: {
            photo: null,
            aadhaarCard: null,
            incomeCertificate: null,
            casteCertificate: null,
            disabilityCertificate: null,
            previousYearResult: null,
            admissionProof: null,
            marksheet10th: null,
            marksheet12th: null,
        }
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get('/api/users/me');
                // Pre-fill form
                setFormData(prev => ({
                    ...prev,
                    ...data,
                    // Ensure nested objects are initialized if missing
                    address: { ...prev.address, ...data.address },
                    guardian: { ...prev.guardian, ...data.guardian },
                    academics: { ...prev.academics, ...data.academics },
                    // Reset documents as we only send new ones
                    documents: prev.documents
                }));
            } catch (error) {
                toast.error("Failed to load user data.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length === 0) return;

        const [section, field] = name.split('.');
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: files[0] }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const data = new FormData();
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('mobileNumber', formData.mobileNumber);
        data.append('gender', formData.gender);
        data.append('dateOfBirth', formData.dateOfBirth);
        data.append('aadhaarNumber', formData.aadhaarNumber);

        data.append('address', JSON.stringify(formData.address));
        data.append('guardian', JSON.stringify(formData.guardian));
        data.append('academics', JSON.stringify(formData.academics));

        Object.keys(formData.documents).forEach(key => {
            if (formData.documents[key] instanceof File) {
                data.append(key, formData.documents[key]);
            }
        });

        try {
            await axios.put('/api/users/profile', data);
            toast.success("Profile updated successfully!");
            if (refetchUser) await refetchUser();
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed.");
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600 mx-auto"></div>
                <h2 className="mt-4 text-xl font-bold text-gray-700">Loading profile...</h2>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 py-10 px-8 text-center sm:text-left">
                        <h1 className="text-4xl font-black text-white tracking-tight">Profile Settings</h1>
                        <p className="text-green-50 mt-2 text-lg">Update your information and manage your documents.</p>
                    </div>

                    <form className="p-8 sm:p-12 space-y-12" onSubmit={handleSubmit}>
                        {/* Personal Info */}
                        <section className="space-y-8">
                            <div className="flex items-center space-x-4">
                                <span className="bg-green-100 text-green-700 w-10 h-10 flex items-center justify-center rounded-full font-bold">01</span>
                                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide">Personal Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="Enter first name" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="Enter last name" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-400 uppercase ml-1">Email <span className="text-[10px] lowercase font-medium">(cannot be changed)</span></label>
                                    <input type="email" value={formData.email} disabled className="w-full rounded-2xl border-gray-100 shadow-none bg-gray-100 p-4 font-bold text-gray-400 cursor-not-allowed" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Mobile Number</label>
                                    <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="Enter mobile number" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Aadhaar Number</label>
                                    <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="12 digit Aadhaar number" />
                                </div>
                            </div>
                        </section>

                        {/* Address */}
                        <section className="space-y-8">
                            <div className="flex items-center space-x-4">
                                <span className="bg-green-100 text-green-700 w-10 h-10 flex items-center justify-center rounded-full font-bold">02</span>
                                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide">Communication Address</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Full Address</label>
                                    <input type="text" name="address.fullAddress" value={formData.address.fullAddress} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="Building, Street, Area" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">City</label>
                                    <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="City name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">State</label>
                                    <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="State" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Pin Code</label>
                                    <input type="text" name="address.pinCode" value={formData.address.pinCode} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="6 digit PIN code" />
                                </div>
                            </div>
                        </section>

                        {/* Academics */}
                        <section className="space-y-8">
                            <div className="flex items-center space-x-4">
                                <span className="bg-green-100 text-green-700 w-10 h-10 flex items-center justify-center rounded-full font-bold">03</span>
                                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide">Academic Info</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Highest Qualification</label>
                                    <select name="academics.qualification" value={formData.academics.qualification} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800">
                                        <option value="10th">10th Pass</option>
                                        <option value="12th">12th Pass</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Graduation">Undergraduate / Graduation</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Stream / Course</label>
                                    <input type="text" name="academics.stream" value={formData.academics.stream} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="e.g. Science, Commerce, B.Tech" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">College / School Name</label>
                                    <input type="text" name="academics.collegeSchoolName" value={formData.academics.collegeSchoolName} onChange={handleChange} className="w-full rounded-2xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 p-4 bg-gray-50 font-bold transition-all text-gray-800" placeholder="Complete name of your institution" />
                                </div>
                            </div>
                        </section>

                        {/* Documents */}
                        <section className="space-y-8">
                            <div className="flex items-center space-x-4">
                                <span className="bg-green-100 text-green-700 w-10 h-10 flex items-center justify-center rounded-full font-bold">04</span>
                                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide">Documents</h2>
                            </div>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                                <p className="text-sm font-bold text-yellow-700">Note: Only upload files if you wish to replace the ones currently on file.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Update Photo</label>
                                    <input type="file" name="documents.photo" onChange={handleFileChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-300 transition-all font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Update Aadhaar Card</label>
                                    <input type="file" name="documents.aadhaarCard" onChange={handleFileChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-300 transition-all font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Update 10th Marksheet</label>
                                    <input type="file" name="documents.marksheet10th" onChange={handleFileChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-300 transition-all font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-black text-gray-600 uppercase ml-1">Update 12th Marksheet</label>
                                    <input type="file" name="documents.marksheet12th" onChange={handleFileChange} className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer bg-gray-50 p-2 rounded-2xl border border-dashed border-gray-300 transition-all font-bold" />
                                </div>
                            </div>
                        </section>

                        <div className="pt-10">
                            <button type="submit" disabled={updating} className="w-full flex justify-center py-5 px-8 border border-transparent rounded-[1.5rem] shadow-2xl text-2xl font-black text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                {updating ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Updates...
                                    </span>
                                ) : 'Save All Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center text-gray-500 font-bold text-sm uppercase tracking-widest">
                    Scholarship Portal &copy; 2026 • Secure Profile Management
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
