import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your existing page components
// Import layout components
import NavBar from './layout/NavBar';
import Footer, { ContactUsPage, FAQPage, TermsAndConditionsPage } from './layout/Footer';
import AboutUsPage from './pages/AboutUsPage';
import DashboardLayout from './layout/DashboardLayout';
import AdminLayout from './layout/AdminLayout';

// Import auth components
import LoginPage from './auth/Login';
import RegisterPage from './auth/RegisterPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';

// Import admin components
import CreateScholarship from './admin/createscholarship';
import AdminDashboard from './admin/AdminDashboard';
import AdminRoute from './admin/AdminRoute';
import AdminUserList from './admin/AdminUserList';
import AdminUserDetail from './admin/AdminUserDetail';

// Import page components
import DashboardPage from './pages/DashBoardPage';
import ScholarshipDetailPage from './pages/ScholarshipDetailPage';
import SettingsPage from './pages/SettingsPage';
// import Awarded from './pages/Awarded';

// Import services
import Services from "./services/StudentServicesPage";

// Import student components
import MyApplications from './student/MyApplications';

// Import common components
import ImageSlider from './components/common/ImageSlider';
import StatsSection from './components/common/StatsSection';
import TypingAnimation from './components/common/TypingAnimation';
import ApplicationSteps from './components/common/ApplicationSteps';
import BecomePartner from './components/common/BecomePartner';

// --- Main App Component ---
const App = () => {
    return (
        <AuthProvider>
            <Router>

                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <TypingAnimation
                                    text="Welcome To The Scholarship Portal"
                                    className="text-center text-4xl mt-10 font-bold text-green-700"
                                    duration={70}
                                />
                                <ImageSlider />
                                <StatsSection />
                                <ApplicationSteps />
                                <BecomePartner />
                            </div>
                        } />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/contact" element={<ContactUsPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/terms" element={<TermsAndConditionsPage />} />
                        <Route path="/create-scholarship" element={<CreateScholarship />} />
                        <Route path="/services" element={<Services />}></Route>
                        <Route path="/forgot-password" element={<ForgotPasswordPage />}> </Route>
                        <Route path="*" element={<div className="text-center text-2xl mt-10">Page Not Found</div>} />
                        <Route path="/scholarship/:id" element={<ScholarshipDetailPage />} />

                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="my-applications" element={<MyApplications />} />
                            <Route path="settings" element={<SettingsPage />} />
                            {/* <Route path="awarded" element={<Awarded />} /> */}
                            {/* Add routes for 'awarded' and 'settings' later */}
                        </Route>

                        <Route path="/settings" element={<SettingsPage />} />

                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="users" element={<AdminUserList />} />
                                {/* --- THIS IS THE MISSING ROUTE --- */}
                                <Route path="users/:id" element={<AdminUserDetail />} />
                                <Route path="scholarships" element={<div>Scholarships Management Page Coming Soon</div>} />
                            </Route>
                        </Route>

                    </Routes>
                </main>

                <Footer />
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
            </Router>
        </AuthProvider>
    );
};

export default App;
