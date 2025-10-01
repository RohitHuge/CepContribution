// Appwrite Configuration
// Replace these values with your actual Appwrite project settings

export const APPWRITE_CONFIG = {
    // Your Appwrite endpoint URL
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    
    // Your Appwrite project ID
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'your-project-id-here',
    
    // Database ID
    databaseId: '68dc39330020e4d4be11',
    
    // Collection IDs
    collections: {
        products: 'products',
        categories: 'category'
    },
    
    // Storage bucket IDs
    storage: {
        productImages: '68dc8fca0028755b04bc'
    }
};

// Instructions for setup:
/*
1. Create a new project in Appwrite Console (https://cloud.appwrite.io)
2. Copy your Project ID and replace 'your-project-id-here'
3. Set up authentication (Email/Password) in Auth settings
4. Configure CORS for your domain (http://localhost:5173 for development)
5. Update the endpoint if you're using a self-hosted Appwrite instance
6. Copy env.example to .env and fill in your credentials
*/
