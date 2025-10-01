// Test authentication setup
import { account, createAccount, createSession, getCurrentUser, deleteSession } from '../lib/appwrite';
import { ID } from 'appwrite';

export const testAppwriteConnection = async () => {
    try {
        console.log('Testing Appwrite connection...');
        
        // Try to get current user (will fail if not logged in, but that's expected)
        const user = await getCurrentUser();
        console.log('✅ Appwrite connection successful!');
        console.log('Current user:', user);
        return { success: true, user };
    } catch (error) {
        if (error.code === 401) {
            console.log('✅ Appwrite connection successful! (No user logged in)');
            return { success: true, user: null };
        } else {
            console.error('❌ Appwrite connection failed:', error);
            return { success: false, error: error.message };
        }
    }
};

export const testRegistration = async (email, password, name) => {
    try {
        console.log('Testing user registration...');
        const user = await createAccount(email, password, name);
        console.log('✅ User registration successful!', user);
        return { success: true, user };
    } catch (error) {
        console.error('❌ User registration failed:', error);
        return { success: false, error: error.message };
    }
};

export const testLogin = async (email, password) => {
    try {
        console.log('Testing user login...');
        const session = await createSession(email, password);
        const user = await getCurrentUser();
        console.log('✅ User login successful!', user);
        return { success: true, user };
    } catch (error) {
        console.error('❌ User login failed:', error);
        return { success: false, error: error.message };
    }
};

export const testLogout = async () => {
    try {
        console.log('Testing user logout...');
        await deleteSession();
        console.log('✅ User logout successful!');
        return { success: true };
    } catch (error) {
        console.error('❌ User logout failed:', error);
        return { success: false, error: error.message };
    }
};

// Add this to your browser console to test
window.testAppwrite = {
    testConnection: testAppwriteConnection,
    testRegistration,
    testLogin,
    testLogout
};
