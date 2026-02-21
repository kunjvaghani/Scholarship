// 16-08-2025
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const StatusButton = ({ currentStatus, newStatus, onClick, children, color }) => (
    <button
        onClick={() => onClick(newStatus)}
        disabled={currentStatus === newStatus}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${currentStatus === newStatus
            ? `${color} text-white`
            : `bg-gray-200 text-gray-700 hover:bg-gray-300`
            }`}
    >
        {children}
    </button>
);

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const { data } = await axios.get('/api/admin/applications');
            setApplications(data);
        } catch (error) {
            toast.error("Failed to fetch applications.");
            console.error("Failed to fetch applications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (userId, applicationId, status) => {
        try {
            await axios.put('/api/admin/application-status', { userId, applicationId, status });
            toast.success(`Application status updated to ${status}`);
            // Update the status in the local state for immediate feedback
            setApplications(prevApps =>
                prevApps.map(app =>
                    app.applicationId === applicationId ? { ...app, status } : app
                )
            );
        } catch (error) {
            toast.error("Failed to update status.");
            console.error("Failed to update status:", error);
        }
    };

    if (loading) return <p>Loading applications...</p>;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Scholarship Applications</h1>
            <div className="space-y-4">
                {applications.length > 0 ? applications.map(app => (
                    <div key={app.applicationId} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">{app.scholarshipTitle}</h3>
                                <p className="text-sm text-gray-600">Applicant: <span className="font-semibold">{app.userName}</span></p>
                                <p className="text-sm text-gray-500">
                                    Education: {app.userAcademics?.qualification || 'N/A'} - {app.userAcademics?.stream || 'N/A'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-blue-600">{app.status}</p>
                                <p className="text-xs text-gray-400">{new Date(app.appliedDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t flex items-center gap-2">
                            <StatusButton currentStatus={app.status} newStatus="Awarded" onClick={(status) => handleStatusUpdate(app.userId, app.applicationId, status)} color="bg-green-500">Approve</StatusButton>
                            <StatusButton currentStatus={app.status} newStatus="Rejected" onClick={(status) => handleStatusUpdate(app.userId, app.applicationId, status)} color="bg-red-500">Reject</StatusButton>
                            <StatusButton currentStatus={app.status} newStatus="In Review" onClick={(status) => handleStatusUpdate(app.userId, app.applicationId, status)} color="bg-yellow-500">In Review</StatusButton>
                        </div>
                    </div>
                )) : <p>No applications found.</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;
