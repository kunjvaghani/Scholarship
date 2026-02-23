const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scholarshipSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    officialLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    educationLevel: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    course: {
        type: String,
        default: 'General'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        default: 'All'
    },
    award: {
        type: String,
        required: true // e.g., "₹50,000", "Up to ₹1,00,000"
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
