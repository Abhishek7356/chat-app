import React, { useContext } from 'react'
import AllMessage from './AllMessage'
import InputBar from './InputBar'
import { StateContext } from '../ChatContext'


function ChatBar() {
    const friendState = useContext(StateContext)
    console.log(friendState.user.displayName);
    // console.log(friendState);

    return (
        <div className='w-[100%] fixed right-0 md:w-[70%] h-full'>
            {friendState.user.displayName !== undefined ?
                <div className='w-[100%] h-full relative bg-slate-200 border-l-2 border-l-gray-400'>
                    <div className='flex w-full border-b-2 border-b-gray-400 justify-between items-center bg-slate-200 h-[67px] px-3'>
                        <div className='flex gap-2 items-center'>
                            <img className='w-[40px] h-[40px] bg-white object-cover rounded-full' src={friendState?.user?.photoUrl} alt="" />
                            <h2 className='text-gay-600 font-bold text-xl'>{friendState?.user?.displayName}</h2>
                        </div>
                        <div className='flex gap-4'>
                            <i class="fa-solid text-xl fa-video"></i>
                            <i class="fa-solid text-xl fa-phone"></i>
                            <i class="fa-solid text-xl fa-circle-info"></i>
                        </div>
                    </div>
                    <AllMessage />
                    <div className='absolute bottom-0 right-0 left-0'>
                        <InputBar />
                    </div>
                </div>
                :
                <div className='h-full w-[100%] flex items-center bg-slate-400 justify-center'>
                    <h1 className='text-4xl p-10 border flex flex-col gap-3 border-4 rounded-lg border-white shadow-lg'>Open a chat<span className=' md:hidden text-lg w-[250px]' >Tap That messenger icon on the top</span> </h1>

                </div>
            }
        </div>

    )
}

export default ChatBar