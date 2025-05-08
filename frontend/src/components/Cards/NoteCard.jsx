import React from 'react'
import { motion } from 'framer-motion'
// import { FiEdit2, FiTrash2, FiEye, FiBookmark } from 'react-icons/fi'
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onPin,
    onDelete,
    onClick,
}) => {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 cursor-pointer overflow-visible group relative"
            onClick={onClick}
        >
            {isPinned && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full shadow-lg z-10"
                >
                    <MdPushPin className="w-4 h-4 transform rotate-45" />
                </motion.div>
            )}

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 pr-8">{title}</h3>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onPin();
                        }}
                        className={`p-2 rounded-full ${isPinned ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'} transition-colors duration-200 z-20`}
                    >
                        {isPinned ? (
                            <MdPushPin className="w-5 h-5 transform rotate-45" />
                        ) : (
                            <MdOutlinePushPin className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 group-hover:text-gray-800 transition-colors duration-200">{content}</p>

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-full border border-blue-100 shadow-sm"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">{date}</span>
                    <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        >
                            <BsEye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        >
                            <BsPencilSquare className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                        >
                            <BsTrash className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default NoteCard;
