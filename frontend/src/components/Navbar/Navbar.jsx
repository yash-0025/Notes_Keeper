import React, { useState, useEffect } from 'react'
import ProfileCard from '../Cards/ProfileCard'
import SearchBar from '../SearchBar/SearchBar'
import {FaPenFancy } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = ({ userInfo, handleSearch, getAllNotes }) => {
    const [searchNote, setSearchNote] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const clearSearch = () => {
        setSearchNote('');
        if (typeof getAllNotes === 'function') {
            getAllNotes();
        }
    }

    const handleIconClick = () => {
        const token = localStorage.getItem('token');
        token ? navigate('/dashboard') : navigate('/login');
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchNote.trim()) {
                handleSearch(searchNote);
            } else if (typeof getAllNotes === 'function') {
                getAllNotes();
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchNote, handleSearch, getAllNotes]);

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                isScrolled 
                    ? 'bg-white/80 backdrop-blur-md shadow-lg' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div 
                        onClick={handleIconClick} 
                        className="cursor-pointer group flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaPenFancy 
                            size={28} 
                            className='text-blue-600 group-hover:text-blue-700 transition-colors duration-200'
                        />
                        <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                            NotesKeeper
                        </span>
                    </motion.div>

                    <div className="flex-1 max-w-2xl mx-4">
                        <SearchBar 
                            value={searchNote} 
                            onChange={(e) => setSearchNote(e.target.value)} 
                            handleSearch={() => handleSearch(searchNote)} 
                            clearSearch={clearSearch}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center space-x-4"
                    >
                        {userInfo && (
                            <span className="hidden md:block text-sm text-gray-600">
                                Welcome, {userInfo.firstName}!
                            </span>
                        )}
                        <ProfileCard userInfo={userInfo} />
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar;
