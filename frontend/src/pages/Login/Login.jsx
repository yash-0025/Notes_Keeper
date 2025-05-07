import React,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link, useNavigate} from "react-router-dom"
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {
    const navigate = useNavigate();

    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();

        if(!(email)){
            setError('Invalid Email');
            console.log("Invalid Email");
            return;
        }

        if(!password) {
            setError('Password is required')
            return
        }

        setError('');
        try{
            const response = await axiosInstance.post('/login', {
                email: email,
                password:password
            });

            if(response.data.error) {
                setError(response.data.message);
                return;
            }

            if(response.data.accessToken) {
                localStorage.setItem('token', response.datt.accessToken);
                navigate('/dashboard')
            }
        } catch(error) {
            console.log(error)
        }
    }
  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7'>
                        Login
                    </h4>
                    <input type='email' placeholder='Email' className='input-box' 
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />

                    <PasswordInput 
                        password={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                    <button type='submit' className='btn-primary'>Login</button>

                    <p>
                        Not Registered Yet? {" "} <Link to='/signup' className='font-medium text-primary underline'>Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login
