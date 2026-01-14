# Deployment Guide for Project Portal System

This guide will walk you through deploying the Project Portal System to free hosting platforms.

## Prerequisites

Before you begin, you'll need accounts on the following platforms:
- GitHub (for source code hosting)
- Vercel (for frontend hosting)
- Railway (for backend hosting)
- MongoDB Atlas (for database - free tier available)

## Step 1: Prepare Your GitHub Repository

1. Create a new repository on GitHub
2. Push your project code to the repository
3. Make sure both frontend and backend are in the same repository in separate directories

## Step 2: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (choose the free tier)
4. Create a database user with username and password
5. In the Network Access section, add IP address `0.0.0.0/0` to allow all connections
6. In the Database section, create a new database user
7. Get your connection string and replace `<password>` with your database user password
8. Your connection string will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/project_portal?retryWrites=true&w=majority
   ```

## Step 3: Backend Deployment (Railway)

1. Go to [Railway](https://railway.app)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select your repository
5. Click "Deploy"
6. While the project is deploying, go to the "Variables" section
7. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure secret (you can use a password generator)
   - `FRONTEND_URL`: This will be your frontend URL from Step 4 (e.g., `https://your-frontend.vercel.app`)
8. Save the variables
9. The backend will redeploy with the new variables

## Step 4: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select your repository
5. In the configuration, set the Root Directory to `frontend`
6. Add the following environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL from Railway (e.g., `https://your-backend-production.up.railway.app`)
7. Click "Deploy"
8. Wait for the deployment to complete

## Step 5: Update Backend Environment Variables

1. Go back to your Railway project
2. Go to the "Variables" section
3. Update the `FRONTEND_URL` variable with your actual Vercel frontend URL
4. Save the changes
5. The backend will redeploy

## Step 6: Optional Services Setup

### File Storage (Cloudinary)
1. Go to [Cloudinary](https://cloudinary.com)
2. Create a free account
3. Get your Cloud Name, API Key, and API Secret
4. Add these to your Railway environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Redeploy your backend

### Email Notifications (SendGrid)
1. Go to [SendGrid](https://sendgrid.com)
2. Create a free account
3. Get your API key
4. Add to your Railway environment variables:
   - `SENDGRID_API_KEY`
5. Redeploy your backend

## Step 7: Test Your Deployment

1. Visit your frontend URL from Vercel
2. Try registering a new account
3. Test logging in
4. Create a test project
5. Verify that all functionality works as expected

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**: Check that your MongoDB URI is correct and that the IP whitelist allows connections

2. **Authentication Issues**: Ensure your JWT_SECRET is consistent between environments

3. **API Call Failures**: Verify that your NEXT_PUBLIC_API_URL is correct in the frontend

4. **File Upload Issues**: Make sure your backend CORS settings allow your frontend domain

### Debugging Tips:

1. Check the logs in both Railway and Vercel dashboards
2. Use browser developer tools to inspect network requests
3. Verify all environment variables are set correctly
4. Ensure your MongoDB database is accessible

## Environment Variables Summary

### Backend (Railway):
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=your_vercel_frontend_url
NODE_ENV=production
PORT=8080
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name (optional)
CLOUDINARY_API_KEY=your_cloudinary_api_key (optional)
CLOUDINARY_API_SECRET=your_cloudinary_api_secret (optional)
SENDGRID_API_KEY=your_sendgrid_api_key (optional)
```

### Frontend (Vercel):
```
NEXT_PUBLIC_API_URL=your_railway_backend_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name (optional)
```

## Updating Your Application

When you make changes to your code:
1. Push changes to your GitHub repository
2. Railway and Vercel will automatically redeploy your applications
3. Monitor the deployment logs for any errors

## Scaling Beyond Free Tier

When your usage exceeds free tier limits:
- Railway: Upgrade to Standard tier ($5/month)
- Vercel: Upgrade to Pro plan ($20/month)
- MongoDB Atlas: Continue using free tier or upgrade as needed
- Cloudinary: Use free tier or pay-as-you-go

## Security Best Practices

- Regularly rotate your JWT_SECRET
- Use strong passwords for all services
- Monitor your application logs for suspicious activity
- Keep dependencies updated
- Use HTTPS for all connections

## Support

If you encounter issues during deployment:
1. Check the deployment logs in Railway and Vercel
2. Verify all environment variables are correctly set
3. Ensure your MongoDB connection is properly configured
4. Consult the respective platform documentation
5. Reach out to platform support if needed