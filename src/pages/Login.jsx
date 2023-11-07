import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    console.log(password);


    const handleLogin = async () => {
        try {
            if (email && password) {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log(user);
                        navigate('/home')
                        // ...
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        alert(errorMessage)
                    });
            } else {
                alert('Please enter details correctly');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='h-[100vh]  bg-[#0090ff] flex justify-center items-center'>
            <div className='md:flex p-5 gap-10 bg-slate-200 rounded-md shadow-lg duration-200 outline outline-offset-0 hover:outline-offset-8 outline-slate-300'>
                <img src="https://www.freeiconspng.com/uploads/message-icon-png-6.png" className='h-[200px] block m-auto md:h-[350px] max-w-[350px] md:border-r-4  border-r-slate-100 object-cover' alt="" />
                <form className='flex flex-col gap-3 items-center justify-center'>
                    <h1 className='text-3xl font-bold text-gray-800'>Log In</h1>
                    <TextField onChange={(e) => setEmail(e.target.value)} id="filled-basic" className=' w-[280px] md:w-[350px] ' label="Email ID" variant="filled" />
                    {/* <TextField onChange={(e) => setPassword(e.target.value)} id="filled-basic" className=' w-[280px] md:w-[350px]' label="Password" variant="filled" /> */}
                    <FormControl className='w-[350px]' variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            onChange={(e) => setPassword(e.target.value)}
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                        />
                    </FormControl>
                    <div className='w-full text-right'>
                        <a href="">Forgot password ?</a>
                    </div>
                    <div className='flex gap-3'>
                        <Button onClick={handleLogin} variant="contained">Log In</Button>
                        <Link to={'/register'} ><Button variant="text">New User</Button></Link>
                    </div>
                </form>
            </div>
            <h1 className='absolute flex bg-slate-200 top-4 left-4 font-bold text-2xl py-1 px-5 gap-2 shadow-lg rounded-full items-center justify-center'><img className='w-[50px] h-[50px] object-cover' src="https://www.freeiconspng.com/uploads/message-icon-png-6.png" alt="" /> Chat App</h1>
        </div>
    )
}

export default Login