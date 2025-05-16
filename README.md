# Event Feedback System

A full-stack web application for collecting and managing event feedback. Built with React.js frontend and Node.js backend.

## Project Structure

```
Event-Feedback-System/
├── frontend/               # React.js frontend application
│   ├── src/
│   │   ├── pages/         # React components for different pages
│   │   ├── components/    # Reusable React components
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
└── backend/               # Node.js backend application
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   └── server.js      # Server entry point
    ├── package.json       # Backend dependencies
    └── .env              # Environment variables
```

## Features

- User Authentication (Register/Login)
- Protected Routes
- Event Feedback Submission
- Feedback History View
- Responsive Design
- Real-time Feedback Processing

## Frontend Technologies

- React.js
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Vite as build tool

## Backend Technologies

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user

### Feedback
- POST `/api/feedback` - Submit new feedback
- GET `/api/feedback` - Get all feedback
- GET `/api/feedback/:id` - Get specific feedback

## Frontend Routes

- `/` - Login page
- `/register` - Registration page
- `/feedback` - Feedback submission page (protected)
- `/history` - Feedback history page (protected)

## Security Features

- JWT-based authentication
- Protected routes
- Password hashing
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
