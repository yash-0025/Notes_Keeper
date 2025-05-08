import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import Note from '../Note/Note.jsx'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from "../../utils/axiosInstance.js"
import Toast from '../../components/Toasts/Toast.jsx'
import ViewNote from '../ViewNote/ViewNote.jsx'
import { motion } from 'framer-motion'

// Set Modal app element
Modal.setAppElement('#root');

const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    },
    content: {
        position: "relative",
        margin: "auto",
        width: "90%",
        maxWidth: "600px",
        height: "auto",
        maxHeight: "85vh",
        overflowY: "auto",
        top: "auto",
        left: "auto",
        right: "auto",
        bottom: "auto",
        transform: "none",
        borderRadius: "24px",
        padding: "40px",
        border: "none",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
        background: "white",
    },
};

const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    })
    const [openViewNoteModal, setOpenViewNoteModal] = useState({
        isShown: false,
        note: null,
    })

    const [showToast, setShowToast] = useState({
        isShown: false,
        message: "",
        type: "add",
    })

    const [userInfo, setUserInfo] = useState(null);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    const navigate = useNavigate();

    const getUserInfo = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/user/')
            if (response.data.error) {
                localStorage.removeItem('token');
                navigate("/login");
                return false;
            }
            if (response.data.user) {
                setUserInfo(response.data.user);
                return true;
            }
        } catch (error) {
            localStorage.removeItem('token');
            navigate("/login");
            return false;
        }
    }, [navigate]);

    const getAllNotes = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/notes/get-notes");
            if (response.data.notes) {
                setNotes(response.data.notes);
            }
        } catch (error) {
            handleShowToast("Failed to fetch notes", "error");
        }
    }, []);

    const handleShowToast = useCallback((message, type) => {
        setShowToast({
            isShown: true,
            message,
            type
        });
    }, []);

    const handleEditNote = useCallback((note) => {
        setOpenAddEditModal({
            isShown: true,
            type: "edit",
            data: note
        });
    }, []);

    const handleCloseModal = useCallback(() => {
        setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null
        });
    }, []);

    const handleNoteUpdate = useCallback(async () => {
        try {
            await getAllNotes();
            handleCloseModal();
        } catch (error) {
            handleShowToast("Failed to update notes", "error");
        }
    }, [getAllNotes, handleCloseModal, handleShowToast]);

    const handleDeleteNote = useCallback(async (note) => {
        const noteId = note._id;
        try {
            const response = await axiosInstance.delete(`/notes/delete-note/${noteId}`);
            
            if (response.data.error) {
                handleShowToast(response.data.error, "error");
                return;
            }
            
            setNotes(prevNotes => prevNotes.filter(n => n._id !== noteId));
            handleShowToast("Note Deleted Successfully", "success");
        } catch (error) {
            handleShowToast("Failed to delete note", "error");
        }
    }, [handleShowToast]);

    const onPinNote = useCallback(async (note) => {
        const noteId = note._id;
        try {
            const response = await axiosInstance.put(`/notes/pin-note/${noteId}`, {
                isPinned: !note.isPinned
            });
            
            if (response.data.error) {
                handleShowToast(response.data.error, "error");
                return;
            }
            
            setNotes(prevNotes => 
                prevNotes.map(n => 
                    n._id === noteId 
                        ? { ...n, isPinned: !n.isPinned }
                        : n
                )
            );
            
            handleShowToast(
                note.isPinned ? "Note Unpinned Successfully" : "Note Pinned Successfully",
                "success"
            );
        } catch (error) {
            handleShowToast("Failed to pin/unpin note", "error");
        }
    }, [handleShowToast]);

    const handleSearch = useCallback(async (searchNote) => {
        if (!searchNote.trim()) {
            await getAllNotes();
            setIsSearching(false);
            return;
        }
        
        setIsSearching(true);
        try {
            const response = await axiosInstance.get(`/notes/search/${encodeURIComponent(searchNote.trim())}`);
            if (response.data.notes) {
                setNotes(response.data.notes);
                if (response.data.notes.length === 0) {
                    handleShowToast("No notes found matching your search", "info");
                }
            }
        } catch (error) {
            handleShowToast("Failed to search notes", "error");
        } finally {
            setIsSearching(false);
        }
    }, [getAllNotes, handleShowToast]);

    const handleViewNote = useCallback((note) => {
        setOpenViewNoteModal({
            isShown: true,
            note
        });
    }, []);

    useEffect(() => {
        let mounted = true;

        const initializeData = async () => {
            if (!mounted) return;
            
            setIsLoading(true);
            const isAuthenticated = await getUserInfo();
            if (isAuthenticated && mounted) {
                await getAllNotes();
            }
            if (mounted) {
                setIsLoading(false);
            }
        };

        initializeData();

        return () => {
            mounted = false;
        };
    }, [getUserInfo, getAllNotes]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Navbar userInfo={userInfo} handleSearch={handleSearch} getAllNotes={getAllNotes} />

            <div className="container mx-auto px-4 py-8 mt-16">
                {isSearching ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : notes.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20"
                    >
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">No Notes Yet</h2>
                        <p className="text-gray-500 mb-8 text-lg">Create your first note to get started!</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Create Note
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                    >
                        {notes.map((note, index) => (
                            <motion.div
                                key={note._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <NoteCard
                                    title={note.title}
                                    date={new Date(note?.createdAt || new Date()).toLocaleDateString()}
                                    content={note.content}
                                    tags={note.tags}
                                    isPinned={note.isPinned}
                                    onEdit={() => handleEditNote(note)}
                                    onPin={() => onPinNote(note)}
                                    onDelete={() => handleDeleteNote(note)}
                                    onClick={() => handleViewNote(note)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
                className="fixed right-8 bottom-8 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            >
                <MdAdd className="text-4xl" />
            </motion.button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                closeTimeoutMS={200}
                style={modalStyles}
                contentLabel=""
            >
                <Note
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={handleCloseModal}
                    getAllNotes={handleNoteUpdate}
                    showToast={handleShowToast}
                />
            </Modal>

            <Modal
                isOpen={openViewNoteModal.isShown}
                onRequestClose={() => setOpenViewNoteModal({ isShown: false, note: null })}
                style={modalStyles}
                contentLabel="View Note"
            >
                <ViewNote
                    note={openViewNoteModal.note}
                    onCloseNote={() => setOpenViewNoteModal({ isShown: false })}
                />
            </Modal>

            <Toast
                isShown={showToast.isShown}
                message={showToast.message}
                onClose={() => setShowToast({ isShown: false, message: "", type: "" })}
                type={showToast.type}
            />
        </div>
    );
}

export default Home;
