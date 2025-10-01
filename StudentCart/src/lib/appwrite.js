import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';
import { APPWRITE_CONFIG } from '../config/appwrite';

// Appwrite configuration
const client = new Client();

client
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = APPWRITE_CONFIG.databaseId;
export const COLLECTIONS = APPWRITE_CONFIG.collections;
export const STORAGE_BUCKETS = APPWRITE_CONFIG.storage;

// Authentication helper functions
export const createAccount = async (email, password, name) => {
    try {
        return await account.create(ID.unique(), email, password, name);
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};

export const createSession = async (email, password) => {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        console.error('Error getting current user:', error);
        throw error;
    }
};

export const deleteSession = async (sessionId = 'current') => {
    try {
        return await account.deleteSession(sessionId);
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
};

export const updateUserName = async (name) => {
    try {
        return await account.updateName(name);
    } catch (error) {
        console.error('Error updating user name:', error);
        throw error;
    }
};

export const updateUserEmail = async (email, password) => {
    try {
        return await account.updateEmail(email, password);
    } catch (error) {
        console.error('Error updating user email:', error);
        throw error;
    }
};

export const updateUserPassword = async (password, oldPassword) => {
    try {
        return await account.updatePassword(password, oldPassword);
    } catch (error) {
        console.error('Error updating user password:', error);
        throw error;
    }
};

export const createRecovery = async (email, url) => {
    try {
        return await account.createRecovery(email, url);
    } catch (error) {
        console.error('Error creating password recovery:', error);
        throw error;
    }
};

// Product management functions
export const createProduct = async (productData) => {
    try {
        return await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.products,
            ID.unique(),
            {
                ...productData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        );
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const getProducts = async (filters = {}) => {
    try {
        const queries = [];
        
        if (filters.category && filters.category !== 'all') {
            queries.push(Query.equal('category', filters.category));
        }
        
        if (filters.sellerId) {
            queries.push(Query.equal('sellerId', filters.sellerId));
        }
        
        if (filters.search) {
            queries.push(Query.search('name', filters.search));
        }
        
        if (filters.minPrice) {
            queries.push(Query.greaterThanEqual('price', filters.minPrice));
        }
        
        if (filters.maxPrice) {
            queries.push(Query.lessThanEqual('price', filters.maxPrice));
        }
        
        if (filters.isAvailable !== undefined) {
            queries.push(Query.equal('isAvailable', filters.isAvailable));
        }
        
        // Order by creation date (newest first)
        queries.push(Query.orderDesc('$createdAt'));
        
        return await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.products,
            queries
        );
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};

export const getProduct = async (productId) => {
    try {
        return await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.products,
            productId
        );
    } catch (error) {
        console.error('Error getting product:', error);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        return await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.products,
            productId,
            {
                ...productData,
                updatedAt: new Date().toISOString()
            }
        );
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        return await databases.deleteDocument(
            DATABASE_ID,
            COLLECTIONS.products,
            productId
        );
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Image upload functions
export const uploadProductImage = async (file) => {
    try {
        return await storage.createFile(
            STORAGE_BUCKETS.productImages,
            ID.unique(),
            file
        );
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const getProductImageUrl = (fileId) => {
    try {
        return storage.getFileView(STORAGE_BUCKETS.productImages, fileId);
    } catch (error) {
        console.error('Error getting image URL:', error);
        return null;
    }
};

// Helper function to convert images string to array
export const parseProductImages = (imagesString) => {
    if (!imagesString) return [];
    return imagesString.split(',').filter(id => id.trim() !== '');
};

// Helper function to get image URLs for a product
export const getProductImageUrls = (imagesString) => {
    const imageIds = parseProductImages(imagesString);
    return imageIds.map(id => getProductImageUrl(id.trim()));
};

export const deleteProductImage = async (fileId) => {
    try {
        return await storage.deleteFile(STORAGE_BUCKETS.productImages, fileId);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

// Category management functions
export const getCategories = async () => {
    try {
        return await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.categories,
            [Query.equal('isActive', true)]
        );
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        return await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.categories,
            ID.unique(),
            {
                ...categoryData,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        );
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export default client;
