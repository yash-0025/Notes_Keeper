import React from 'react'
import { motion } from 'framer-motion'
import { MdClose } from 'react-icons/md'
import { FiTag } from 'react-icons/fi'

const ViewNote = ({ note, onCloseNote }) => {
    if (!note) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative bg-white rounded-xl p-8"
        >
            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onCloseNote}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
                <MdClose size={24} />
            </motion.button>
            
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-gray-800 mb-6"
            >
                {note.title}
            </motion.h2>
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="prose max-w-none mb-6"
            >
                <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
            </motion.div>
            
            {note.tags && note.tags.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-6"
                >
                    <FiTag className="text-gray-400 mt-1" />
                    {note.tags.map((tag, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-sm rounded-full font-medium"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>
            )}
            
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-sm font-medium"
            >
                Created: {new Date(note.createdAt).toLocaleDateString()}
            </motion.p>
        </motion.div>
    )
}

export default ViewNote;
