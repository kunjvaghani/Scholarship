const User = require('../models/User');
const Scholarship = require('../models/Scholarship');

// @desc    Get current user data
// @route   GET /api/users/me
exports.getMe = async (req, res) => {
    // req.user is attached by the protect middleware
    res.status(200).json(req.user);
};

// @desc    Get applications for the current user
// @route   GET /api/users/my-applications
exports.getMyApplications = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'appliedScholarships.scholarshipId',
            model: 'Scholarship',
            select: 'title award organization' // Send only needed fields
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const validApplications = user.appliedScholarships.filter(app => app.scholarshipId);

        res.status(200).json(validApplications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error while fetching applications.' });
    }
};


exports.applyToScholarship = async (req, res) => {
    try {
        const userId = req.user.id;
        const { scholarshipId } = req.params;

        // Find the user who is making the request
        const user = await User.findById(userId);

        // Check if the user has already applied to this scholarship
        const alreadyApplied = user.appliedScholarships.some(
            app => app.scholarshipId.toString() === scholarshipId
        );

        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this scholarship.' });
        }

        // Add the new application object to the array
        user.appliedScholarships.push({ scholarshipId: scholarshipId });

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Application successful!' });

    } catch (error) {
        console.error('Application Error:', error);
        res.status(500).json({ message: 'Server error during application.' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = { ...req.body };

        // Parse nested JSON strings (sent via FormData)
        if (updates.address && typeof updates.address === 'string') updates.address = JSON.parse(updates.address);
        if (updates.guardian && typeof updates.guardian === 'string') updates.guardian = JSON.parse(updates.guardian);
        if (updates.academics && typeof updates.academics === 'string') updates.academics = JSON.parse(updates.academics);

        // Handle file uploads if any
        if (req.files && Object.keys(req.files).length > 0) {
            const documentPaths = {};
            Object.keys(req.files).forEach(field => {
                documentPaths[field] = req.files[field][0].path;
            });

            // Get current user to merge existing document paths
            const user = await User.findById(userId);
            updates.documents = { ...user.documents, ...documentPaths };
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server error while updating profile.' });
    }
};