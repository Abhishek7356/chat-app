import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { auth } from '../firebase';
import { AuthContext } from '../Auth';

function Navbar() {

    const currentUser = useContext(AuthContext)

    const handleLogout = async () => {
        try {
            let res = await signOut(auth)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex p-2 bg-slate-200 items-center justify-between sticky top-0'>
            <h2 className='p-1 border-b-4 border-b-[#0090ff] font-bold text-lg'>Chat App</h2>
            <div className='flex gap-2 justify-center items-center'>
                <div className='text-right'>
                    <h2 className='text-lg font-bold'>{currentUser.displayName}</h2>
                    <span className='bg-[#0090ff] p-[4px] text-white rounded-md text-xs cursor-pointer' onClick={handleLogout} >Log Out</span>
                </div>
                <img className='w-[50px] h-[50px] object-cover rounded-full' src={currentUser.photoURL} alt="" />
            </div>
        </div>
    )
}

export default Navbar