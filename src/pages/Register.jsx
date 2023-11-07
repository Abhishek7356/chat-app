import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    console.log(password);


    const handleRegister = async () => {
        console.log(username, password, email);
        setLoading(true)
        // console.log(file);
        if (email && password && file && username) {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                console.log(user);
                const storageRef = ref(storage, username);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;

                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            console.log(downloadURL);
                            await updateProfile(user, {
                                displayName: username,
                                photoURL: downloadURL
                            })
                            await setDoc(doc(db, "users", user.uid), {
                                username,
                                email,
                                profile_pic: downloadURL,
                                uid: user.uid
                            })
                            await setDoc(doc(db, "userChat", user.uid), {})
                            navigate('/home')
                            setLoading(false)
                        });
                    }
                );

            } catch (err) {
                console.log(err.message);
            }
        } else {
            alert('Please enter details correctly');
        }
    }

    return (
        <div>
            <div className='h-[100vh] bg-[#0090ff] flex justify-center items-center'>
                <div className='md:flex px-5 py-11 md:py-8 gap-10 bg-slate-200 rounded-md shadow-lg duration-200 outline outline-offset-0 hover:outline-offset-8 outline-slate-300'>
                    <img src="https://www.freeiconspng.com/uploads/message-icon-png-6.png" className='h-[200px] block m-auto md:h-[350px] max-w-[350px] md:border-r-4  border-r-slate-100 object-cover' alt="" />
                    <form className='flex flex-col gap-3 items-center justify-center'>
                        <h1 className='text-3xl font-bold text-gray-800'>Register</h1>
                        <TextField onChange={(e) => setUsername(e.target.value)} id="filled-basic" className='w-[350px]' label="User Name" variant="filled" />
                        <TextField onChange={(e) => setEmail(e.target.value)} id="filled-basic" className='w-[350px]' label="Email ID" variant="filled" />
                        {/* <TextField onChange={(e) => setPassword(e.target.value)} id="filled-basic" className='w-[350px]' label="Password" variant="filled" /> */}
                        <FormControl className='w-[350px]' variant="filled">

                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                                onChange={(e) => setPassword(e.target.value)}
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                            />
                        </FormControl>
                        <div className='w-full flex '>
                            <label htmlFor="file" className='cursor-pointer'><i class="fa-solid text-2xl fa-image mr-2"></i>Add Profile Photo</label>
                        </div>
                        <input onChange={(e) => setFile(e.target.files[0])} type="file" id='file' style={{ display: 'none' }} />
                        <Button onClick={handleRegister} variant="contained">Register</Button>
                        {loading &&
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        }
                        <Link to={'/'} ><Button variant="text">Allready have an account</Button></Link>
                    </form>
                </div>
                <h1 className='hidden absolute md:flex bg-slate-200 top-4 left-4 font-bold text-2xl py-1 px-5 gap-2 shadow-lg rounded-full items-center justify-center'><img className='w-[50px] h-[50px] object-cover' src="https://www.freeiconspng.com/uploads/message-icon-png-6.png" alt="" /> Chat App</h1>
            </div>
        </div>
    )
}

export default Register