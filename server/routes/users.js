const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const { getMe, getMyApplications, applyToScholarship, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: os.tmpdir() });

const fileUploadFields = [
    { name: 'photo', maxCount: 1 },
    { name: 'aadhaarCard', maxCount: 1 },
    { name: 'incomeCertificate', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
    { name: 'disabilityCertificate', maxCount: 1 },
    { name: 'previousYearResult', maxCount: 1 },
    { name: 'admissionProof', maxCount: 1 },
    { name: 'marksheet10th', maxCount: 1 },
    { name: 'marksheet12th', maxCount: 1 },
    { name: 'marksheetDiploma', maxCount: 1 },
];

// This route will get the logged-in user's data
router.get('/me', protect, getMe);

// This route will get the scholarships a user has applied to
router.get('/my-applications', protect, getMyApplications);

router.post('/apply/:scholarshipId', protect, applyToScholarship);

// New: Profile Update Route
router.put('/profile', protect, upload.fields(fileUploadFields), updateProfile);

module.exports = router;
