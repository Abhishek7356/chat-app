import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatBar from '../components/ChatBar'

function Home() {

    const [show, setShow] = useState(true)

    return (
        <div className='h-[100vh] bg-slate-400  flex justify-center overflow-hidden items-center'>
            <button onClick={()=>setShow(!show)} className='md:hidden bg-blue-500 px-3 py-1 rounded-lg fixed top-20 right-2 z-10'><i class="fa-brands text-3xl fa-facebook-messenger"></i></button>
            <div className='w-[100%] h-[100%] shadow-xl flex bg-slate-200'>
                <SideBar setShow={setShow} />
                {show && <ChatBar />}
            </div>
        </div>
    )
}

export default Home