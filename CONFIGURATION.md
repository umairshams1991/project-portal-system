# Configuration Guide for Project Portal System

This guide provides all the configuration details you'll need to deploy the system.

## Environment Variables Reference

### Backend Environment Variables (.env)
```
# Server Configuration
NODE_ENV=production
PORT=8080

# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/project_portal?retryWrites=true&w=majority

# Security Configuration
JWT_SECRET=generate_a_secure_random_string_at_least_32_characters_long
JWT_EXPIRE=30d

# Frontend Integration
FRONTEND_URL=https://your-frontend-domain.vercel.app

# File Storage (Optional - for Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Service (Optional - for SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Frontend Environment Variables (.env.local)
```
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app

# File Storage (Optional - for Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

## Database Schema

The system will automatically create the following collections in MongoDB:

1. `users` - Stores user information with hashed passwords
2. `projects` - Stores project information
3. `monitoring` - Stores monitoring reports
4. `milestones` - Stores project milestones
5. `sessions` - Stores JWT session information (if implemented)

## API Routes

### Authentication Routes
- `POST /api/v1/auth/signup` - Create new user account
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/updatedetails` - Update user profile
- `PUT /api/v1/auth/updatepassword` - Change password

### Project Routes
- `GET /api/v1/projects` - Get all projects (with pagination and filtering)
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/:id` - Get specific project
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project

### Monitoring Routes
- `GET /api/v1/monitoring` - Get all monitoring reports
- `POST /api/v1/monitoring` - Create monitoring report
- `GET /api/v1/monitoring/:id` - Get specific report
- `PUT /api/v1/monitoring/:id` - Update report
- `DELETE /api/v1/monitoring/:id` - Delete report
- `PUT /api/v1/monitoring/:id/approve` - Approve report

### Milestone Routes
- `GET /api/v1/projects/:projectId/milestones` - Get milestones for project
- `POST /api/v1/projects/:projectId/milestones` - Create milestone
- `GET /api/v1/milestones/:id` - Get specific milestone
- `PUT /api/v1/milestones/:id` - Update milestone
- `DELETE /api/v1/milestones/:id` - Delete milestone

## User Roles and Permissions

The system implements role-based access control with the following roles:

1. `admin` - Full system access
2. `senior_management` - View all projects, approve reports
3. `monitoring_officer` - Review and approve reports
4. `project_director` - Manage assigned projects, submit reports
5. `department_head` - View department projects
6. `view_only` - Read-only access

## Frontend Pages

The frontend includes the following pages:

- `/` - Landing page with login
- `/dashboard` - Main dashboard
- `/projects` - Project management
- `/reports` - Report generation and management
- `/documents` - Document management

## File Upload Configuration

The system supports file uploads with the following configuration:
- Maximum file size: 50MB
- Supported file types: PDF, Word, Excel, Images, Archives
- Storage: Initially configured for local storage (can be configured for Cloudinary)

## Error Handling

The system includes comprehensive error handling:
- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication required)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource not found)
- 500: Internal Server Error

## Security Features

- Passwords are hashed using bcrypt (12 salt rounds)
- JWT tokens with expiration
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configured for frontend domain
- Helmet.js for security headers

## Performance Considerations

- Database queries are optimized with proper indexing
- Pagination implemented for large datasets
- Caching strategies can be added as needed
- Bundle optimization for frontend

## Backup and Recovery

- Database backups should be configured in MongoDB Atlas
- Regular exports of critical data
- Version control with Git for code recovery

## Monitoring and Logging

- Console logging in development
- Error tracking and monitoring
- Performance metrics
- User activity logging (implement as needed)

## Deployment Checklist

Before deploying, ensure:

- [ ] MongoDB connection string is configured
- [ ] JWT secret is set to a secure value
- [ ] Frontend and backend URLs are properly set
- [ ] CORS settings allow your frontend domain
- [ ] File upload limits are appropriate
- [ ] Environment variables are secured
- [ ] Database indexes are created
- [ ] Error handling is comprehensive
- [ ] Security headers are properly configured
- [ ] Rate limiting is implemented

## Testing Checklist

After deployment, verify:

- [ ] User registration and login work
- [ ] Project creation and management work
- [ ] Report submission and approval work
- [ ] File uploads work properly
- [ ] Dashboard displays correctly
- [ ] All API endpoints return expected responses
- [ ] Role-based access control works correctly
- [ ] Error pages display properly
- [ ] Security features are functioning
- [ ] Frontend and backend communicate correctly

## Customization Options

The system can be customized by:

- Modifying the Tailwind CSS configuration in `frontend/tailwind.config.js`
- Adding new user roles in the User model
- Extending the Project model with additional fields
- Creating new API endpoints following the existing pattern
- Adding new frontend components and pages
- Integrating with additional third-party services
- Adding new report types or formats
- Modifying the dashboard components