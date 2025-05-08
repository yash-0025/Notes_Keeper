import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

const PrRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    return isAuthenticated ? children : null;
}

export default PrRoutes;
