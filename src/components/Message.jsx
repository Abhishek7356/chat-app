import React, { useContext } from 'react'
import { AuthContext } from '../Auth';
import { StateContext } from '../ChatContext';
import { format } from 'timeago.js'

function Message({ message, own }) {
    console.log(message);
    // console.log(Intl.DateTimeFormat('en-US').format(new Date()));
    const currentUser = useContext(AuthContext);
    const state = useContext(StateContext)

    return (
        <div>
            <div className={message.senderId === currentUser.uid ? 'flex gap-2 flex-row-reverse mt-5' : 'flex gap-2 flex-row mt-5'}>
                <img className='w-[30px] h-[30px] object-cover rounded-full' src={message.senderId == currentUser.uid ? currentUser.photoURL : state?.user?.photoUrl} alt="" />
                <div className={message.senderId === currentUser.uid ? 'flex flex-col items-start' : 'flex flex-col items-end'}>
                    <h2 className={message.senderId === currentUser.uid ? 'py-2 px-3 rounded-md bg-[#0090ff] text-white max-w-[400px]' : 'py-2 px-3 rounded-md bg-slate-700 text-white max-w-[400px]'}>{message.text}</h2>
                    {message.image && <img src={message.image} className='w-[200px] mt-2 h-[250px] object-cover' alt="" />}
                </div>
            </div>
            <span className={message.senderId === currentUser.uid ? 'text-right block ' : 'text-left block '}>{format(message.date)}</span>
        </div>
    )
}

export default Message