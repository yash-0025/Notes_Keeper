import React,{useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import Note from '../Note/Note.jsx'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import {axiosInstance} from "../../utils/axiosInstance.js"
import Toast from '../../components/Toasts/Toast.jsx'
import ViewNote from '../ViewNote/ViewNote.jsx'


const Home = () => {
  return (
    <div>
      
    </div>
  )
}

export default Home
