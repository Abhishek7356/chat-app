import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { StateContext } from '../ChatContext';

function AllMessage() {

    const [chat, setChat] = useState([])
    const friendState = useContext(StateContext);
    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chat])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chat", friendState?.chatId), (doc) => {
            // console.log("Current data: ", doc.data());
            doc.exists() && setChat(doc.data().messages)
        });

        return () => {
            unsub()
        }
    }, [friendState.chatId])

    let allMessages = chat.map((item, key) => {
        return (
            <div ref={ref}>
                <Message message={item} key={key} />
            </div>
        )
    })

    return (
        <div className='px-5 h-[80%] overflow-y-scroll'>
            {allMessages}

        </div>
    )
}

export default AllMessage