import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { MdClear } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

const SearchBar = ({
    value,
    onChange,
    handleSearch,
    clearSearch,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full max-w-xl mx-auto transition-all duration-300 ${
                isFocused ? 'scale-105' : 'scale-100'
            }`}
        >
            <div className={`relative flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                isFocused 
                    ? 'bg-white shadow-lg ring-2 ring-blue-500/20' 
                    : 'bg-white/80 backdrop-blur-sm shadow-md'
            }`}>
                <FaMagnifyingGlass 
                    className={`text-lg transition-colors duration-300 ${
                        isFocused ? 'text-blue-500' : 'text-gray-400'
                    }`}
                />
                
                <input 
                    type="text" 
                    placeholder="Search your notes..."
                    className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder-gray-400"
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                <AnimatePresence>
                    {value && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={clearSearch}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                            <MdClear className="text-xl text-gray-400 hover:text-gray-600" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <motion.div 
                className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"
                animate={{
                    scale: isFocused ? 1.1 : 1,
                    opacity: isFocused ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

export default SearchBar;
