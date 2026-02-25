const Organization = require('../models/Organization');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/partner/register
exports.register = async (req, res) => {
    console.log('--- New Partner Registration ---');
    console.log('Body:', req.body);

    try {
        const {
            orgName, email, password, confirmPassword,
            contactPerson, mobileNumber, location,
            websiteLink, orgType, description
        } = req.body;

        // Required field validation
        if (!orgName || !email || !password || !contactPerson || !mobileNumber || !location) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const existing = await Organization.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'An organization with this email already exists.' });
        }

        const org = new Organization({
            orgName, email, password, contactPerson,
            mobileNumber, location,
            websiteLink: websiteLink || '',
            orgType: orgType || 'Other',
            description: description || ''
        });

        await org.save();
        console.log('Organization registered:', org._id);

        res.status(201).json({
            message: 'Organization registered successfully!',
            orgId: org._id
        });

    } catch (error) {
        console.error('--- PARTNER REGISTER ERROR ---:', error);
        res.status(500).json({ message: 'Server error during partner registration.' });
    }
};

// POST /api/auth/partner/login
exports.login = async (req, res) => {
    console.log('--- Partner Login Request ---');
    try {
        const { orgName, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        const org = await Organization.findOne({ email });
        if (!org) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, org.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            user: { id: org.id, role: 'partner', orgName: org.orgName }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3h' },
            (err, token) => {
                if (err) throw err;
                console.log('Partner JWT generated for:', email);
                res.json({ token, role: 'partner', orgName: org.orgName });
            }
        );

    } catch (error) {
        console.error('--- PARTNER LOGIN ERROR ---:', error);
        res.status(500).json({ message: 'Server error during partner login.' });
    }
};
