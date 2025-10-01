import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createProduct, uploadProductImage, getCategories } from '../lib/appwrite';
import CustomCursor from '../components/CustomCursor';
import ParticleBackground from '../components/ParticleBackground';

const ProductUpload = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        condition: 'excellent',
        location: '',
        contactInfo: ''
    });
    
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, navigate]);

    // Load categories
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.documents);
        } catch (error) {
            console.error('Error loading categories:', error);
            // Fallback to default categories
            setCategories([
                { $id: 'electronics', name: 'Electronics', icon: '📱' },
                { $id: 'books', name: 'Books', icon: '📚' },
                { $id: 'furniture', name: 'Furniture', icon: '🪑' },
                { $id: 'clothing', name: 'Clothing', icon: '👕' },
                { $id: 'sports', name: 'Sports', icon: '⚽' },
                { $id: 'other', name: 'Other', icon: '📦' }
            ]);
        }
    };

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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Limit to 5 images
            const newImages = files.slice(0, 5 - images.length);
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.contactInfo.trim()) {
            newErrors.contactInfo = 'Contact information is required';
        }

        if (images.length === 0) {
            newErrors.images = 'At least one image is required';
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
        setUploadProgress(0);
        setErrors({});

        try {
            // Upload images first
            const uploadedImages = [];
            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const uploadedFile = await uploadProductImage(file);
                uploadedImages.push(uploadedFile.$id);
                setUploadProgress(((i + 1) / images.length) * 50); // 50% for image uploads
            }

            // Create product
            const productData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price),
                category: formData.category,
                condition: formData.condition,
                location: formData.location.trim(),
                contactInfo: formData.contactInfo.trim(),
                sellerId: user.$id,
                sellerName: user.name,
                sellerEmail: user.email,
                images: uploadedImages.join(','), // Convert array to comma-separated string
                isAvailable: true,
                views: 0,
                likes: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            setUploadProgress(75);
            const product = await createProduct(productData);
            setUploadProgress(100);

            // Success - redirect to product page or home
            alert('Product uploaded successfully!');
            navigate('/');
            
        } catch (error) {
            console.error('Error uploading product:', error);
            setErrors({ submit: error.message || 'Failed to upload product' });
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0D0D0D] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077be] dark:border-[#00F0FF] mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Redirecting to login...</p>
                </div>
            </div>
        );
    }

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
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Welcome, {user?.name}
                        </span>
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 font-['Orbitron'] uppercase">
                            Sell Your Item
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            List your items for sale and connect with buyers
                        </p>
                        <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Seller Account
                        </div>
                    </div>

                    {/* Upload Form */}
                    <div className="bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                        {/* Error Message */}
                        {errors.submit && (
                            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                                <p className="text-red-700 dark:text-red-300 text-sm">
                                    {errors.submit}
                                </p>
                            </div>
                        )}

                        {/* Upload Progress */}
                        {isSubmitting && (
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Uploading...
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {Math.round(uploadProgress)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-[#0077be] dark:bg-[#00F0FF] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Product Name *
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
                                    placeholder="Enter product name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-2">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                        errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="Describe your item in detail (minimum 20 characters)"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* Price and Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium mb-2">
                                        Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                            errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                        placeholder="0.00"
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                            errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.$id} value={category.$id}>
                                                {category.icon} {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                    )}
                                </div>
                            </div>

                            {/* Condition and Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="condition" className="block text-sm font-medium mb-2">
                                        Condition
                                    </label>
                                    <select
                                        id="condition"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="excellent">Excellent</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                        <option value="poor">Poor</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                            errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                        placeholder="City, State"
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <label htmlFor="contactInfo" className="block text-sm font-medium mb-2">
                                    Contact Information *
                                </label>
                                <input
                                    type="text"
                                    id="contactInfo"
                                    name="contactInfo"
                                    value={formData.contactInfo}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0077be] dark:focus:ring-[#00F0FF] focus:border-[#0077be] dark:focus:border-[#00F0FF] ${
                                        errors.contactInfo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="Phone number or email for buyers to contact you"
                                />
                                {errors.contactInfo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Product Images * (Max 5 images)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        id="images"
                                        name="images"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="images"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <div className="text-4xl mb-2">📷</div>
                                        <p className="text-lg font-medium mb-1">Click to upload images</p>
                                        <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB each</p>
                                    </label>
                                </div>
                                
                                {/* Image Preview */}
                                {images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {errors.images && (
                                    <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-[#0077be] dark:bg-[#00F0FF] text-white rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Uploading...' : 'Upload Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductUpload;
