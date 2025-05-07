import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"

const PrRoutes = ({children}) => {
    const navigate = useNavigate();
    useEffect(() =>{
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
        }
    }, [navigate])
  return  children ? children : null
}

export default PrRoutes
