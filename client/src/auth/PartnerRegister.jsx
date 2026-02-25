import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaBuilding, FaMapMarkerAlt, FaPhone, FaGlobe, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_URL || '';

const orgTypes = ['NGO', 'Corporate', 'Government', 'Foundation', 'Other'];

// Field must be defined at MODULE scope, not inside PartnerRegisterPage,
// otherwise React treats it as a new component type on every render
// and unmounts/remounts the input — causing focus loss after each keystroke.
const Field = ({ icon: Icon, label, name, type = 'text', placeholder, required = false, form, onChange }) => (
    <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Icon size={15} />
            </div>
            <input
                type={type} name={name} value={form[name]}
                onChange={onChange} required={required}
                placeholder={placeholder}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            />
        </div>
    </div>
);

const PartnerRegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        orgName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactPerson: '',
        mobileNumber: '',
        location: '',
        websiteLink: '',
        orgType: '',
        description: ''
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            return setError('Passwords do not match.');
        }
        if (form.password.length < 6) {
            return setError('Password must be at least 6 characters.');
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/auth/partner/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Organization registered successfully! You can now log in.');
                setTimeout(() => navigate('/login'), 2500);
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/40 py-12 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl mb-4">
                        <FaBuilding className="text-green-600 text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Register Your Organization</h1>
                    <p className="text-gray-500 text-sm mt-2">Join 200+ trusted partners empowering students across India</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 text-center font-medium">
                            ✅ {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Section: Organization Info */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                                Organization Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <Field icon={FaBuilding} label="Organization Name" name="orgName" placeholder="e.g. Tata Trusts" required form={form} onChange={handleChange} />
                                </div>
                                <Field icon={FaUser} label="Contact Person Name" name="contactPerson" placeholder="Full name" required form={form} onChange={handleChange} />
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Organization Type <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                                            <FaBuilding size={15} />
                                        </div>
                                        <select
                                            name="orgType" value={form.orgType} onChange={handleChange} required
                                            className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-white appearance-none"
                                        >
                                            <option value="" disabled>Select type…</option>
                                            {orgTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Brief Description</label>
                                    <textarea
                                        name="description" value={form.description} onChange={handleChange}
                                        rows={3} placeholder="Tell us about your organization and scholarship goals…"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Contact Details */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                                Contact Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field icon={FaEnvelope} label="Email Address" name="email" type="email" placeholder="org@example.com" required form={form} onChange={handleChange} />
                                <Field icon={FaPhone} label="Mobile Number" name="mobileNumber" type="tel" placeholder="+91 98765 43210" required form={form} onChange={handleChange} />
                                <Field icon={FaMapMarkerAlt} label="Location / City" name="location" placeholder="e.g. Mumbai, Maharashtra" required form={form} onChange={handleChange} />
                                <Field icon={FaGlobe} label="Website Link" name="websiteLink" type="url" placeholder="https://yourorg.com" form={form} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Section: Security */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                                Account Security
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Password <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                                            <FaLock size={15} />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'} name="password"
                                            value={form.password} onChange={handleChange} required minLength={6}
                                            placeholder="Min 6 characters"
                                            className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-green-500 transition-colors">
                                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Confirm Password <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                                            <FaLock size={15} />
                                        </div>
                                        <input
                                            type={showConfirm ? 'text' : 'password'} name="confirmPassword"
                                            value={form.confirmPassword} onChange={handleChange} required
                                            placeholder="Re-enter password"
                                            className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-green-500 transition-colors">
                                            {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={loading}
                            className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm disabled:opacity-50 mt-2">
                            {loading ? 'Registering…' : 'Register Organization'}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Already registered?{' '}
                            <Link to="/login" className="text-green-600 font-medium hover:text-green-500">Log in as Partner</Link>
                        </p>
                    </form>
                </div>

                <p className="text-center text-xs text-gray-400 mt-5">
                    By registering you agree to our{' '}
                    <Link to="/terms" className="text-green-600 hover:underline">Terms & Conditions</Link>
                </p>
            </div>
        </div>
    );
};

export default PartnerRegisterPage;
