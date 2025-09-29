# Appwrite Authentication Setup

This project uses Appwrite for authentication. Follow these steps to set up your Appwrite project:

## 1. Create an Appwrite Account
- Go to [Appwrite Cloud](https://cloud.appwrite.io/)
- Sign up for a free account

## 2. Create a New Project
- Click "Create Project"
- Give your project a name (e.g., "LostAndFound")
- Choose your preferred region

## 3. Get Your Project Credentials
- In your project dashboard, go to "Settings" → "General"
- Copy your:
  - **Project ID**
  - **API Endpoint** (usually `https://cloud.appwrite.io/v1`)

## 4. Update Configuration
Open `src/config/appwrite.js` and replace the placeholder values:

```javascript
client
    .setEndpoint('YOUR_API_ENDPOINT') // Replace with your API endpoint
    .setProject('YOUR_PROJECT_ID'); // Replace with your project ID
```

## 5. Enable Authentication
- In your Appwrite console, go to "Auth" → "Settings"
- Enable "Email/Password" authentication
- Configure any additional settings as needed

## 6. Test the Application
- Start your React app: `npm run dev`
- Try registering a new user
- Try logging in with the created user

## Features Implemented
- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ User logout
- ✅ Authentication state management
- ✅ Navigation between login and register pages
- ✅ Protected routes (ready to use)
- ✅ User display in navbar when logged in

## Troubleshooting
- Make sure your Appwrite project is active
- Verify your project ID and endpoint are correct
- Check the browser console for any error messages
- Ensure your Appwrite project has authentication enabled
