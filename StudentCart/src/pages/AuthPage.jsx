import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import ParticleBackground from '../components/ParticleBackground';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login, register, error, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the intended destination from location state
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        // Clear errors when switching between login/register
        setErrors({});
    }, [isLogin]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!isLogin) {
            if (!formData.name.trim()) {
                newErrors.name = 'Name is required';
            }

            if (!formData.confirmPassword.trim()) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            let result;
            
            if (isLogin) {
                result = await login(formData.email, formData.password);
            } else {
                result = await register(
                    formData.email, 
                    formData.password, 
                    formData.name,
                    formData.phone
                );
            }

            if (result.success) {
                // Redirect to intended destination or home
                navigate(from, { replace: true });
            } else {
                setErrors({ submit: result.error });
            }
        } catch (error) {
            setErrors({ submit: 'An unexpected error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: ''
        });
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0D0D0D] text-[#212529] dark:text-[#f7f4f4] font-['Inter'] overflow-x-hidden">
            {/* Custom Cursor */}
            <CustomCursor />
            
            {/* Particle Background */}
            <ParticleBackground />
            
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm z-50">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-black tracking-widest text-[#0077be] dark:text-[#00F0FF] font-['Orbitron']">
                        Student Cart
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
                    >
                        ← Back to Home
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 pt-24 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Auth Card */}
                    <div className="bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold font-['Orbitron'] uppercase mb-2">
                                {isLogin ? 'Welcome Back' : 'Join Student Cart'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {isLogin 
                                    ? 'Sign in to your account to continue' 
                                    : 'Create your account to start buying and selling'
                                }
                            </p>
                        </div>

                        {/* Error Message */}
                        {(error || errors.submit) && (
                            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                                <p className="text-red-700 dark:text-red-300 text-sm">
                                    {error || errors.submit}
                                </p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {!isLogin && (
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="Enter your phone number (optional)"
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                        errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {!isLogin && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                        placeholder="Confirm your password"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className="w-full bg-[#0077be] dark:bg-[#00F0FF] text-white py-3 px-4 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting || loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                                    </span>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Switch Mode */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 dark:text-gray-300">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                            </p>
                            <button
                                type="button"
                                onClick={switchMode}
                                className="text-[#0077be] dark:text-[#00F0FF] hover:underline font-medium mt-1"
                            >
                                {isLogin ? 'Sign up here' : 'Sign in here'}
                            </button>
                        </div>

                        {/* Forgot Password */}
                        {isLogin && (
                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    className="text-sm text-gray-500 hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4">
                            <div className="text-3xl mb-2">🛒</div>
                            <h3 className="font-semibold text-sm">Easy Shopping</h3>
                            <p className="text-xs text-gray-500">Browse and buy items easily</p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">💰</div>
                            <h3 className="font-semibold text-sm">Sell Items</h3>
                            <p className="text-xs text-gray-500">List your items for sale</p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-2">🔒</div>
                            <h3 className="font-semibold text-sm">Secure</h3>
                            <p className="text-xs text-gray-500">Your data is safe with us</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AuthPage;
