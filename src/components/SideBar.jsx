import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import SearchInput from './SearchInput'
import FriendsList from './FriendsList'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from '../Auth'
import { DispatchContext } from '../ChatContext';

function SideBar({setShow}) {
    const currentUser = useContext(AuthContext)
    const dispatch = useContext(DispatchContext)
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const fetchFriends = () => {
            const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
                console.log("Current data: ", doc.data());
                setFriends(doc.data())
            });
            return () => {
                unsub()
            }
        }
        if (currentUser) {
            fetchFriends()
        }
    }, [])

    const handleUserChat = (u) => {
        // console.log(u);
        dispatch({ type: "CHANGED_USER", payload: u })
        setShow(true)
    }

    console.log(Object.entries(friends));
    let allFriends = Object.entries(friends)?.sort((a, b) => b[1].date - a[1].date).map((item, key) => {
        return (
            <div onClick={() => handleUserChat(item[1].userInfo)}>
                <FriendsList user={item[1]} key={item[0]} />
            </div>
        )
    })
    return (
        <div className='w-[100%] md:w-[30%] flex flex-col overflow-y-scroll'>
            <Navbar />
            <SearchInput />
            {allFriends}
        </div>
    )
}

export default SideBar