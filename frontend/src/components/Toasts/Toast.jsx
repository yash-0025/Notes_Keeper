import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi'

const Toast = ({ isShown, message, onClose, type }) => {
    useEffect(() => {
        let timer;
        if (isShown) {
            timer = setTimeout(() => {
                onClose();
            }, 3000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isShown, onClose]);

    const getToastStyles = () => {
        switch (type) {
            case 'error':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-700',
                    icon: <FiAlertCircle className="w-5 h-5 text-red-500" />,
                };
            case 'success':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-700',
                    icon: <FiCheck className="w-5 h-5 text-green-500" />,
                };
            case 'delete':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-700',
                    icon: <FiAlertCircle className="w-5 h-5 text-red-500" />,
                };
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-700',
                    icon: <FiInfo className="w-5 h-5 text-blue-500" />,
                };
        }
    };

    const styles = getToastStyles();

    return (
        <AnimatePresence>
            {isShown && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className={`fixed bottom-4 right-4 z-50 min-w-[300px] max-w-md ${styles.bg} ${styles.border} border rounded-lg shadow-lg`}
                >
                    <div className="flex items-center p-4">
                        <div className="flex-shrink-0">
                            {styles.icon}
                        </div>
                        <div className="ml-3 flex-1">
                            <p className={`text-sm font-medium ${styles.text}`}>
                                {message}
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className={`ml-4 flex-shrink-0 p-1 rounded-full hover:bg-opacity-10 ${styles.text} hover:bg-gray-200 focus:outline-none`}
                        >
                            <FiX className="w-5 h-5" />
                        </motion.button>
                    </div>
                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 3, ease: "linear" }}
                        className={`h-1 ${type === 'error' || type === 'delete' ? 'bg-red-500' : 'bg-green-500'} rounded-b-lg`}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
