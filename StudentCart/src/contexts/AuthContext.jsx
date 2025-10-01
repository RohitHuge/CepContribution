import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'appwrite';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on app start
    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const userData = await account.get();
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.log('No user logged in');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            
            const session = await account.createEmailPasswordSession(email, password);
            const userData = await account.get();
            setUser(userData);
            
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Login failed');
            return { success: false, error: error.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, name, phone = '') => {
        try {
            setError(null);
            setLoading(true);
            
            // Create account
            const userData = await account.create(ID.unique(), email, password, name);
            
            // Auto-login after registration
            await login(email, password);
            
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Registration failed');
            return { success: false, error: error.message || 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await account.deleteSession('current');
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            setError(error.message || 'Logout failed');
            return { success: false, error: error.message || 'Logout failed' };
        }
    };

    const updateProfile = async (profileData) => {
        try {
            setError(null);
            setLoading(true);
            
            // Update user account in Appwrite
            const updatedUser = await account.updateName(profileData.name);
            
            // Update local user state
            setUser(prev => ({
                ...prev,
                ...updatedUser
            }));
            
            return { success: true };
        } catch (error) {
            console.error('Profile update error:', error);
            setError(error.message || 'Profile update failed');
            return { success: false, error: error.message || 'Profile update failed' };
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email) => {
        try {
            setError(null);
            await account.createRecovery(email, 'https://your-app-domain.com/reset-password');
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            setError(error.message || 'Password reset failed');
            return { success: false, error: error.message || 'Password reset failed' };
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        resetPassword,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
