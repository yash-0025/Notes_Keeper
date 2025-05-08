import React, { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { motion } from 'framer-motion'
import { FaRegStickyNote } from 'react-icons/fa'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!firstName || !lastName || !email || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        try {
            console.log('Attempting signup...');
            const response = await axiosInstance.post('/user/signup', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            console.log('Signup response:', response.data);

            if (response.data.error) {
                setError(response.data.message || 'Signup failed');
                setIsLoading(false);
                return;
            }

            if (response.data.accessToken) {
                console.log('Signup successful, setting token...');
                localStorage.setItem("token", response.data.accessToken);
                
                // Clear form
                clearForm();
                
                console.log('Navigating to dashboard...');
                // Force navigation
                window.location.href = '/dashboard';
            } else {
                console.error('No access token in response:', response.data);
                setError('Signup failed: No access token received');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-block"
                        >
                            <FaRegStickyNote className="text-5xl text-white mx-auto mb-4" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-blue-100">Join us and start organizing your notes</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter first name"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter last name"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-400" />
                                    </div>
                                    <PasswordInput
                                        password={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </motion.div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
                                    isLoading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-center text-gray-600"
                            >
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                >
                                    Sign in
                                </Link>
                            </motion.p>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default SignUp;
