const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Scholarship = require('../models/Scholarship');

// Load environment variables
dotenv.config();

const dbUri = process.env.MONGODB_URI;

if (!dbUri) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}

const seedScholarships = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB for seeding...');

        // Read the JSON file
        const jsonPath = path.join(__dirname, '../../scholarship_detail.json');
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const scholarships = JSON.parse(rawData);

        console.log(`Found ${scholarships.length} scholarships in JSON.`);

        // Clear existing scholarships (optional - use with caution)
        // await Scholarship.deleteMany({});
        // console.log('Cleared existing scholarships.');

        // Insert new scholarships
        // We use insertMany for efficiency
        await Scholarship.insertMany(scholarships);
        console.log('Scholarships inserted successfully!');

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedScholarships();
