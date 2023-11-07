import React from 'react'

function FriendsList({ user }) {
    console.log(user);
    return (
        <div className='flex cursor-pointer w-full justify-start items-center gap-2 hover:bg-slate-300 p-4 '>
            <img className='w-[50px] h-[50px] object-cover rounded-full' src={user.userInfo.photoUrl} alt="" />
            <div>
                <h2 className='font-bold text-md text-gray-700'>{user.userInfo.displayName}</h2>
                <span className='text-xs'>{user.lastMessage}</span>
            </div>
        </div>
    )
}

export default FriendsList