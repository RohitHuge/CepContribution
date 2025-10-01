# Appwrite Setup Guide for Student Cart

This guide will help you set up Appwrite authentication for the Student Cart application.

## Prerequisites

1. An Appwrite account (sign up at [cloud.appwrite.io](https://cloud.appwrite.io))
2. Basic understanding of Appwrite concepts

## Step 1: Create a New Project

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Click "Create Project"
3. Enter project name: "Student Cart"
4. Choose your preferred region
5. Copy the **Project ID** (you'll need this later)

## Step 2: Configure Authentication

1. In your project dashboard, go to **Auth** → **Settings**
2. Enable **Email/Password** authentication
3. Configure the following settings:
   - **Email verification**: Optional (for development)
   - **Password history**: 0 (for development)
   - **Password dictionary**: Disabled (for development)

## Step 3: Create Database and Collections

### Create Database
1. Go to **Databases** → **Create Database**
2. Name: `student-cart-db`
3. Copy the **Database ID**

### Create Collections

#### 1. Products Collection
- **Collection ID**: `products`
- **Name**: Products
- **Permissions**:
  - Create: `users` (authenticated users)
  - Read: `any` (public read)
  - Update: `users` (authenticated users)
  - Delete: `users` (authenticated users)

**Attributes:**
- `name` (String, 255, required)
- `description` (String, 1000, required)
- `price` (Float, required)
- `category` (String, 50, required)
- `condition` (String, 50, required)
- `location` (String, 100, required)
- `contactInfo` (String, 255, required)
- `sellerId` (String, 255, required)
- `sellerName` (String, 255, required)
- `sellerEmail` (String, 255, required)
- `images` (String, 1000, required) // JSON array of image file IDs
- `isAvailable` (Boolean, required, default: true)
- `views` (Integer, required, default: 0)
- `likes` (Integer, required, default: 0)
- `createdAt` (String, 255, required)
- `updatedAt` (String, 255, required)

#### 2. Categories Collection
- **Collection ID**: `categories`
- **Name**: Categories
- **Permissions**:
  - Create: `users` (authenticated users)
  - Read: `any` (public read)
  - Update: `users` (authenticated users)
  - Delete: `users` (authenticated users)

**Attributes:**
- `name` (String, 100, required)
- `description` (String, 500, optional)
- `icon` (String, 10, required) // Emoji icon
- `color` (String, 50, optional) // Tailwind color classes
- `isActive` (Boolean, required, default: true)
- `createdAt` (String, 255, required)
- `updatedAt` (String, 255, required)

## Step 4: Set up Storage

### Create Storage Bucket
1. Go to **Storage** → **Create Bucket**
2. Name: `product-images`
3. Permissions:
   - Create: `users` (authenticated users)
   - Read: `any` (public read)
   - Update: `users` (authenticated users)
   - Delete: `users` (authenticated users)
4. File size limit: 10MB
5. Allowed file extensions: jpg, jpeg, png, gif, webp

## Step 5: Configure CORS

1. Go to **Settings** → **Domains**
2. Add your development domain: `http://localhost:5173`
3. Add your production domain when ready

## Step 6: Update Configuration

1. Copy `env.example` to `.env`
2. Replace the values with your actual credentials:
   ```
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your-actual-project-id
   VITE_APPWRITE_DATABASE_ID=your-actual-database-id
   ```

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:5173/auth`
3. Try creating a new account
4. Check your Appwrite console to see if the user was created
5. Navigate to `http://localhost:5173/upload` to test product upload

## Step 8: Test Authentication and Product Upload

You can test the authentication in your browser console:

```javascript
// Test connection
window.testAppwrite.testConnection();

// Test registration
window.testAppwrite.testRegistration('test@example.com', 'password123', 'Test User');

// Test login
window.testAppwrite.testLogin('test@example.com', 'password123');
```

## Troubleshooting

### Common Issues

1. **CORS Error**: Make sure you've added your domain to the CORS settings
2. **Authentication Error**: Check if email/password auth is enabled
3. **Project ID Error**: Double-check your project ID in the config
4. **Environment Variables**: Make sure your .env file is in the root directory

### Getting Help

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord](https://discord.gg/appwrite)
- [Appwrite GitHub](https://github.com/appwrite/appwrite)

## Security Notes

- Never commit your actual project ID to version control
- Use environment variables for production
- Enable email verification for production
- Use HTTPS in production
