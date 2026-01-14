# Project Portal System

A comprehensive project management system for monitoring and tracking projects with role-based access control.

## Features

- **Role-based Access Control**: Admin, Senior Management, Monitoring Officer, Project Director, Department Head, View Only
- **Project Management**: Create, update, and track projects
- **Monitoring Reports**: Monthly progress reports with approval workflow
- **Milestone Tracking**: Track project milestones and progress
- **Document Management**: Upload and manage project documents
- **Dashboard**: Comprehensive dashboard with project statistics
- **Reporting**: Generate reports in multiple formats

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **File Storage**: Multer for local storage (configurable for cloud storage)

## Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- MongoDB (local or cloud instance)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Deployment

### Deploying Backend to Railway

1. Sign up at [Railway](https://railway.app)
2. Create a new project and connect to your GitHub repository
3. Set the following environment variables in Railway:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure JWT secret key
   - `FRONTEND_URL`: Your frontend URL (e.g., https://your-frontend.vercel.app)
   - Other variables as needed
4. Railway will automatically deploy your backend

### Deploying Frontend to Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Create a new project and connect to your GitHub repository
3. Set the following environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., https://your-backend.onrender.com)
4. Vercel will automatically deploy your frontend

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRE`: JWT expiration time (e.g., 30d for 30 days)
- `FRONTEND_URL`: URL of your frontend application
- `CLOUDINARY_*`: Cloudinary configuration (for file storage)
- `SENDGRID_API_KEY`: SendGrid API key (for email notifications)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Base URL of your backend API
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name (if using Cloudinary)

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/updatedetails` - Update user details
- `PUT /api/v1/auth/updatepassword` - Update password

### Projects
- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create a new project
- `GET /api/v1/projects/:id` - Get a specific project
- `PUT /api/v1/projects/:id` - Update a project
- `DELETE /api/v1/projects/:id` - Delete a project

### Monitoring Reports
- `GET /api/v1/monitoring` - Get all monitoring reports
- `POST /api/v1/monitoring` - Create a new monitoring report
- `GET /api/v1/monitoring/:id` - Get a specific report
- `PUT /api/v1/monitoring/:id` - Update a report
- `PUT /api/v1/monitoring/:id/approve` - Approve a report

### Milestones
- `GET /api/v1/projects/:projectId/milestones` - Get milestones for a project
- `POST /api/v1/projects/:projectId/milestones` - Create a milestone
- `PUT /api/v1/milestones/:id` - Update a milestone
- `DELETE /api/v1/milestones/:id` - Delete a milestone

## Usage

1. Register an admin account through the signup form
2. Create projects through the admin interface
3. Assign project directors to projects
4. Project directors can submit monthly monitoring reports
5. Monitoring officers can approve reports
6. Use the dashboard to monitor project progress

## Security Features

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Password hashing with bcrypt
- Rate limiting to prevent abuse

## File Upload

The system supports file uploads up to 50MB with the following file types:
- Images (jpg, jpeg, png, gif)
- Documents (pdf, doc, docx)
- Spreadsheets (xls, xlsx)
- Archives (zip, rar)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.