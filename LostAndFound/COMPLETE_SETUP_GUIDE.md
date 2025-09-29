# Complete Setup Guide - Lost and Found App

This guide will help you set up both authentication and database functionality for your Lost and Found application.

## Prerequisites

- Node.js installed on your system
- An Appwrite account (free at [cloud.appwrite.io](https://cloud.appwrite.io/))

## Step 1: Appwrite Project Setup

### 1.1 Create Appwrite Account and Project
1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)
2. Sign up for a free account
3. Click "Create Project"
4. Name: `LostAndFound`
5. Choose your preferred region

### 1.2 Get Project Credentials
1. In your project dashboard, go to "Settings" → "General"
2. Copy your:
   - **Project ID**
   - **API Endpoint** (usually `https://cloud.appwrite.io/v1`)

### 1.3 Update Configuration
You have two options for configuration:

#### Option 1: Environment Variables (Recommended)
1. Create a `.env` file in your project root
2. Add your Appwrite credentials:

```env
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=lostandfound
```

#### Option 2: Direct Configuration
Open `src/config/appwrite.js` and replace the placeholder values:

```javascript
export const PROJECT_ID = 'your-project-id';
export const ENDPOINT = 'https://cloud.appwrite.io/v1';
export const DATABASE_ID = 'lostandfound';
```

## Step 2: Authentication Setup

### 2.1 Enable Authentication
1. In your Appwrite console, go to "Auth" → "Settings"
2. Enable "Email/Password" authentication
3. Configure any additional settings as needed

## Step 3: Database Setup

### 3.1 Create Database
1. Go to "Databases" section in your Appwrite console
2. Click "Create Database"
3. Name: `lostandfound`
4. Database ID: `lostandfound`

### 3.2 Create Collection
1. Inside the `lostandfound` database
2. Click "Create Collection"
3. Collection Name: `Lost Items`
4. Collection ID: `lost_items`
5. Permissions: 
   - Create: `users` (authenticated users can create)
   - Read: `any` (anyone can read)
   - Update: `users` (authenticated users can update)
   - Delete: `users` (authenticated users can delete)

### 3.3 Create Attributes
Add each attribute with the specified configuration:

| Attribute Name | Attribute ID | Type | Size | Required | Default | Array |
|----------------|--------------|------|------|----------|---------|-------|
| item_name | item_name | string | 255 | true | - | false |
| description | description | string | 1000 | true | - | false |
| location | location | string | 255 | false | - | false |
| lost_date | lost_date | datetime | - | true | - | false |
| contact_name | contact_name | string | 255 | true | - | false |
| contact_email | contact_email | string | 255 | true | - | false |
| contact_phone | contact_phone | string | 20 | false | - | false |
| reward | reward | string | 255 | false | - | false |
| status | status | string | 20 | true | "lost" | false |
| user_id | user_id | string | 255 | true | - | false |
| image_url | image_url | string | 500 | false | - | false |
| category | category | string | 50 | false | "other" | false |

### 3.4 Create Indexes
Add these indexes for better search performance:

1. **Search Index**
   - Key: `search`
   - Type: `fulltext`
   - Attributes: `["item_name", "description", "location"]`

2. **Status Index**
   - Key: `status`
   - Type: `key`
   - Attributes: `["status"]`

3. **User Index**
   - Key: `user_id`
   - Type: `key`
   - Attributes: `["user_id"]`

4. **Date Index**
   - Key: `lost_date`
   - Type: `key`
   - Attributes: `["lost_date"]`

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run the Application

```bash
npm run dev
```

## Step 6: Test the Application

### 6.1 Test Authentication
1. Go to `/register` and create a new account
2. Go to `/login` and test login functionality
3. Verify that the navbar shows your name when logged in

### 6.2 Test Lost Item Reporting
1. Login to your account
2. Go to `/lost` and fill out the form
3. Submit the form and verify it redirects to `/found`

### 6.3 Test Found Items Display
1. Go to `/found` to see the lost items in card format
2. Test the search functionality
3. Test the category and status filters
4. Test the contact button on items

## Features Implemented

### ✅ Authentication System
- User registration with email/password
- User login with email/password
- User logout functionality
- Authentication state management
- Protected routes
- Navigation between login and register pages

### ✅ Database Integration
- Lost items CRUD operations
- Search functionality
- Category filtering
- Status filtering
- User-specific item management

### ✅ User Interface
- Modern card-based design for lost items
- Search and filter interface
- Responsive design
- Loading states and error handling
- Contact functionality for item owners

## Troubleshooting

### Common Issues

1. **"Query is not exported" error**
   - This has been fixed in the latest version
   - Make sure you have the updated `src/config/appwrite.js` file
   - The `Query` class is now properly imported and exported

2. **"Project not found" error**
   - Verify your project ID is correct in your `.env` file or `src/config/appwrite.js`
   - Make sure your Appwrite project is active

3. **Authentication not working**
   - Check that authentication is enabled in your Appwrite project
   - Verify your API endpoint is correct

4. **Database errors**
   - Ensure the database and collection are created with the exact names specified
   - Check that all attributes are created with the correct types and sizes
   - Verify permissions are set correctly

5. **Search not working**
   - Make sure the search index is created with the correct attributes
   - Check that the index type is set to "fulltext"

### Getting Help

- Check the browser console for error messages
- Verify your Appwrite project settings
- Ensure all dependencies are installed correctly

## Next Steps

Once everything is working, you can enhance the application with:

- Image upload functionality for lost items
- Email notifications when items are found
- Advanced search filters
- User profiles
- Item status updates
- Admin dashboard
- Mobile app integration

## File Structure

```
src/
├── config/
│   └── appwrite.js          # Appwrite configuration
├── contexts/
│   └── AuthContext.jsx      # Authentication context
├── services/
│   ├── authService.js       # Authentication service
│   └── lostItemsService.js  # Database service
├── components/
│   ├── LostItemCard.jsx     # Lost item display component
│   ├── LostItemCard.css     # Card styling
│   └── ProtectedRoute.jsx   # Route protection
└── App.jsx                  # Main app component

pages/
├── Login.jsx                # Login page
├── Register.jsx             # Registration page
├── LostForm.jsx             # Report lost item
└── FoundForm.jsx            # Browse found items
```

Your Lost and Found application is now fully functional with both authentication and database integration!
