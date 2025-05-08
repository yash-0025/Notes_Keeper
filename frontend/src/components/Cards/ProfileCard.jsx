import React, { useState } from 'react'
import { getInitials } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLogOut } from 'react-icons/fi'

const ProfileCard = ({ userInfo }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    if (!userInfo) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
            onHoverStart={() => setIsMenuOpen(true)}
            onHoverEnd={() => setIsMenuOpen(false)}
        >
            <div className="flex items-center gap-4 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 cursor-pointer border border-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <motion.div 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-md"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {getInitials(`${userInfo.firstName} ${userInfo.lastName}`)}
                </motion.div>
                
                <div className="hidden sm:flex flex-col">
                    <span className="font-medium text-gray-800">
                        {userInfo.firstName} {userInfo.lastName}
                    </span>
                    <span className="text-xs text-gray-500">@{userInfo.email.split('@')[0]}</span>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100"
                    >
                        <motion.button
                            whileHover={{ x: 5, backgroundColor: "#fee2e2" }}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 flex items-center gap-2 transition-colors duration-200"
                            onClick={handleLogout}
                        >
                            <FiLogOut className="text-red-500" />
                            Logout
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default ProfileCard;
