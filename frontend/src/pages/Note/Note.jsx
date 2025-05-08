import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTag, FiX, FiSave, FiType } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { BsPencilSquare, BsTag, BsX } from 'react-icons/bs'
import axiosInstance from '../../utils/axiosInstance'

const Note = ({
    onClose,
    noteData,
    type,
    getAllNotes,
    showToast,
}) => {
    const [tags, setTags] = useState(noteData?.tags || []);
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (noteData) {
            setTags(noteData.tags || []);
            setTitle(noteData.title || "");
            setContent(noteData.content || "");
        } else {
            setTags([]);
            setTitle("");
            setContent("");
        }
        setError(null);
    }, [noteData]);

    const handleAddTag = (e) => {
        e.preventDefault();
        if (tagInput.trim() && tags.length < 5) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag(e);
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const clearForm = () => {
        setTags([]);
        setTitle("");
        setContent("");
        setError(null);
        setTagInput("");
    };

    const addNewNote = async () => {
        try {
            setIsSubmitting(true);
            const response = await axiosInstance.post('/notes/create-note', {
                title,
                content,
                tags,
            })
            
            if (response.data.error) {
                setError(response.data.error);
                return;
            }
            
            if (response.data.note) {
                await getAllNotes();
                clearForm();
                showToast("Note Added Successfully", "success");
                onClose();
            }
        } catch (error) {
            setError("Failed to create note. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleEditNote = async () => {
        try {
            setIsSubmitting(true);
            const response = await axiosInstance.put(`/notes/edit-note/${noteData._id}`, {
                title,
                content,
                tags,
            })
            
            if (response.data.error) {
                setError(response.data.error);
                return;
            }
            
            if (response.data.message === "Note Edited Successfully") {
                await getAllNotes();
                clearForm();
                showToast("Note Updated successfully!", "success");
                onClose();
            } else {
                setError("Failed to update note. Please try again.");
            }
        } catch (error) {
            setError("Failed to update note. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleAddNote = async (e) => {
        e?.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError("Please fill all the required fields");
            return;
        }

        setError(null);

        if (type === 'add') {
            await addNewNote();
        } else if (type === 'edit') {
            await handleEditNote();
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full bg-white rounded-2xl p-8"
        >
            <div className="flex justify-between items-center mb-8">
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                >
                    {type === "add" ? "Add New Note" : "Edit Note"}
                </motion.h2>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    <MdClose className="w-6 h-6" />
                </motion.button>
            </div>

            <form onSubmit={handleAddNote} className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <BsPencilSquare className="text-gray-400" />
                        Title
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Enter note title"
                            required
                        />
                        <BsPencilSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <BsPencilSquare className="text-gray-400" />
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[200px] resize-y"
                        placeholder="Enter note content"
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <BsTag className="text-gray-400" />
                        Tags (max 5)
                    </label>
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Add a tag and press Enter"
                                    maxLength={10}
                                />
                                <BsTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddTag}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Add
                            </motion.button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                                {tags.map((tag, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="group relative"
                                    >
                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-full text-sm font-medium shadow-sm border border-blue-100">
                                            {tag}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleRemoveTag(index)}
                                            className="absolute -top-1 -right-1 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        >
                                            <BsX className="w-3 h-3" />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.div 
                    className="flex justify-end gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium ${
                            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                {type === "add" ? "Adding..." : "Saving..."}
                            </>
                        ) : (
                            <>
                                <FiSave className="w-5 h-5" />
                                {type === "add" ? "Add Note" : "Save Changes"}
                            </>
                        )}
                    </motion.button>
                </motion.div>
            </form>
        </motion.div>
    );
};

export default Note;
