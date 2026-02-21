# Scholarship Portal

A comprehensive platform designed to bridge the gap between students and scholarship opportunities. This portal streamlines the application process for students while providing robust management tools for administrators.

## 🚀 Key Features

### 🎓 For Students
- **Smart Scholarship Search**: Filter scholarships by category (General, EWS, OBC, SC, ST), education level, and course.
- **Unified Profile Management**: Maintain a complete academic and personal profile, including document storage.
- **One-Click Application**: Apply to multiple scholarships using your pre-filled profile.
- **Real-time Tracking**: Monitor the status of your applications (Applied, In Review, Awarded, Rejected).
- **Document Vault**: Securely upload and manage essential documents like Aadhaar, Income Certificate, and Marksheets.

### 🛠 For Administrators
- **Dynamic Dashboard**: View platform-wide statistics including total users and active scholarships.
- **Scholarship Management**: Full CRUD operations for managing scholarship listings.
- **Application Review System**: Efficiently review student applications and update their statuses.
- **User Management**: Monitor and manage registered users on the platform.

## 💻 Tech Stack

- **Frontend**: React.js (Vite), Axios, React Router, React Icons, React Toastify.
- **Backend**: Node.js, Express.js, JWT Authentication, Multer (File Uploads), Morgan (Logging).
- **Database**: MongoDB with Mongoose ODM.
- **Deployment Ready**: Configured for Vercel deployment.

## 📁 Project Structure

```text
scholarship/
├── client/              # Frontend React application (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── controllers/ # Frontend logic (Auth, etc.)
│   │   └── App.jsx      # Main application routing
├── server/              # Backend Express application
│   ├── models/          # Mongoose schemas (User, Scholarship)
│   ├── routes/          # API endpoints
│   ├── controllers/     # Business logic
│   └── middleware/      # Authentication & Upload middleware
└── scholarship_detail.json # Sample scholarship data
```

## 🛠 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scholarship
   ```

2. **Server Setup**
   ```bash
   cd server
   npm install
   # Create a .env file based on the environment variables section below
   npm start
   ```

3. **Client Setup**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 🔐 Environment Variables

### Backend (`server/.env`)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
*Developed with ❤️ for students.*
